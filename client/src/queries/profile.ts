import { queryOptions } from "@tanstack/react-query";

export const authQuery = queryOptions({
    queryKey: ["session"],
    queryFn: async () => {
        const { data, error };
        if (error) throw error;
        return data.session;
    },
    staleTime: Infinity,
    retry: false,
});
