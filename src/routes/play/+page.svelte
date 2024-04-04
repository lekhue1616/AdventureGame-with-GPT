<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { currentRoomPlaying, generatorProgress } from '$lib/stores';
	import { goto } from '$app/navigation';

	let input = '';
	let feedback = '';

	let escapeRoomObject = undefined;

	let debounceTimeout;
	const debounce = (cb, ms) => {
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => {
			cb();
		}, ms);
	};

	const convertBase64 = (str) => (browser ? window.atob(str) : '');

	onMount(() => {
		// clicking on play invalidates anything in the generator
		$generatorProgress = 0;

		feedback = 'Please enter escape room code...';
		if (browser) {
			// try loading from LS
			if (localStorage.getItem('last-room')) {
				input = localStorage.getItem('last-room');
				const valid = checkValidCode();
				if (valid) {
					feedback = `Successfully auto-loaded escape room from <em>${convertDate(
						escapeRoomObject.generationTime
					)}</em>:`;
				}
			}
		}
	});

	function checkValidCode() {
		if (input == '') {
			escapeRoomObject = undefined;
			feedback = 'Please enter escape room code...';
			return false;
		}

		try {
			escapeRoomObject = JSON.parse(convertBase64(input));
			feedback = `Successfully loaded escape room from <em>${convertDate(
				escapeRoomObject.generationTime
			)}</em>:`;
		} catch (e) {
			escapeRoomObject = undefined;
			feedback = 'Invalid escape room code!';
			return false;
		}
		return true;
	}

	function convertDate(ts) {
		return new Date(ts).toLocaleDateString('en-US', {
			//dateStyle: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'Europe/Berlin',
			hourCycle: 'h23'
		});
	}

	function playButton() {
		$currentRoomPlaying = escapeRoomObject;
		goto('/play/room');
	}
</script>

<h1>Play your escape room!</h1>
<h3>Is it your first time here?</h3>
<h4>Here you can generarte your own escaperoom experience!</h4>

<button id="Generatorbutton" on:click={() => goto('/generator')}>Lets start generating!</button>
<p />
<p />
<p />
<p />
<h4>You already generated a room? Or got one from a friend?</h4>

{#if feedback != ''}
	<p in:fade class="feedback">
		<!-- svelte-ignore no-at-html-tags -->
		{@html feedback}
	</p>
{:else}
	<p class="feedback">&nbsp;</p>
{/if}
<textarea
	rows="15"
	on:input={() => {
		// debounce so feedback can catch up
		debounce(checkValidCode, 50);
	}}
	bind:value={input}
/>

<button id="Playbutton" disabled={escapeRoomObject === undefined} on:click={playButton}
	>Lets start!</button
>

<style>
	.feedback {
		margin-bottom: 0;
	}
	#Generatorbutton {
		align-self: center;
		width: 50%;
	}

	#Generatorbutton:hover {
		transition: all 0.2s ease;
		transform: scale(1.1);
	}
	#Playbutton {
		align-self: center;
		margin-top: 0.5em;
	}

	h1 {
		text-align: center;
		font-size: 350%;
	}
	h3 {
		text-align: center;
		color: aliceblue;
	}
	h4 {
		text-align: center;
		color: aliceblue;
	}
</style>
