const ADMIN_TOKEN_KEY = "portfolio.admin.token";
const ADMIN_THEME_KEY = "portfolio.theme";

const parseTokenPayload = (token) => {
    try {
        const [, payload] = token.split(".");
        if (!payload) {
            return null;
        }

        const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
        const decoded = window.atob(normalized);
        return JSON.parse(decoded);
    } catch {
        return null;
    }
};

export const getAdminToken = () => localStorage.getItem(ADMIN_TOKEN_KEY) ?? "";

export const saveAdminToken = (token) => {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const clearAdminToken = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
};

export const getStoredTheme = () => localStorage.getItem(ADMIN_THEME_KEY);

export const saveStoredTheme = (theme) => {
    localStorage.setItem(ADMIN_THEME_KEY, theme);
};

export const getAdminIdentity = () => {
    const token = getAdminToken();
    const payload = token ? parseTokenPayload(token) : null;

    return {
        token,
        username:
            payload?.unique_name ??
            payload?.name ??
            payload?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ??
            "Admin",
    };
};
