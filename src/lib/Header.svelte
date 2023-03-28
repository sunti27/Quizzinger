<script>
	import { AppBar } from '@skeletonlabs/skeleton';
	import { drawerStore } from '@skeletonlabs/skeleton';

	function openDrawer() {
		drawerStore.open();
	}

	/** @type {boolean} */
	export let loggedIn;
</script>

<AppBar
	class="shadow-md bg-surface-100-800-token"
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
>
	<svelte:fragment slot="lead">
		<div class="flex items-center">
			<button class="lg:hidden btn btn-sm mr-4" on:click={openDrawer}>
				<i class="fa-solid fa-xl fa-bars" />
			</button>
		</div>
	</svelte:fragment>

	<h1 class="underline">Quizzinger</h1>

	<svelte:fragment slot="trail">
		<div class="flex items-center">
			{#if loggedIn}
				<a class="btn btn-sm ml-4" href="/account">
					<i class="fa-solid fa-2xl fa-circle-user" />
				</a>
			{:else}
				<a class="btn btn-sm ml-4" href="/login">
					<i class="fa-solid fa-2xl fa-right-to-bracket" />
				</a>
			{/if}
		</div>
	</svelte:fragment>
</AppBar>
