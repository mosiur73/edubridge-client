"use client";

import { Menu, LogOut, User, LayoutDashboard, BookOpen, Star, Home, Users, Phone, Info } from "lucide-react";
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

// ✅ Logged out — 4 routes
const publicMenu = [
  { title: "Home", url: "/", icon: Home },
  { title: "Browse Tutors", url: "/tutors", icon: Users },
  { title: "About", url: "/about", icon: Info },
  { title: "Contact", url: "/contact", icon: Phone },
];

// ✅ Logged in — 6 routes
const authMenu = [
  { title: "Home", url: "/", icon: Home },
  { title: "Browse Tutors", url: "/tutors", icon: Users },
  { title: "About", url: "/about", icon: Info },
  { title: "Contact", url: "/contact", icon: Phone },
  { title: "My Bookings", url: "/dashboard/bookings", icon: BookOpen },
  { title: "My Reviews", url: "/dashboard/reviews", icon: Star },
];

// Tutor logged in menu
const tutorMenu = [
  { title: "Home", url: "/", icon: Home },
  { title: "Browse Tutors", url: "/tutors", icon: Users },
  { title: "About", url: "/about", icon: Info },
  { title: "Contact", url: "/contact", icon: Phone },
  { title: "My Sessions", url: "/tutor-dashboard", icon: BookOpen },
  { title: "Availability", url: "/tutor-dashboard/availability", icon: Star },
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

  // Choose menu based on role
  const getMenu = () => {
    if (!user) return publicMenu;
    if (userRole === "TUTOR") return tutorMenu;
    if (userRole === "ADMIN") return publicMenu; // Admin has own dashboard
    return authMenu;
  };

  const menu = getMenu();

  return (
    // ✅ sticky top-0 z-50
    <section className={cn("py-3 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50", className)}>
      <div className="w-full mx-auto px-6 lg:px-10">
        {/* ===================== Desktop Menu ===================== */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Left — Logo + Nav Links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-blue-600 dark:text-blue-400">
                EduBridge
              </span>
            </Link>

            {/* Nav Links */}
            <NavigationMenu>
              <NavigationMenuList>
                {menu.slice(0, 4).map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      asChild
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                    >
                      <Link href={item.url}>{item.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                {/* Extra menu items for logged in users */}
                {!isPending && user && menu.length > 4 && (
                  <NavigationMenuItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground gap-1">
                        More
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {menu.slice(4).map((item) => (
                          <DropdownMenuItem key={item.title} asChild>
                            <Link href={item.url} className="flex items-center gap-2">
                              <item.icon className="w-4 h-4" />
                              {item.title}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={getDashboardLink(userRole)} className="flex items-center gap-2">
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </NavigationMenuItem>
                )}

                {!isPending && !user && (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                    >
                      <Link href="/login">Dashboard</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <ModeToggle />

            {isPending ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    {user.image ? (
                      <img src={user.image} alt={user.name ?? "User"} className="h-9 w-9 rounded-full object-cover" />
                    ) : (
                      <span>{user.name?.charAt(0)?.toUpperCase() || "U"}</span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium">
                      {userRole || "STUDENT"}
                    </span>
                  </div>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href={getDashboardLink(userRole)} className="flex items-center gap-2 cursor-pointer">
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
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* ===================== Mobile Menu ===================== */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-blue-600 dark:text-blue-400">
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
                        <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-blue-600">EduBridge</span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-6 p-4">
                    <div className="flex flex-col gap-2">
                      {menu.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                        >
                          <item.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          {item.title}
                        </Link>
                      ))}

                      {!isPending && (
                        <Link
                          href={user ? getDashboardLink(userRole) : "/login"}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          Dashboard
                        </Link>
                      )}
                    </div>

                    <div className="border-t pt-4">
                      {!isPending && user ? (
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-3 px-3 py-2 bg-muted rounded-lg">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold overflow-hidden flex-shrink-0">
                              {user.image ? (
                                <img src={user.image} alt={user.name ?? ""} className="h-10 w-10 object-cover" />
                              ) : (
                                <span>{user.name?.charAt(0)?.toUpperCase()}</span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold truncate">{user.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                            </div>
                          </div>

                          <Link
                            href="/profile"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                          >
                            <User className="h-4 w-4" />
                            Profile
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <Button asChild variant="outline" className="w-full">
                            <Link href="/login">Login</Link>
                          </Button>
                          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
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
