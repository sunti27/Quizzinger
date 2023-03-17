<script>
	let flipped = false;

	function flip(node, { delay = 0, duration = 700 }) {
		return {
			delay,
			duration,
			css: t => `
				transform: rotateY(${t * 180 * (flipped ? -1 : 1)}deg);
				opacity: ${1 - t};
			`
		};
	}
</script>

<style>
    .card {
        position: absolute;
        perspective: 1000px;
    }
</style>

<div class="contents" on:click={() => (flipped = !flipped)}>
    {#if !flipped}
    <div class="card p-4 variant-glass-primary card-hover rounded-lg w-96" transition:flip>
        <section class="p-6">tree</section>
        <footer class="card-footer text-right">Englisch</footer>
    </div>
{:else}
    <div class="card p-4 variant-glass-primary card-hover rounded-lg w-96" transition:flip>
        <section class="p-6">Baum</section>
        <footer class="card-footer text-right">Deutsch</footer>
    </div>
{/if}
</div>
