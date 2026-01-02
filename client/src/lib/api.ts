import { supabase } from "@/queries/auth";
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

axios.interceptors.request.use(
    async (config) => {
        const {
            data: { session },
        } = await supabase.auth.getSession();
        if (session?.access_token) config.headers.Authorization = `Bearer ${session.access_token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
