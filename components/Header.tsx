"use client";

import { useEffect, useState } from "react";
import { Cog, Menu, X, Home, Settings, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { Cart } from "./Cart";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon?: React.ElementType;
  disabled?: boolean;
};

const mainNavItems: NavItem[] = [{ href: "/home", label: "Home" }];

function NavLink({
  href,
  label,
  className,
  disabled,
}: NavItem & { className?: string }) {
  return (
    <Link
      href={disabled ? "#" : href}
      className={cn(
        "text-neutral-400 hover:text-neutral-100 transition-colors",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      {label}
    </Link>
  );
}

function MobileNav({ items }: { items: NavItem[] }) {
  return (
    <nav className="md:hidden border-t border-neutral-700 mt-4 pt-4">
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <NavLink {...item} className="block py-2" />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Header({ includeCart = false }: { includeCart?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setIsAdmin(decoded.role === "ADMIN");
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-neutral-800 border-b border-neutral-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            className="text-2xl font-bold flex items-center text-neutral-100"
            href="/home"
          >
            <Cog className="mr-2" />
            STEEM <span className="ml-2 text-sm">&copy;</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            {mainNavItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}

            {isAdmin && <AdminDropdown />}
          </nav>
          <div className="flex items-center space-x-4">
            {includeCart && <Cart />}
            <ProfileDropdown />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-neutral-400 hover:text-neutral-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        {mobileMenuOpen && <MobileNav items={mainNavItems} />}
      </div>
    </header>
  );
}

export function AdminDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link
          href="#"
          className="text-neutral-400 hover:text-neutral-100 transition-colors"
        >
          Admin
        </Link>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          <Link href="/admin" className="w-full">
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/admin/category" className="w-full">
            Categories
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/admin/product" className="w-full">
            Products
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-neutral-400 hover:text-neutral-100"
        >
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          <Link href="/user-profile" className="w-full">
            Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/login" className="w-full">
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
