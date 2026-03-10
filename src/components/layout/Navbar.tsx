"use client";

import { useState, useEffect } from "react";
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
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // ✅ Load user from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const isAuth = localStorage.getItem('isAuthenticated');
      
      if (storedUser && isAuth === 'true') {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const userRole = user?.role;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setUser(null);
    router.push('/');
    router.refresh();
  };

  // ✅ Loading state
  if (isLoading) {
    return (
      <section className={cn("py-4 border-b bg-background", className)}>
        <div className="w-full mx-auto px-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-32 bg-muted animate-pulse rounded" />
            </div>
            <div className="h-9 w-20 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("py-4 border-b bg-background", className)}>
      <div className="w-full mx-auto px-10">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Left - Logo + Nav Links */}
          <div className="flex items-center gap-16">
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
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right - Auth Section */}
          <div className="flex items-center gap-8">
            <ModeToggle />

            {user ? (
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
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

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

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
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
              <ModeToggle />

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

                      <Link
                        href={user ? getDashboardLink(userRole) : "/login"}
                        className="flex items-center gap-2 text-md font-semibold hover:text-primary transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </div>

                    <div className="border-t pt-4">
                      {user ? (
                        <div className="flex flex-col gap-3">
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
                              <p className="text-xs text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>

                          <Link
                            href="/profile"
                            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                          >
                            <User className="h-4 w-4" />
                            Profile
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400 hover:opacity-80 transition-opacity"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </div>
                      ) : (
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