"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: user, password }),
    });

    setLoading(false); // Set loading to false

    if (response.ok) {
      const { token } = await response.json();
      Cookies.set("token", token);
      router.push("/home");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200 text-white flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-12 rounded-lg shadow-xl max-w-md w-full bg-neutral-800"
      >
        <h1 className="text-5xl font-bold mb-8 text-center text-blue-500">
          STEEM
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Usuário"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
        <div className="mt-8 text-center">
          <a
            href="#"
            className="text-white hover:text-blue-400 transition-colors font-semibold"
            onClick={() => router.push("/signup")}
          >
            Registrar
          </a>
        </div>
      </motion.div>
    </div>
  );
}
