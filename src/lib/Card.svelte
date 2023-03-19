<script>
	let flipped = false;

	function flip() {
		flipped = !flipped;
	}

	function handleKeydown(event) {
		if (event.key === ' ') {
			flip();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="card-wrapper">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="card-wrapper-inner w-96 h-44" class:flipped on:click={flip}>
		<div class="card front">
			<section class="p-6">tree</section>
			<footer class="card-footer text-right">Englisch</footer>
		</div>

		<div class="card back">
			<section class="p-6">Baum</section>
			<footer class="card-footer text-right">Deutsch</footer>
		</div>
	</div>
</div>

<style lang="postcss">
	.card-wrapper {
		perspective: 1000px;
	}

	.card-wrapper-inner {
		position: relative;
		transition: transform 0.5s ease;
		transform-style: preserve-3d;
	}

	.card {
		@apply rounded;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		backface-visibility: hidden;
	}

	.back {
		transform: rotateX(180deg);
	}

	.flipped {
		transform: rotateX(180deg);
	}
</style>
