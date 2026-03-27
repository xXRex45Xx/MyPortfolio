import { redirect } from "react-router-dom";
import { getAdminToken } from "./admin-token.util";

export const requireAdminSession = () => {
    if (!getAdminToken()) {
        throw redirect("/admin/login");
    }

    return null;
};

export const redirectIfAdminSession = () => {
    if (getAdminToken()) {
        throw redirect("/admin");
    }

    return null;
};
