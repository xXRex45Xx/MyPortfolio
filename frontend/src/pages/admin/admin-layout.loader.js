import { requireAdminSession } from "../../utils/auth/admin-route.util";

export const loader = () => requireAdminSession();
