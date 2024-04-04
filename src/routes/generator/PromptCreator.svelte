<script>
	import { prompts, generatorProgress } from '$lib/stores';

	const maxWordLength = 30;

	const promptValues = ['', '', ''];
	const promptsValid = [true, true, true];

	function setPrompt(key) {
		promptsValid[key] = !promptValues[key].includes(' ');
		if (promptsValid[key]) $prompts[key] = promptValues[key];
	}

	let showPromptSelection = false;
</script>

<h2>Personalize your escape room!</h2>

<p>
	You may now enter up to three words to shape the story. Please use words only, no phrases or whole
	sentences.
</p>
<button
	class="confirmation"
	disabled={showPromptSelection}
	on:click={() => (showPromptSelection = true)}>Understood</button
>

{#if showPromptSelection}
	<hr />
	<label for="prompt-0" class:invalid={!promptsValid[0]}
		><span>Prompt 1</span><input
			id="prompt-0"
			bind:value={promptValues[0]}
			maxlength={maxWordLength}
			type="text"
			on:input={() => setPrompt(0)}
		/></label
	>
	{#if promptValues.some((x) => x !== '')}
		<label for="prompt-1" class:invalid={!promptsValid[1]}
			><span>Prompt 2</span>
			<input
				id="prompt-1"
				bind:value={promptValues[1]}
				maxlength={maxWordLength}
				type="text"
				on:input={() => setPrompt(1)}
			/></label
		>{/if}

	{#if (promptValues[0] !== '' && promptValues[1] !== '') || promptValues[2] !== ''}<label
			class:invalid={!promptsValid[2]}
			for="prompt-2"
			><span>Prompt 3</span>
			<input
				id="prompt-2"
				bind:value={promptValues[2]}
				maxlength={maxWordLength}
				type="text"
				on:input={() => setPrompt(2)}
			/></label
		>{/if}

	<button disabled={!promptsValid.every((x) => x == true)} on:click={() => $generatorProgress++}
		>Continue</button
	>
{/if}

<style>
	label {
		display: flex;
		gap: 12px;
		align-items: center;
		font-weight: 700;
	}
	label + label {
		margin-top: 1em;
	}
	label > span {
		flex: 1 0 7%;
		word-break: keep-all;
	}

	label.invalid {
		color: var(--color-error);
	}

	label.invalid input {
		outline: 1px solid var(--color-error);
	}

	.confirmation {
		align-self: center;
	}

	button {
		margin-top: 0.5em;
	}
</style>
