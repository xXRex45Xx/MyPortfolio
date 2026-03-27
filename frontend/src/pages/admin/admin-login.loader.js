import { redirectIfAdminSession } from "../../utils/auth/admin-route.util";

export const loader = () => redirectIfAdminSession();
