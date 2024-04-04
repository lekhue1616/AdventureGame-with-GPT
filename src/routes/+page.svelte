<script>
	import { generatorProgress } from '$lib/stores.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		$generatorProgress = 0;
	});
</script>

<h1>Welcome to our Study!</h1>
<p>
	<em
		>In the following you are going to play an online escape room game in which you can create your
		own story! Afterwards there will be a few questions about your experience while playing the
		game.
	</em>
</p>
<p><em>The study will take about 15 minutes. </em></p>
<p>
	<em>To achieve the best experience, we recommend a desktop or at least a dedicated output. </em>
</p>
<p>
	<em
		>Important Information regarding the data security and safety: Your personal data will not be
		passed on to third parties or publicly published. The data is used anonymously for scientific
		purposes only and can be made available to other scientists in an anonymous form.
	</em>
</p>
<p>
	<em
		>The participation is completely voluntary and can be stopped at any moment without a further
		explanation.
	</em>
</p>
<p>
	<em
		>The requirement for participating is that you are at least 18 years old and have a good
		knowledge of the englisch language. The whole study will be in <b> english</b>!.
	</em>
</p>
<p>
	<em
		>By clicking on „continue“ you agree to the use of your data in an anonymous form and assure
		that you are at least 18 years old.
	</em>
</p>

<div>
	<button on:click={() => goto('/play')}>Continue</button>
</div>

<style>
	h1 {
		text-align: center;
	}

	div {
		display: flex;
		width: 100%;
		justify-content: center;
		gap: 8px;
	}

	div button {
		flex: 1;
	}
</style>
