/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals: { supabase }}) {
    const { id } = params;

    let { data } = await supabase
        .from('Entries')
        .select('question, answer')
        .eq('dataset_id', id);

    /** @type {{ question: string, answer: string }[]} */
    let entries = data ?? [];

    return { entries };
}
