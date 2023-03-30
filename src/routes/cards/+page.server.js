/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase }}) {
    let { data } = await supabase
        .from('DataSets')
        .select(`
            id,
            title,
            desc
        `)
        .eq('is_public', true);

    let datasets = data ?? [];

    return { datasets };
}
