import { invalidate } from '$app/navigation';
import {
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
} from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch, data, depends }) {
    depends('supabase:auth');

    const supabase = createSupabaseLoadClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event: { fetch },
        serverSession: data.session
    });

    const {
        data: { session }
    } = await supabase.auth.getSession();

    return { supabase, session };
}
