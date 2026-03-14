export const dynamic = 'force-dynamic';

import { AppSidebar } from "@/components/layout/app-sidebar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/role";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  admin,
  student,
  tutor,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
}) {
  const cookieStore = await cookies();

  // ✅ Server-side এ BACKEND_URL use করুন (NEXT_PUBLIC_ ছাড়া)
  const backendURL =
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:5000";

  // ✅ Cookie সঠিকভাবে forward করুন
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  let session = null;

  try {
    const response = await fetch(`${backendURL}/api/auth/get-session`, {
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (response.ok) {
      session = await response.json();
    }
  } catch (error) {
    console.error("Session fetch error:", error);
  }

  if (!session?.user) {
    redirect("/login");
  }

  const userInfo = session.user;

  const roleBasedContent: Record<string, React.ReactNode> = {
    [Roles.admin]: admin,
    [Roles.student]: student,
    [Roles.tutor]: tutor,
  };

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <h1 className="text-4xl">Welcome To Dashboard</h1>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {roleBasedContent[userInfo.role]}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
