<script>
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { drawerStore } from '@skeletonlabs/skeleton';

	import { page } from '$app/stores';

	const routes = [
		{
			href: '/',
			label: 'Home',
			icon: 'fa-home',
		},
		{
			href: '/datasets',
			label: 'Datasets',
			icon: 'fa-bars-staggered',
		},
		{
			href: '/cards',
			label: 'Cards',
			icon: 'fa-rectangle-list',
		},
	];

	function closeDrawer() {
		drawerStore.close();
	}
</script>

<AppRail
	background="bg-surface-50-900-token"
	border="border-r border-surface-500/30"
>
	{#each routes as route}
		<AppRailTile
			tag="a"
			href={route.href}
			label={route.label}
			class={route.href === $page.url.pathname ? '!bg-primary-700' : ''}
			on:click={closeDrawer}
		>
			<i class="fa-solid fa-xl {route.icon}" />
		</AppRailTile>
	{/each}
	<AppRailTile slot="trail">
		<LightSwitch rounded="rounded" />
	</AppRailTile>
</AppRail>
