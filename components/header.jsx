import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react";

const HeaderComponent = async ({ isAdminPage = false }) => {
  const isAdmin = false;

  return (
    <header className="fixed top-0 w-full bg-white/80 border-b z-50 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          href={isAdmin ? "/admin" : "/"}
          className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight hover:opacity-80 transition"
        >
          Motorspace<span className="text-primary">_Kenya</span>
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {isAdminPage ? (
            <>
              <Link href="/" className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft size={18} />
                  <span className="hidden md:inline">Back</span>
                </Button>
              </Link>
            </>
          ) : (
            <SignedIn>
              <Link href="/saved-cars" className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <CarFront size={18} />
                  <span className="hidden md:inline">Saved Cars</span>
                </Button>
              </Link>
              {!isAdmin ? (
                <Link href="/reservations" className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Heart size={18} />
                    <span className="hidden md:inline">Reservations</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/admin" className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Layout size={18} />
                    <span className="hidden md:inline">Admin</span>
                  </Button>
                </Link>
              )}
            </SignedIn>
          )}
          <SignedOut>
            <SignInButton forceRedirectUrl="/">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>

      {/* Admin tag */}
      {isAdmin && (
        <div className="text-center py-1 bg-yellow-100 text-yellow-700 text-xs font-medium">
          Admin Panel
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;








