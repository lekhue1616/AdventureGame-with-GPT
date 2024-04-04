<script>
	export let show = false;
	export let disabled = false;
	export let anchorId;
	import { fade } from 'svelte/transition';
</script>

{#if show}
	<section class:disabled transition:fade id={anchorId}>
		<slot />
	</section>
{/if}

<style>
	section {
		display: flex;
		flex-direction: column;
		transition: filter 0.15s ease-in-out;
		margin-bottom: 1em;
	}

	.disabled {
		filter: brightness(70%);
		pointer-events: none;
		user-select: none;
	}
</style>
