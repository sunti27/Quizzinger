<script>
	import { goto, invalidate } from '$app/navigation';
  	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, errors, constraints, enhance } = superForm(data.form, {
		applyAction: false,
		invalidateAll: true,
		resetForm: false,
		defaultValidator: 'clear',
		onResult: ({ result }) => {
			if (result.type === "redirect") {
				goto(result.location, { invalidateAll: true });
			}
		},
	});
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<form class="flex flex-col gap-4" method="POST" action="?/login" use:enhance>
		<label class="label">
			<span>Email</span>
			<input
				name="email"
				class="input variant-form-material"
				class:input-error={$errors.email}
				type="email"
				placeholder="example@mail.com"
				data-invalid={$errors.email}
				bind:value={$form.email}
				{...$constraints.email}
			/>
			{#if $errors.email && $errors.email.length}
				<p class="text-error">{$errors.email}</p>
			{/if}
		</label>

		<label class="label">
			<span>Password</span>
			<input
				name="password"
				class="input variant-form-material"
				class:input-error={$errors.password}
				type="password"
				placeholder="*************"
				data-invalid={$errors.password}
				bind:value={$form.password}
				{...$constraints.password}
			/>
			{#if $errors.password && $errors.password.length}
				<p class="text-error">{$errors.password}</p>
			{/if}
		</label>

		<div class="flex w-full items-center gap-4">
			<button type="submit" class="btn variant-filled-primary w-full">Login</button>
			<button class="btn variant-ghost-primary w-full" formaction="?/register">Register</button>
		</div>
	</form>
</div>
