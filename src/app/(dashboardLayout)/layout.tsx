import { AppSidebar } from "@/components/layout/app-sidebar"
import {
  Breadcrumb,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Roles } from "@/constants/role";
import { userService } from "@/services/user.service";


export default async function DashboardLayout({
  admin,
  student,
  tutor,
} : {
  children: React.ReactNode;
  admin: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
}) {
 const {data}= await  userService.getSession()
    
      const userInfo=data.user

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
            <h1 className="text-4xl text-teal-800">WellCome To Dashboard</h1>
          </Breadcrumb>
        </header>
       <div className="flex flex-1 flex-col gap-4 p-4">
         {/* {userInfo.role == Roles.admin ? admin  : student} */}
         <div className="flex flex-1 flex-col gap-4 p-4">
            {roleBasedContent[userInfo.role]}
          </div>
       </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
