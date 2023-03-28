<script>
    import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

    export let data;

    let { session } = data;

	let email = session.user.email;
</script>

<div class="container h-full mx-auto max-w-3xl p-12 flex justify-start items-center flex-col gap-6">
	<div class="w-full flex flex-row justify-between items-center">
		<h4 class="justify-end">{email}</h4>

		<form method="post" action="?/signout" use:enhance>
			<div>
				<button class="btn variant-ghost-surface">Sign Out</button>
			</div>
		</form>
	</div>

	<hr class="w-full" />
</div>
