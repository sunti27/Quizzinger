<script>
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	export let data;
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="row flex-center flex">
		<div class="col-6 form-widget">
			<Auth
				supabaseClient={data.supabase}
				view="magic_link"
				redirectTo={`${data.url}/loading`}
				showLinks={false}
				appearance={{ theme: ThemeSupa }}
			/>
		</div>
	</div>
</div>
