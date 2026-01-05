import { supabase } from "@/lib/supabase";
import { queryOptions } from "@tanstack/react-query";

export const profileQuery = (uid: string | null) =>
    queryOptions({
        queryKey: ["profile", uid],
        enabled: !!uid,
        queryFn: async () => {
            const { data, error } = await supabase.from("profiles").select("*").eq("user_id", uid).maybeSingle();
            if (error) throw error;
            return data;
        },
        staleTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
