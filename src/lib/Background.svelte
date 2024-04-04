<script>
	import { fade } from 'svelte/transition';
	export let src;
</script>

<div transition:fade style="--src: url({src})" />

<style>
	div {
		background-image: var(--src);
		background-size: cover;
		background-position: center;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		mix-blend-mode: overlay;
		opacity: 0.5;
	}
</style>
