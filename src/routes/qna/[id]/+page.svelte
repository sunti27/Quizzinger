<script>
	import { ProgressBar } from '@skeletonlabs/skeleton';

	export let data;

	let entries = data.entries;

	let selectedIndex = 0;
	const max = entries.length - 1;

	function next() {
		guess = '';
		showAnswer = false;
		selectedIndex = Math.min(max, selectedIndex + 1);
	}

	function back() {
		guess = '';
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

	let guess = '';
	let showAnswer = false;

	function checkAnswer() {
		let { answer } = entries[selectedIndex];

		if (answer === guess) {
			next();
		} else {
			showAnswer = true;
		}
	}

	/** @param {KeyboardEvent} event */
	function handleInputKeydown(event) {
		if (event.code === 'Enter') {
			checkAnswer();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<ProgressBar class="fixed bottom-0 rounded-none" value={50} />

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="flex flex-col gap-2 w-11/12 sm:w-fit">
		<div class="flex flex-row">
			{#each [entries[selectedIndex]] as { question, answer } (selectedIndex)}
				<div class="card surface-default w-full p-4 rounded">
                    <header class="card-header flex justify-between items-center">
						<h3 class="text-2xl font-bold">{question}</h3>
						<!-- <button class="btn">
							<i class="fas fa-gear" />
						</button> -->
					</header>
                    <section class="m-4 flex gap-4 items-center">
						<input type="text" class="input" bind:value={guess} on:keydown={handleInputKeydown} />
						<button class="btn variant-filled-primary font-bold !h-full" on:click={checkAnswer}>
							<i class="fas fa-check" />
						</button>
					</section>
					<footer class="card-footer">
						Correct answer:
						{#if showAnswer}
							<span class="font-bold">{answer}</span>
						{/if}
					</footer>
                </div>
			{/each}
		</div>
	</div>
</div>
