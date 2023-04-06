import { fail, redirect } from '@sveltejs/kit';
import { message, setError, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schema = z.object({
    title: z.string(),
    desc: z.string().optional(),
    is_public: z.boolean(),
    items: z.object({
        question: z.string().min(1),
        answer: z.string().min(1)
    }).array().default([{ question: '', answer: '' }])
})

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ request, locals: { getSession } }) => {
	const session = await getSession();

    // if the user is already logged in return them to the account page
	if (!session) {
		throw redirect(303, '/login');
	}

	const form = await superValidate(request, schema);

	return { form };
};

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession();

		const form = await superValidate(request, schema);

		if (!form.valid) {
			return fail(400, { form })
		}

		const { title, desc, is_public } = form.data;

        const response1 = await supabase
            .from('DataSets')
            .insert({
                title,
                desc,
                is_public,
                user_id: session?.user?.id
            })
            .select('id')
            .single();

        if (response1.error) {
            form.errors.title = [];
			return setError(form, 'desc', response1.error.message);
        }

        const dataset_id = response1.data.id;

        form.data.items = form.data.items.filter(item => item.question && item.answer);

		const response2 = await supabase
            .from('Entries')
            .insert(form.data.items.map(item => ({
                ...item,
                dataset_id
            })));

		if (response2.error) {
			return setError(form, 'items', response2.error.message);
		}

        return message(form, 'Dataset created successfully!');
    }
};
