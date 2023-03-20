<script>
	/** @type {string} */
	export let word1;

	/** @type {string} */
	export let word2;

	let flipped = false;

	function flip() {
		flipped = !flipped;
	}

	function handleKeydown(event) {
		if (['Space', 'ArrowUp', 'ArrowDown'].includes(event.code)) {
			event.preventDefault();
			flip();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="card-wrapper w-full h-44">
	<button
		class="card-wrapper-inner w-full h-full"
		class:flipped
		on:click={flip}
		on:keypress={handleKeydown}
	>
		<div class="card front bg-surface-100-800-token">
			<section>{word1}</section>
		</div>

		<div class="card back bg-surface-100-800-token">
			<section>{word2}</section>
		</div>
	</button>
</div>

<style lang="postcss">
	.card-wrapper {
		perspective: 1000px;
	}

	.card-wrapper-inner {
		position: relative;
		transition: transform 0.5s ease;
		transform-style: preserve-3d;
		font: default;
	}

	.card {
		backface-visibility: hidden;
		@apply rounded flex items-center justify-center top-0 left-0 w-full h-full absolute;
	}

	.card section {
		@apply text-2xl font-bold text-center;
	}

	.back,
	.flipped {
		transform: rotateX(180deg);
	}
</style>
