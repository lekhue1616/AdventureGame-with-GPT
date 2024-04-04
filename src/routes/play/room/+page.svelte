<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { currentRoomPlaying } from '$lib/stores.js';
	import RoomSection from './RoomSection.svelte';
	import Puzzle from './Puzzle.svelte';
	import { sleep } from '$lib/helper.js';
	import Background from '$lib/Background.svelte';

	/*
		expecting object in the form:

		{
			scenario: "", // one of three options
			roomAmount: 0, // 3 - 5
			texts: {
				opening: "", // string (paragraph)
				ending: "", // string (paragraph)
			},
			generationTime: 0, // timestamp
			puzzles: [ // entry per puzzle room
				{
					type: "" // string (e.g. "doors")
					matchesScenario: [], // array of strings (e.g. ["prison break", "harry potter"])
					description: "" // string (paragraph)
					imgLink: "" // string (url)
					solutionForm: [ // structure provides support for more forms
						{
							type: "",
							correctValue: ""
							maxLength: 0
						}
					]
				}
			]
		}

	*/

	let progress = 0;

	console.log(JSON.stringify($currentRoomPlaying));

	function scrollToAnchor(anchorId) {
		if (!browser) return;
		const element = document.querySelector(anchorId);
		if (element) element.scrollIntoView({ behavior: 'smooth' });
	}

	async function setProgress(num) {
		progress = num;
		await sleep(500);
		scrollToAnchor(`#section-${num}`);
	}

	let backgroundImage;
	switch ($currentRoomPlaying?.scenario) {
		case 'prison break':
			backgroundImage = '/img/background/PB.jpg';
			break;
		case 'harry potter':
			backgroundImage = '/img/background/HPB.jpg';
			break;
		case 'save the world':
			backgroundImage = '/img/background/SWB.jpg';
			break;
	}
</script>

<Background src={backgroundImage} />

<div class="room">
	{#if $currentRoomPlaying !== null}
		<RoomSection show={true} disabled={progress > 0} anchorId="section-{0}">
			<h2>Opening</h2>
			<p>{$currentRoomPlaying.texts.opening}</p>
			<button class="continue" on:click={async () => await setProgress(1)}>Continue</button>
		</RoomSection>

		{#each $currentRoomPlaying.puzzles as puzzle, i}
			<RoomSection show={progress > i} disabled={progress > i + 1} anchorId="section-{i + 1}">
				<h2>Room {i + 1}</h2>

				<p>{$currentRoomPlaying.texts.puzzleTransitions[i]}</p>

				<Puzzle {puzzle} on:correct={async () => await setProgress(progress + 1)} />
			</RoomSection>
		{/each}

		<RoomSection
			show={progress >= $currentRoomPlaying.puzzles.length + 1}
			disabled={false}
			anchorId="section-{$currentRoomPlaying.puzzles.length + 1}"
		>
			<h2>Ending</h2>
			<p>{$currentRoomPlaying.texts.ending}</p>
			<button
				class="continue"
				on:click={() =>
					goto($currentRoomPlaying.finalLink?.link ? $currentRoomPlaying.finalLink.link : '/')}
				>{$currentRoomPlaying.finalLink?.link
					? $currentRoomPlaying.finalLink.label
					: 'Return to the home page'}</button
			>
		</RoomSection>
	{:else}
		<p>No room loaded. Return to the <a href="/">home page</a>.</p>
	{/if}
</div>

<style>
	:global(section.disabled button) {
		pointer-events: none;
		background-color: grey;
		cursor: not-allowed;
	}
</style>
