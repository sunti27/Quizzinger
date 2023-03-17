<script>
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';

	import { page } from '$app/stores';
</script>

<AppRail>
	<AppRailTile
		href="/"
		icon="home"
		label="Home"
		class={'/' === $page.url.pathname ? '!bg-primary-500' : ''}
	/>
</AppRail>
