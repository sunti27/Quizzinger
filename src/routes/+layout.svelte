<script>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';
	import { Drawer } from '@skeletonlabs/skeleton';

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

<AppShell slotSidebarLeft="w-0 lg:w-auto">
	<svelte:fragment slot="header"><Header loggedIn={!!session} /></svelte:fragment>

	<svelte:fragment slot="sidebarLeft"><Navigation /></svelte:fragment>

	<slot />
</AppShell>
