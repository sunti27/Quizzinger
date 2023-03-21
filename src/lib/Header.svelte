<script>
	import { AppBar } from '@skeletonlabs/skeleton';
	import { drawerStore } from '@skeletonlabs/skeleton';

	function openDrawer() {
		drawerStore.open();
	}
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
</AppBar>
