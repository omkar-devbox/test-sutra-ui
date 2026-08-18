import { type FC, type ReactNode } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { TopNav, BottomNav } from "@/shared/ui";
import { local } from "@/shared/lib/Storage/localstorage";
import { useAuthContext } from "@/features/auth";

// ==================== Main Layout ====================

export interface MainLayoutProps {
  children?: ReactNode;
  pageTitle?: string;
  pageSubtitle?: string;
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
    role?: string;
    roles?: string[];
  };
  onLogout?: () => void;
}

// ==================== Layout Component ====================

export const MainLayout: FC<MainLayoutProps> = ({
  children,
  pageTitle = "Dashboard",
  pageSubtitle,
  user: customUser,
  onLogout,
}) => {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuthContext();

  // Clear local session data and redirect the user after logout.
  const handleLogout = async () => {
    local.clear();
    await logout();
    if (onLogout) onLogout();
    navigate("/auth/login", { replace: true });
  };

  // Build the display role from multiple roles or fallback to the single role.
  const displayRole = (() => {
    if (customUser?.roles) return customUser.roles.join(", ");
    if (customUser?.role) return customUser.role;
    return authUser?.role || "Admin";
  })();

  // Normalize user data before passing it to layout components.
  const currentUser = {
    name: customUser?.name || authUser?.fullName || "Admin User",
    email: customUser?.email || authUser?.email || "admin@flexflow.com",
    avatar: customUser?.avatar || authUser?.avatar,
    role: displayRole,
    roles: customUser?.roles,
  };

  return (
    // ==================== Application Shell ====================
    <div className="h-screen w-screen bg-[#ebf7ff] dark:bg-[#001929] text-[#004066] dark:text-[#ebf7ff] flex flex-col overflow-hidden font-sans antialiased selection:bg-[#0077be] selection:text-white">

      {/* ==================== Top Navigation ==================== */}
      <TopNav
        title={pageTitle}
        subtitle={pageSubtitle}
        user={{
          name: currentUser.name,
          email: currentUser.email,
          avatar: currentUser.avatar,
          role: currentUser.role,
        }}
        onLogout={handleLogout}
      />

      {/* ==================== Page Content ==================== */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 md:py-6 pb-20 md:pb-6 scrollbar-thin animate-in fade-in duration-200">
        <div className="w-full mx-auto">
          {children || <Outlet />}
        </div>
      </main>

      {/* ==================== Mobile Bottom Navigation ==================== */}
      <BottomNav />
    </div>
  );
};