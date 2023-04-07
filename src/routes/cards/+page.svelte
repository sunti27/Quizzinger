<script>
    export let data;

	$: public_datasets = data.datasets.filter(dataset => dataset.is_public);
	$: private_datasets = data.datasets.filter(dataset => !dataset.is_public);
</script>

<div class="container w-fit gap-12 max-w-[90%] mx-auto my-12 flex flex-col h-full justify-start items-center">
	{#if private_datasets?.length}
		<div class="w-full">
			<h2 class="my-4 place-self-start mb-8">Your datasets</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 auto-rows-min">
				{#each private_datasets as dataset}
					<div class="card card-hover surface-default p-4 flex flex-col justify-start w-full mx-auto">
						<header class="card-header"><h3>{dataset.title}</h3></header>
						<section class="p-4">{dataset.desc}</section>
						<footer class="card-footer flex flex-row justify-end">
							<a href="/cards/{dataset.id}" class="btn variant-filled-primary">Learn</a>
						</footer>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	{#if public_datasets?.length}
		<div class="w-full">
			<h2 class="my-4 place-self-start mb-8">Explore public datasets</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 auto-rows-min">
				{#each public_datasets as dataset}
					<div class="card card-hover surface-default p-4 flex flex-col justify-start w-full mx-auto">
						<header class="card-header"><h3>{dataset.title}</h3></header>
						<section class="p-4">{dataset.desc}</section>
						<footer class="card-footer flex flex-row justify-end">
							<a href="/cards/{dataset.id}" class="btn variant-filled-primary">Learn</a>
						</footer>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
