import { lazy, Suspense, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Loader2 } from "lucide-react";
import { SIDEBAR_MENU } from "../menu/menuItems";

// Lazy loading page components
const RoleDashboardManager = lazy(() =>
  import("@/features/dashboard").then((m) => ({ default: m.RoleDashboardManager }))
);
const AdminDashboard = lazy(() =>
  import("@/features/dashboard").then((m) => ({ default: m.AdminDashboard }))
);
const StaffDashboard = lazy(() =>
  import("@/features/dashboard").then((m) => ({ default: m.StaffDashboard }))
);
const CustomerDashboard = lazy(() =>
  import("@/features/dashboard").then((m) => ({ default: m.CustomerDashboard }))
);
const ExcelDashboard = lazy(() => import("@/features/excel/ExcelDashboard"));
const PaperTypesPage = lazy(() => import("@/features/paperTypes/items/PaperTypesPage"));
const UsersPage = lazy(() => import("@/features/users/items/UsersPage"));
const ProfilePage = lazy(() => import("@/features/profile/ProfilePage"));
const CustomersPage = lazy(() => import("@/features/customers/items/CustomersPage"));
const OrdersPage = lazy(() => import("@/features/orders/items/OrdersPage"));
const OrderCreationTerminal = lazy(() => import("@/features/orders/items/OrderCreationTerminal"));

// Auth Feature Pages
const LoginPage = lazy(() => import("@/features/auth/items/LoginPage"));
const SignupPage = lazy(() => import("@/features/auth/items/SignupPage"));
const ForgotPasswordPage = lazy(() => import("@/features/auth/items/ForgotPasswordPage"));
const VerifyPage = lazy(() => import("@/features/auth/items/VerifyPage"));
const ResetPasswordPage = lazy(() => import("@/features/auth/items/ResetPasswordPage"));
const GenericPage = lazy(() => import("@/shared/pages/GenericPage/GenericPage"));
const UnauthorizedPage = lazy(() =>
  import("@/shared/pages/unauthorized/UnauthorizedPage")
);
const NotFoundPage = lazy(() =>
  import("@/shared/pages/notfound/NotFoundPage")
);


import { ProtectedRoute, PublicRoute } from "./guards";

/**
 * Fallback loader shown while lazy loaded chunks are being fetched
 */
function PageLoader() {
  return (
    <div className="w-full h-96 flex flex-col items-center justify-center gap-3 text-[#004066]/60 dark:text-[#ebf7ff]/60">
      <Loader2 size={32} className="animate-spin text-[#0077be]" />
      <span className="text-xs font-semibold tracking-wide uppercase">Loading Page Module...</span>
    </div>
  );
}

export function AppRouter() {
  // Memoized dynamic sidebar module & settings routes
  const moduleRoutes = useMemo(() => {
    return SIDEBAR_MENU.flatMap((section) =>
      section.items.flatMap((item) => {
        const routes: { path: string; title: string; subtitle: string }[] = [];

        const addRoute = (p?: string, label?: string, tooltip?: string) => {
          if (!p || p === "/") return;
          routes.push({
            path: p,
            title: label || "Module Page",
            subtitle: tooltip || `Manage ${label || "module details"}`,
          });
          // Settings sub-route
          const settingsPath = p.endsWith("/batches")
            ? `${p}/batches-form-settings`
            : `${p}/settings`;
          routes.push({
            path: settingsPath,
            title: `${label || "Module"} Settings`,
            subtitle: `Configure form fields & settings for ${label || "module"}`,
          });
        };

        addRoute(item.path, item.label, item.tooltip);

        if (item.children) {
          item.children.forEach((child) => {
            addRoute(child.path, child.label, child.tooltip);
          });
        }

        return routes;
      })
    );
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Protected Application Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Role Dashboards */}
          <Route
            path="/"
            element={
              <MainLayout pageTitle="Role Dashboard" pageSubtitle="Role-based overview for Admin, Staff & Customer">
                <RoleDashboardManager />
              </MainLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <MainLayout pageTitle="Role Dashboard" pageSubtitle="Role-based overview for Admin, Staff & Customer">
                <RoleDashboardManager />
              </MainLayout>
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <MainLayout pageTitle="Admin Dashboard" pageSubtitle="Executive Overview & Business Analytics">
                <AdminDashboard />
              </MainLayout>
            }
          />
          <Route
            path="/dashboard/staff"
            element={
              <MainLayout pageTitle="Staff Dashboard" pageSubtitle="Production Workstation & Print Floor Queue">
                <StaffDashboard />
              </MainLayout>
            }
          />
          <Route
            path="/dashboard/customer"
            element={
              <MainLayout pageTitle="Customer Dashboard" pageSubtitle="Customer Self-Service & Active Order Tracker">
                <CustomerDashboard />
              </MainLayout>
            }
          />
          <Route
            path="/excel-dashboard"
            element={
              <MainLayout pageTitle="Excel Intelligence & AI Modifier" pageSubtitle="Deep openpyxl analysis & LLM automation">
                <ExcelDashboard />
              </MainLayout>
            }
          />

          {/* Paper Types Feature Route */}
          <Route
            path="/configuration/paper-types"
            element={
              <MainLayout pageTitle="Paper Type Setting" pageSubtitle="Configure paper stock specifications & pricing">
                <PaperTypesPage />
              </MainLayout>
            }
          />

          {/* Users Feature Route */}
          <Route
            path="/configuration/users"
            element={
              <MainLayout pageTitle="Users" pageSubtitle="Manage user accounts, contact details & system access roles">
                <UsersPage />
              </MainLayout>
            }
          />

          {/* Customers Feature Route */}
          <Route
            path="/customers"
            element={
              <MainLayout pageTitle="Customers" pageSubtitle="Manage customer accounts, contact details & corporate clients">
                <CustomersPage />
              </MainLayout>
            }
          />

          {/* User Profile Route */}
          <Route
            path="/profile"
            element={
              <MainLayout pageTitle="My Profile" pageSubtitle="Manage your account profile, security credentials & preferences">
                <ProfilePage />
              </MainLayout>
            }
          />

          {/* Orders Feature Routes */}
          <Route
            path="/orders"
            element={
              <MainLayout pageTitle="Orders Management" pageSubtitle="Track print jobs, production status, customer billing & manifests">
                <OrdersPage />
              </MainLayout>
            }
          />
          <Route
            path="/orders/create"
            element={
              <MainLayout pageTitle="Order Form" pageSubtitle="Create & configure print production specifications">
                <OrderCreationTerminal />
              </MainLayout>
            }
          />

          {/* Dynamic Sidebar Module & Settings Routes */}
          {moduleRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <MainLayout pageTitle={route.title} pageSubtitle={route.subtitle}>
                  <GenericPage />
                </MainLayout>
              }
            />
          ))}
        </Route>

        {/* Public Auth Feature Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/verify" element={<VerifyPage />} />
          <Route path="/auth/otp" element={<VerifyPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Unauthorized Route */}
        <Route
          path="/unauthorized"
          element={<UnauthorizedPage />}
        />

        {/* Fallback 404 Route */}
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </Suspense>
  );
}

