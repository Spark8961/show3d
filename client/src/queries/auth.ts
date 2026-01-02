import { queryOptions } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const authQuery = queryOptions({
    queryKey: ["auth"],
    queryFn: async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error) return null;
        return data.user;
    },
    staleTime: Infinity,
    retry: false,
});
