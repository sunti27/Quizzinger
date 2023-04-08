import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    throw redirect(303, '/datasets/browse?method=qna');
}
