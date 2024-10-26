"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import { Loading } from "@/components/Loading";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
    } else {
      router.push("/home");
    }
  }, [router]);

  return <Loading />;
}
