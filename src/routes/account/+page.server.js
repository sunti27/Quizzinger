import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = (async ({ locals: { getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/login');
	}

	return { session };
});

/** @type {import('./$types').Actions} */
export const actions = {
	signout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();

		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, '/');
		}
	}
};
