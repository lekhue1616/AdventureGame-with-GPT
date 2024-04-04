<script>
	import { generatorProgress } from '$lib/stores.js';
	import ScenarioPicker from './ScenarioPicker.svelte';
	import RoomAmountPicker from './RoomAmountPicker.svelte';
	import PromptCreator from './PromptCreator.svelte';
	import FinishedRoom from './FinishedRoom.svelte';
</script>

{#if $generatorProgress == 0}
	<p />
	<p />
	<p />
	<h1>Let's begin!</h1>
	<p />
	<p />
	<h3>Press the Start button to begin generating.</h3>
	<p />
	<p />
	<p />
	<p />
	<p />
	<p />

	<button on:click={() => $generatorProgress++}><h3>Start</h3></button>
{:else if $generatorProgress == 1}
	<ScenarioPicker />
{:else if $generatorProgress == 2}
	<RoomAmountPicker />
{:else if $generatorProgress == 3}
	<PromptCreator />
{:else if $generatorProgress == 4}
	<FinishedRoom />
{/if}

<style>
	h1 {
		text-align: center;
	}
	h3 {
		text-align: center;
		color: aliceblue;
	}
	button {
		align-self: center;
		width: 40%;
	}
</style>
