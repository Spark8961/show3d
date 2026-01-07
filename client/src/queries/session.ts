import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

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
