<script>
	/** @type {string} */
	export let word1;

	/** @type {string} */
	export let word2;

	let flipped = false;

	const keyCodes4flip = [
		'Space',
		'ArrowUp',
		'ArrowDown',
	];

	function flip() {
		flipped = !flipped;
	}

	function handleKeydown(event) {
		if (keyCodes4flip.includes(event.code)) {
			event.preventDefault();
			flip();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="card-wrapper w-96 h-44">
	<button class="card-wrapper-inner w-full h-full" class:flipped on:click={flip} on:keypress={handleKeydown}>
		<div class="card front bg-surface-700">
			<section class="p-6">{word1}</section>
		</div>

		<div class="card back">
			<section class="p-6">{word2}</section>
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
		@apply rounded bg-surface-50-900-token;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		backface-visibility: hidden;
	}

	.back, .flipped {
		transform: rotateX(180deg);
	}
</style>
