import { api } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

export const profileQuery = (uid: string | null) =>
    queryOptions({
        queryKey: ["profile", uid],
        enabled: !!uid,
        queryFn: async () => {
            const { data } = await api.get("/profile");
            return data;
        },
        staleTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
