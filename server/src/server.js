import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
}

export const serverSupabaseClient = createClient(supabaseUrl, supabaseKey);

const createUserScopedClient = (req) => {
    const supabase = createClient(supabaseUrl, supabaseKey, { global: { headers: { Authorization: req.headers.authorization } } });
    return supabase;
};

const app = express();
app.use(express.json());
app.use(cors());

const api = express.Router();

api.use(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.slice("Bearer ".length);
    const { data, error } = await serverSupabaseClient.auth.getUser(token);

    if (error || !data?.user) {
        return res.status(401).json({ error: "Invalid token" });
    }

    req.user = data.user;
    next();
});

api.get("/profile", async (req, res) => {
    const userScopedClient = createUserScopedClient(req);
    const { data, error } = await userScopedClient.from("profiles").select("*").maybeSingle();
    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.json({ profile: data });
});

api.post("/profile/create", async (req, res) => {
    const userScopedClient = createUserScopedClient(req);
    const { displayname, username } = req.body;
    const { error } = await userScopedClient.from("profiles").insert({ user_id: req.user.id, display_name: displayname, username });
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    return res.sendStatus(201);
});

app.use("/api", api);

app.listen(3000, () => {
    console.log("API running on http://localhost:3000");
});
