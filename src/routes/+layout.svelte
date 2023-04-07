<script>
	import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, Drawer, Toast, Modal } from '@skeletonlabs/skeleton';

	import Navigation from '$lib/Navigation.svelte';
	import Header from '$lib/Header.svelte';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	$: ({ supabase } = data);
	$: ({ session } = data);

	onMount(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => subscription.unsubscribe();
	})
</script>

<Drawer width="w-auto" rounded="rounded-none"><Navigation /></Drawer>

<Modal />
<Toast />

<AppShell slotSidebarLeft="w-0 lg:w-auto">
	<svelte:fragment slot="header"><Header loggedIn={!!session} /></svelte:fragment>

	<svelte:fragment slot="sidebarLeft"><Navigation /></svelte:fragment>

	<slot />
</AppShell>
