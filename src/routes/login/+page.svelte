<script>
	import { Auth } from '@supabase/auth-ui-svelte';

	export let data;
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="row flex-center flex">
		<div class="col-6">
			<Auth
				supabaseClient={data.supabase}
				view="magic_link"
				redirectTo={`${data.url}/loading`}
				showLinks={false}
				appearance={{ className: {
					button: '!btn !variant-filled-primary !rounded !border-0',
					input: '!input !rounded !border-0 !p-2 !variant-ghost-surface',
					label: '!text-sm !font-semibold !label',
					message: '!text-sm !text-center !text-token',
				}}}
			/>
		</div>
	</div>
</div>
