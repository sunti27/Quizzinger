<script>
    import { enhance } from '$app/forms';

    export let data;

    let { session } = data;

	let loading = false;
	let email = session.user.email;

    function handleSubmit() {
        loading = true;
        return async () => {
            loading = false;
        };
    }
</script>

<div class="container h-full mx-auto max-w-3xl p-12 flex justify-start items-center flex-col gap-6">
	<div class="w-full flex flex-row justify-between items-center">
		<h4 class="justify-end">{email}</h4>

		<form method="post" action="?/signout" use:enhance={handleSubmit}>
			<div>
				<button class="btn variant-ghost-secondary" disabled={loading}>Sign Out</button>
			</div>
		</form>
	</div>


	<hr class="w-full" />
</div>
