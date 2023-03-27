<script>
    import { ProgressRadial } from '@skeletonlabs/skeleton';

    import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
	$: {
		const redirectTo = $page.url.searchParams.get('redirect');

		// check if user has been set in session store then redirect
		if (browser && data.session) {
			goto(redirectTo ?? '/account');
		}
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<ProgressRadial stroke={100}  />
</div>
