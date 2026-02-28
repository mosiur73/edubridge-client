"use client";

import { Menu, LogOut, User, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";


const getDashboardLink = (role?: string | null) => {
  if (role === "TUTOR") return "/tutor-dashboard";
  if (role === "ADMIN") return "/admin-dashboard";
  return "/dashboard";
};


const publicMenu = [
  { title: "Home", url: "/" },
  { title: "Browse Tutors", url: "/tutors" },
  { title: "About", url: "/about" },
  { title: "Contact", url: "/contact" },
];

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;
  const userRole = (user as any)?.role as string | undefined;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <section className={cn("py-4 border-b bg-background", className)}>
      <div className="w-full mx-auto px-10">

        {/* ===================== Desktop Menu ===================== */}
        <nav className="hidden items-center justify-between lg:flex">

          {/* Left — Logo + Nav Links */}
          <div className="flex items-center gap-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                className="max-h-8 dark:invert"
                alt="logo"
              />
              <span className="text-lg font-semibold tracking-tighter">
                EduBridge
              </span>
            </Link>

            {/* Nav Links */}
            <NavigationMenu>
              <NavigationMenuList>
                {publicMenu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      asChild
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                    >
                      <Link href={item.url}>{item.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                {/* ✅ Login থাকলে role অনুযায়ী dashboard route */}
                {/* ✅ Login না থাকলে /login এ redirect */}
                {!isPending && (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                    >
                      <Link href={user ? getDashboardLink(userRole) : "/login"}>
                        Dashboard
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right — Auth Buttons */}
          <div className="flex items-center gap-8">
            {/* ✅ Dark Mode Toggle — সবসময় দেখাবে */}
            <ModeToggle />

            {isPending ? (
              // Loading skeleton
              <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
            ) : user ? (
              // ✅ Logged in — Profile image + Dropdown
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name ?? "User"}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <span>{user.name?.charAt(0)?.toUpperCase() || "U"}</span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {/* User info */}
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />

                  {/* Profile link — role অনুযায়ী */}
                  <DropdownMenuItem asChild>
                    <Link
                      // href={userRole === "TUTOR" ? "/tutor/profile" : "/dashboard/profile"}
                      href="/profile"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  {/* Dashboard link */}
                  <DropdownMenuItem asChild>
                    <Link
                      href={getDashboardLink(userRole)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  {/* Logout */}
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 dark:text-red-400 cursor-pointer focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // ✅ Logged out — Login + Register buttons
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* ===================== Mobile Menu ===================== */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                className="max-h-8 dark:invert"
                alt="logo"
              />
              <span className="text-lg font-semibold tracking-tighter">
                EduBridge
              </span>
            </Link>

            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <ModeToggle />

              {/* Mobile Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Link href="/" className="flex items-center gap-2">
                        <span className="text-lg font-semibold">EduBridge</span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-6 p-4">
                    {/* Mobile Nav Links */}
                    <div className="flex flex-col gap-4">
                      {publicMenu.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          className="text-md font-semibold hover:text-primary transition-colors"
                        >
                          {item.title}
                        </Link>
                      ))}

                      {/* Dashboard — login থাকলে role অনুযায়ী, না থাকলে /login */}
                      {!isPending && (
                        <Link
                          href={user ? getDashboardLink(userRole) : "/login"}
                          className="flex items-center gap-2 text-md font-semibold hover:text-primary transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>
                      )}
                    </div>

                    <div className="border-t pt-4">
                      {!isPending && user ? (
                        // ✅ Logged in
                        <div className="flex flex-col gap-3">
                          {/* User info */}
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold overflow-hidden">
                              {user.image ? (
                                <img
                                  src={user.image}
                                  alt={user.name ?? ""}
                                  className="h-10 w-10 object-cover"
                                />
                              ) : (
                                <span>{user.name?.charAt(0)?.toUpperCase()}</span>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>

                          {/* Profile */}
                          <Link
                            // href={userRole === "TUTOR" ? "/tutor/profile" : "/dashboard/profile"}
                            href="/profile"
                            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                          >
                            <User className="h-4 w-4" />
                            Profile
                          </Link>

                          {/* Logout */}
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400 hover:opacity-80 transition-opacity"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </div>
                      ) : (
                        // ✅ Logged out
                        <div className="flex flex-col gap-3">
                          <Button asChild variant="outline">
                            <Link href="/login">Login</Link>
                          </Button>
                          <Button asChild>
                            <Link href="/register">Register</Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export { Navbar };
