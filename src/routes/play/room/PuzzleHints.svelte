<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let hints;
	export let solved;
	let status = 0;

	const dispatch = createEventDispatcher();

	function getHintWord(i) {
		switch (i) {
			case 0:
				return 'first';
			case 1:
				return 'second';
			case 2:
				return 'third';
			case 3:
				return 'fourth';
			case 4:
				return 'fifth';
			case 5:
				return 'sixth';
			default:
				return 'next';
		}
	}
</script>

<button type="button" disabled={solved || status > 0} on:click|preventDefault={() => (status = 1)}
	>Show {getHintWord(0)} hint</button
>
{#each hints as hint, i}
	{@const puzzleIdx = i + 1}
	{#if status >= puzzleIdx}
		<div class="hint-container" transition:fade>
			<div class="puzzle-hint hint-{puzzleIdx}"><strong>Hint {puzzleIdx}: </strong>{hint}</div>
			<br />
			{#if puzzleIdx < hints.length}
				<button
					type="button"
					disabled={solved || status > puzzleIdx}
					on:click|preventDefault={() => (status += 1)}>Show {getHintWord(puzzleIdx)} hint</button
				>
			{:else}
				<button
					type="button"
					disabled={solved}
					on:click|preventDefault={() => dispatch('hint-solve')}>Solve puzzle</button
				>
			{/if}
		</div>
	{/if}
{/each}

<style>
	.hint-container {
		display: flex;
		justify-content: space-between;
		margin-top: 1em;
	}
	.puzzle-hint {
		text-align: left;
	}

	.hint-container button {
		align-self: center;
	}
</style>
