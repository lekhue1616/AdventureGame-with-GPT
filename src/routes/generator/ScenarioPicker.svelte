<script>
	import { scenario, generatorProgress } from '$lib/stores.js';

	let buttonDisabed = true;

	function selectScenario(scenarioId) {
		$scenario = scenarioId;
		buttonDisabed = undefined;
	}

	$: scenarioNumber = (() => {
		switch ($scenario) {
			case 'prison break':
				return 1;
			case 'harry potter':
				return 2;
			case 'save the world':
				return 3;
			default:
				return null;
		}
	})();

	$: buttonLabel =
		$scenario == null ? 'Choose a scenario' : `Continue with scenario #${scenarioNumber}`;
</script>

<h2>Choose a scenario...</h2>
<p>Select one of the three scenarios presented.</p>

<section>
	<!-- svelte-ignore a11y-click-events-have-key-events-->
	<figure
		class:selected={$scenario == 'prison break'}
		on:click={() => selectScenario('prison break')}
	>
		<figcaption>
			<h4>Scenario 1: Prison Break</h4>
			<p>Locked behind iron bars and surrounded by danger, that's how your escape begins!</p>
		</figcaption>
		<img src="/img/icon/PI.jpg" alt="Scenario 1" />
	</figure>
	<!-- svelte-ignore a11y-click-events-have-key-events-->
	<figure
		class:selected={$scenario == 'harry potter'}
		on:click={() => selectScenario('harry potter')}
	>
		<figcaption>
			<h4>Scenario 2: Harry Potter</h4>
			<p>Venture through the enchanted corridors of Hogwarts and unravel their secrets.</p>
		</figcaption>
		<img src="/img/icon/HPI.jpg" alt="Scenario 2" />
	</figure>
	<!-- svelte-ignore a11y-click-events-have-key-events-->
	<figure
		class:selected={$scenario == 'save the world'}
		on:click={() => selectScenario('save the world')}
	>
		<figcaption>
			<h4>Scenario 3: Save the world!</h4>
			<p>A global crisis looms overhead. Navigate treacherous traps and save humanity!</p>
		</figcaption>
		<img src="/img/icon/SWI.jpg" alt="Scenario 3" />
	</figure>
</section>

<button disabled={buttonDisabed} on:click={() => $generatorProgress++}>{buttonLabel}</button>

<style>
	.selected > img {
		outline: 3px solid var(--color-accent);
		cursor: auto;
	}

	img:hover {
		outline: 3px solid var(--color-accent-brighter);
		filter: brightness(110%);
	}

	section {
		display: flex;
		gap: 12px;
		margin-bottom: 1em;
	}

	section figure {
		flex: 1;
		margin: 0;
	}

	figcaption h4 {
		margin: 0;
		margin-bottom: 0.3em;
		text-align: center;
	}

	img {
		width: 100%;
		transition: outline 0.1s ease-in-out;
		cursor: pointer;
	}
</style>
