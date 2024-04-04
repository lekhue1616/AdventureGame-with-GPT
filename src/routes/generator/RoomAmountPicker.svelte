<script>
	import { browser } from '$app/environment';
	import { roomAmount, generatorProgress } from '$lib/stores';
	import { onMount } from 'svelte';
	import RangeSlider from 'svelte-range-slider-pips';

	$: buttonLabel = !touchedSlider
		? 'How many rooms?'
		: `Continue with ${$roomAmount} ${$roomAmount <= 1 ? 'room' : 'rooms'} `;
	let buttonDisabed = true;

	const roomMin = 1;
	const roomMax = 4;

	// set initial value
	$roomAmount = Math.min(roomMax / 2);

	let touchedSlider = false;
	function roomAmountChosen(roomAmountId) {
		touchedSlider = true;
		$roomAmount = roomAmountId;
		buttonDisabed = undefined;
	}

	onMount(() => {
		if (browser) {
			let rangeEl = document.querySelector('#range-rooms');
			rangeEl.querySelector('.pip.first .pipVal-suffix').textContent = ' room';
		}
	});
</script>

<h2>How long do you want to play?</h2>
<p>Choose the amount of puzzles you want to solve.</p>

<!--
<div class="slider" data-min={roomMin} data-max={roomMax}>
	<input
		bind:this={sliderElement}
		type="range"
		min={roomMin}
		max={roomMax}
		bind:value={$roomAmount}
		class="slider"
		on:input={() => roomAmountChosen(sliderElement.value)}
	/>
</div>
-->

<RangeSlider
	values={[$roomAmount]}
	min={roomMin}
	max={roomMax}
	pipstep={roomMin}
	all="label"
	suffix=" rooms"
	pips
	on:change={(ev) => roomAmountChosen(ev.detail.value)}
	id="range-rooms"
/>

<button disabled={buttonDisabed} on:click={() => $generatorProgress++}>{buttonLabel}</button>

<style>
	:root {
		--range-handle: var(--color-accent-darker);
		--range-handle-focus: var(--color-accent);
		--range-slider: var(--color-bg-hover);
		--range-pip: var(--color-accent-brighter);
		--range-pip-active: var(--color-white);
	}

	button {
		margin-top: 1em;
	}
</style>
