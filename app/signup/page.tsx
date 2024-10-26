"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, password }),
    });

    setLoading(false); // Set loading to false

    if (response.ok) {
      const { token } = await response.json();
      Cookies.set("token", token);
      router.push("/home");
    } else {
      alert("Registration failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden bg-neutral-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-12 rounded-lg shadow-xl max-w-md w-full bg-neutral-800"
      >
        <h1 className="text-5xl font-bold mb-8 text-center text-blue-500">
          STEEM
        </h1>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              "Registrar"
            )}
          </Button>

          <div className="mt-8 text-center">
            <a
              href="#"
              className="text-white hover:text-blue-400 transition-colors font-semibold"
              onClick={() => router.push("/login")}
            >
              Voltar para o login
            </a>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
