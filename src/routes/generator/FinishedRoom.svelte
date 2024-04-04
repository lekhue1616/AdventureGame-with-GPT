<script>
	import {
		PUZZLES,
		generatePrompt,
		PARAGRAPH_DIVIDER,
		LINK_AFTER_FINISHING,
		LINK_AFTER_FINISHING_LABEL
	} from '$lib/global.js';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { scenario, prompts, roomAmount, generatorProgress } from '$lib/stores';
	import { sleep } from '$lib/helper.js';

	let base64room;

	const RETRY_AMOUNT = 6;

	function checkAnswer(input, desiredParagraphAmount) {
		input = input.replace(/\n/g, '');

		if (!input.includes(PARAGRAPH_DIVIDER)) {
			return {
				status: false,
				errorCode: 'ERROR_CHAT_GPT',
				reason: 'ChatGPT Error'
			};
		}

		const occurenceOfDivider = input.split(PARAGRAPH_DIVIDER).length - 1;

		// divider appears n-1 times
		if (occurenceOfDivider === desiredParagraphAmount - 1) {
			return {
				status: true,
				reason: 'OK'
			};
		}

		// divider appears n times + the last one is empty
		if (occurenceOfDivider === desiredParagraphAmount && input.endsWith(PARAGRAPH_DIVIDER)) {
			return {
				status: true,
				reason: 'OK'
			};
		}

		// otherwise: structure error
		return {
			status: false,
			errorCode: 'ERROR_STRUCTURE',
			reason: 'Structure Error'
		};
	}

	async function getChatGPTAnswers(scenario, prompts, puzzles) {
		const puzzleExplanations = puzzles.map((p) => p.promptExplanation);
		const prompt = generatePrompt(puzzleExplanations, scenario, prompts);

		/*
			what chatgpt actually gets:
			- the chosen scenario id (variable scenario)
			- the user-chosen prompts (variable prompts)
			- the selected puzzles (variable puzzles), for each puzzle
				- the puzzle type id (e.g. "doors")
				- puzzle description (this is not needed for chatgpt)
				- what scenario(s) this puzzle fits in
				- what the solution for the puzzle is (this is not needed for chatgpt)

			what else do we need to craft a prompt?
		*/

		console.log('Sending', JSON.stringify({ prompt: prompt }));

		let obj = {};
		let success = false;

		if (browser) {
			for (let i = 0; i < RETRY_AMOUNT; i++) {
				const res = await fetch('/chatgpt', {
					method: 'POST',
					headers: { 'X-Auth': 'Basic ' + btoa('pp:94bPxVpqjfE5kw7xbT') },
					body: JSON.stringify({ prompt: prompt })
				});

				console.log('Received', res);

				let json;
				try {
					json = await res.json();
				} catch (e) {
					// json error: retry
					console.error(e);
					continue;
				}

				const desiredParagraphAmount = puzzles.length + 2;

				const isValid = checkAnswer(json.text, desiredParagraphAmount);

				if (isValid.status === true) {
					const paragraphs = json.text.replace(/\n/g, '').split(PARAGRAPH_DIVIDER);

					if (paragraphs.length === desiredParagraphAmount) {
						obj.opening = paragraphs[0];
						obj.ending = paragraphs[paragraphs.length - 1];
						obj.puzzleTransitions = paragraphs.slice(1, paragraphs.length - 1);
						success = true;
						break;
					} else {
						// sanity check failed: retry
						continue;
					}
				} else {
					// check error
					if (isValid.errorCode === 'ERROR_STRUCTURE') {
						// structure error: retry
						continue;
					} else {
						// other error: log and break
						console.error('ChatGPT Error', isValid);
						break;
					}
				}
			}

			// failed
			if (!success) {
				return { error: 'We could not generate your desired escape room. Please try again.' };
			}
		}

		return obj;
	}

	function choosePuzzles(scenario, amount) {
		const typesAdded = new Set();
		const puzzleChoices = structuredClone(PUZZLES);
		const puzzles = [];

		// remove puzzles that don't fit the scenario
		for (let i = puzzleChoices.length - 1; i >= 0; i--) {
			if (!puzzleChoices[i].matchesScenario.includes(scenario)) {
				puzzleChoices.splice(i, 1);
			}
		}

		// add one at random, logging the type to make sure we only have unique types
		// keep in mind to avoid infinite loops if we dont have enough puzzles for the amount we want
		const maxTries = puzzleChoices.length;
		for (let i = 0; i <= maxTries; i++) {
			const randomIndex = Math.floor(Math.random() * puzzleChoices.length);
			console.log(randomIndex, puzzles);
			const randomPuzzle = puzzleChoices[randomIndex];

			if (randomPuzzle === undefined) {
				// we ran out of puzzles
				break;
			}

			if (!typesAdded.has(randomPuzzle.type)) {
				typesAdded.add(randomPuzzle.type);
				puzzles.push(randomPuzzle);
				puzzleChoices.splice(randomIndex, 1);
			}

			if (puzzles.length >= amount) {
				break;
			}
		}

		if (puzzles.length != amount) {
			console.error("Couldn't find enough puzzles for the amount of rooms");
		}

		return puzzles;
	}

	async function buildRoom() {
		let obj = {};
		let puzzles = choosePuzzles($scenario, $roomAmount);
		let chatGptAnswers = await getChatGPTAnswers($scenario, $prompts, puzzles);
		$prompts = {}; // reset prompts

		if (chatGptAnswers.error !== undefined) {
			return { error: chatGptAnswers.error };
		} else {
			obj.scenario = $scenario;
			obj.roomAmount = parseInt($roomAmount, 10);
			obj.texts = {
				opening: chatGptAnswers.opening,
				ending: chatGptAnswers.ending,
				puzzleTransitions: chatGptAnswers.puzzleTransitions
			};
			obj.generationTime = Date.now();
			obj.puzzles = puzzles;
			obj.finalLink = {
				link: LINK_AFTER_FINISHING,
				label: LINK_AFTER_FINISHING_LABEL
			};

			if (browser) {
				base64room = window.btoa(JSON.stringify(obj));
				localStorage.setItem('last-room', base64room);
			}

			return obj;
		}
	}
</script>

{#await buildRoom()}
	<div class="loader">
		<h3>Building escape room ...</h3>
		<div class="lds-dual-ring" />
	</div>
{:then output}
	{#if output.error !== undefined}
		<h2>There was a problem.</h2>
		<p>{output.error}</p>
		<p>Return to the <a href="/">home page</a>.</p>
	{:else}
		<h2>Done!</h2>
		<p>
			Your escape room was created. Please copy the text below if you want to share it with your
			friends. Click the Play button below to play your escape room.
		</p>

		<textarea rows="15" value={base64room} disabled />

		<button
			on:click={() => {
				$generatorProgress = 0;
				goto('/play');
			}}>Play!</button
		>
	{/if}
{:catch error}
	<p>There was an error: <code>{error.message}</code></p>
{/await}

<style>
	.loader {
		text-align: center;
	}

	button {
		margin-top: 0.5em;
	}

	/* spinner via https://loading.io/css/ */
	.lds-dual-ring {
		display: inline-block;
		width: 80px;
		height: 80px;
	}
	.lds-dual-ring:after {
		content: ' ';
		display: block;
		width: 64px;
		height: 64px;
		margin: 8px;
		border-radius: 50%;
		border: 6px solid var(--color-accent);
		border-color: var(--color-accent) transparent var(--color-accent) transparent;
		animation: lds-dual-ring 1.2s linear infinite;
	}
	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
