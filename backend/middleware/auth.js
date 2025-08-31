import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // service role key
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function auth(req, res, next) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token with Supabase
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Attach user ID to req.user for backend routes
    req.user = { id: user.id };

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
