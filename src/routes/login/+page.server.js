import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schema = z.object({
	email: z.string(),
	password: z.string().min(6)
});

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals, request }) => {
	const session = await locals.getSession();

	if (session) {
		throw redirect(303, '/account');
	}

	const form = await superValidate(request, schema);

	return { form };
};

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request, locals: {supabase} }) => {
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return fail(400, { form })
		}

		const { email, password } = form.data;

		const { error } = await supabase.auth.signInWithPassword({
			email, password
		});

		if (error) {
			form.errors.email = [];
			return setError(form, 'password', error.message);
		} else {
			throw redirect(303, '/account');
		}
	},
	register: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return fail(400, { form })
		}

		const { email, password } = form.data;

		const { error } = await supabase.auth.signUp({
			email, password
		});

		if (error) {
			form.errors = { email: [], password: [error.message] };
			return fail(400, { form });
		} else {
			throw redirect(303, '/account');
		}
	}
};
