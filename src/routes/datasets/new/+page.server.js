import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schema = z.object({
    title: z.string(),
    desc: z.string().optional(),
    is_public: z.boolean(),
    items: z.object({
        question: z.string().min(1),
        answer: z.string().min(1)
    }).array().nonempty()
})

/** @type {import('./$types').PageServerLoad} */
export const load = async (event) => {
	const session = await event.locals.getSession();

    // if the user is already logged in return them to the account page
	if (!session) {
		throw redirect(303, '/login');
	}

	const form = await superValidate(event, schema);

	return { form };
};

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		const { supabase } = event.locals;

		const form = await superValidate(event, schema);

		if (!form.valid) {
			return fail(400, { form })
		}

		const { title, desc, is_public } = form.data;

        const response1 = await supabase
            .from('DataSets')
            .insert({
                title,
                desc,
                is_public
            })
            .select('id')
            .single();

        if (response1.error) {
            form.errors.title = [];
			return setError(form, 'desc', response1.error.message);
        }

        const dataset_id = response1.data.id;

		const response2 = await supabase
            .from('Entries')
            .insert(form.data.items.map(item => ({
                ...item,
                dataset_id
            })));

		if (response2.error) {
			return setError(form, 'items', response2.error.message);
		}

        return { form };
    }
};