<script>
	/** @type {string} */
	export let question;

	/** @type {string} */
	export let answer;

	let flipped = false;

	function flip() {
		flipped = !flipped;
	}

	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (['Space', 'ArrowUp', 'ArrowDown'].includes(event.code)) {
			event.preventDefault();
			event.stopPropagation();
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
		on:keydown={handleKeydown}
	>
		<div class="card front surface-default">
			<section>{question}</section>
		</div>

		<div class="card back surface-default">
			<section>{answer}</section>
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

	.front, .back {
		backface-visibility: hidden;
		@apply rounded flex items-center justify-center top-0 left-0 w-full h-full absolute;
	}

	.front > section, .back > section {
		@apply text-2xl font-bold text-center;
	}

	.back, .flipped {
		transform: rotateX(180deg);
	}
</style>
