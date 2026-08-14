import type { FieldSecurityConfig, RoleAction } from "../types/types";

export interface FieldAccessResult {
  isAllowed: boolean;
  action: "allow" | RoleAction;
}

export interface UserSecurityContext {
  roles?: string[];
  permissions?: Record<string, any> | string[] | null;
  hasPermission?: (resource: string, action?: string) => boolean;
}

/**
 * Check if current user has access to a form field based on roles and permissions.
 */
export const checkFieldAccess = (
  field: FieldSecurityConfig,
  context?: UserSecurityContext
): FieldAccessResult => {
  const roleAction: RoleAction = field.roleAction || "hide";

  // Resolve user roles & permissions
  const activeRoles = field.userRoles || context?.roles || [];
  const activePermissions = field.userPermissions || context?.permissions || null;
  const permissionChecker = field.hasPermission || context?.hasPermission;

  // 1. Role Check
  if (field.roles && Array.isArray(field.roles) && field.roles.length > 0) {
    const userRoleSet = new Set(activeRoles.map((r) => String(r).toLowerCase()));
    const hasRoleMatch = field.roles.some((role) =>
      userRoleSet.has(String(role).toLowerCase()) || role === "*"
    );

    if (!hasRoleMatch) {
      return { isAllowed: false, action: roleAction };
    }
  }

  // 2. Permission Check via Custom Function or Permission List
  if (permissionChecker && field.permissionResource) {
    const action = field.permissionAction || "read";
    const allowed = permissionChecker(field.permissionResource, action);
    if (!allowed) {
      return { isAllowed: false, action: roleAction };
    }
  }

  if (field.permissions && Array.isArray(field.permissions) && field.permissions.length > 0) {
    let hasPermMatch = false;

    if (permissionChecker) {
      hasPermMatch = field.permissions.some((perm) => {
        if (typeof perm === "string") {
          return permissionChecker(perm) || permissionChecker(perm, "read");
        } else if (typeof perm === "object" && perm !== null) {
          return permissionChecker(perm.resource, perm.action || "read");
        }
        return false;
      });
    } else if (activePermissions) {
      // Fallback simple string matching if activePermissions is array or object
      hasPermMatch = field.permissions.some((perm) => {
        const targetPerm = typeof perm === "string" ? perm : perm.resource;
        if (Array.isArray(activePermissions)) {
          return activePermissions.some((p) =>
            String(p).toLowerCase() === targetPerm.toLowerCase()
          );
        } else if (typeof activePermissions === "object") {
          return (
            targetPerm in activePermissions ||
            Object.keys(activePermissions).some(
              (k) => k.toLowerCase() === targetPerm.toLowerCase()
            )
          );
        }
        return false;
      });
    } else {
      // No permissions context available, default to false if permissions are required
      hasPermMatch = false;
    }

    if (!hasPermMatch) {
      return { isAllowed: false, action: roleAction };
    }
  }

  return { isAllowed: true, action: "allow" };
};
