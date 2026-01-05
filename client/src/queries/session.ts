import { supabase } from "@/lib/supabase";
import { queryOptions } from "@tanstack/react-query";

export const sessionQuery = queryOptions({
    queryKey: ["session"],
    queryFn: async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        return data.session;
    },
    staleTime: Infinity,
    retry: false,
});
