"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // 👇 Fetch templates linked to this user
        const { data, error } = await supabase
          .from("templates")
          .select("*")
          .eq("user_id", user.id);

        if (!error) {
          setTemplates(data);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!user) return <p className="p-6">Please sign in to view your profile.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {/* User Info */}
      <div className="flex items-center space-x-4 mb-8">
        <img
          src={user.user_metadata?.avatar_url || "/default-avatar.png"}
          alt="User Avatar"
          className="w-16 h-16 rounded-full border"
        />
        <div>
          <h2 className="text-lg font-semibold">
            {user.user_metadata?.full_name || user.email}
          </h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Templates Section */}
      <h2 className="text-xl font-semibold mb-4">My Templates</h2>
      {templates.length === 0 ? (
        <p className="text-gray-600">No templates used yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="shadow-md">
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {template.description || "No description"}
                </p>
                <Button
                  onClick={() => (window.location.href = `/templates/edit/${template.id}`)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                >
                  Edit Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
