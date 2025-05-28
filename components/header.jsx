import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react";
import { checkuser } from "@/lib/checkUser";

const Header = async ({ isAdminPage = false }) => {
  const user = await checkuser();
  const isAdmin = user?.role === "ADMIN";
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="mx-auto px-4 py-2 flex items-center justify-between">
        <Link href={isAdmin ? "/admin" : "/"} className="flex">
          <Image
            src="/car-images/logo2.png"
            width={300}
            height={50}
            className="object-contain h-20 w-auto"
            alt="motorspace"
          />
          {isAdminPage && (
            <span className="text-xs font-extralight">Admin</span>
          )}
        </Link>
        <div className="flex items-center space-x-4">
          {isAdminPage ? (
            <Link href="/saved-cars">
              <Button variant="destructive" className="flex items-center gap-2">
                <ArrowLeft size={18} />
                <span>Back</span>
              </Button>
            </Link>
          ) : (
            <SignedIn>
              <Link href="/saved-cars">
                <Button>
                  <Heart size={18} />
                  <span className="hidden md:inline">Saved cars</span>
                </Button>
              </Link>
              {isAdmin ? (
                <Link href="/admin">
                  <Button variant="outline">
                    <Layout size={18} />
                    <span>Admin Portal</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/reservations">
                  <Button variant="outline">
                    <CarFront size={18} />
                    <span className="hidden md:inline">Reservations</span>
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
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
