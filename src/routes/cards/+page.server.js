/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase }}) {
    let { data } = await supabase
        .from('DataSets')
        .select(`
            id,
            title,
            desc,
            is_public
        `);

    let datasets = data ?? [];

    return { datasets };
}
