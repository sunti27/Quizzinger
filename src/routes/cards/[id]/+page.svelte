<script>
	import Card from '$lib/Card.svelte';

	export let data;
	let entries = data.entries;

	let selectedIndex = 0;
	const max = entries.length - 1;

	function next() {
		selectedIndex = Math.min(max, selectedIndex + 1);
	}

	function back() {
		selectedIndex = Math.max(0, selectedIndex - 1);
	}

	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (event.code === 'ArrowLeft') {
			back();
		} else if (event.code === 'ArrowRight') {
			next();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="flex flex-col gap-2 w-11/12 sm:max-w-sm">
		<div class="flex flex-row">
			{#each [entries[selectedIndex]] as { question, answer } (selectedIndex)}
				<Card {question} {answer} />
			{/each}
		</div>
		<div class="flex flex-row justify-items-stretch rounded gap-2">
			<button class="control-button surface-default" on:click={back} disabled={selectedIndex <= 0}>
                <i class="fa-solid fa-xl fa-arrow-left" />
            </button>
			<button class="control-button surface-default" on:click={next} disabled={selectedIndex >= max}>
                <i class="fa-solid fa-xl fa-arrow-right" />
            </button>
		</div>
	</div>
</div>

<style lang="postcss">
	.control-button {
		@apply w-full p-2 rounded border border-surface-500/30;
	}
</style>
