<script>
    import Card from '$lib/Card.svelte';

    let selectedIndex = 0;

    let cardSampleData = [
        ['tree', 'Baum'],
        ['house', 'Haus'],
        ['car', 'Auto'],
        ['cat', 'Katze'],
        ['dog', 'Hund'],
        ['bird', 'Vogel'],
        ['fish', 'Fisch'],
    ];

    $: max = cardSampleData.length - 1;

    function back() {
        selectedIndex = Math.max(0, selectedIndex - 1);
    }

    function next() {
        selectedIndex = Math.min(max, selectedIndex + 1);
    }

    function handleKeydown(event) {
        if (event.code === 'ArrowLeft') {
            back();
        } else if (event.code === 'ArrowRight') {
            next();
        }
    }
</script>

<style lang="postcss">
    .control-button {
        @apply w-full bg-surface-800 p-2 rounded border border-surface-500/30;
    }
</style>

<svelte:window on:keydown={handleKeydown} />

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="flex flex-col gap-2">
        <div class="flex flex-row">
            {#each [cardSampleData[selectedIndex]] as [word1, word2] (selectedIndex)}
                <Card word1={word1} word2={word2} />
            {/each}
        </div>
        <div class="flex flex-row justify-items-stretch rounded gap-2">
            <button class="control-button" on:click={back} disabled={selectedIndex <= 0}><i class="fa-solid fa-xl fa-arrow-left" /></button>
            <button class="control-button" on:click={next} disabled={selectedIndex >= max}><i class="fa-solid fa-xl fa-arrow-right" /></button>
        </div>
    </div>
</div>