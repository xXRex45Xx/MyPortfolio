import serverAddress from "../api/server-address.util";
import { clearAdminToken, getAdminToken } from "./admin-token.util";

const normalizeResponseData = async (response) => {
    const text = await response.text();

    if (!text) {
        return null;
    }

    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
};

const toErrorShape = (data, status, fallbackMessage) => {
    if (typeof data === "string") {
        return { status, message: data };
    }

    if (data?.message) {
        return { status, message: data.message };
    }

    if (data?.title) {
        return { status, message: data.title, details: data.errors ?? null };
    }

    return { status, message: fallbackMessage };
};

export const adminFetch = async (path, options = {}) => {
    const token = getAdminToken();

    if (!token) {
        throw { status: 401, message: "Your session expired. Please sign in again." };
    }

    const headers = new Headers(options.headers ?? {});
    headers.set("Authorization", `Bearer ${token}`);

    const isFormData = options.body instanceof FormData;

    if (!isFormData && options.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    let response;

    try {
        response = await fetch(`${serverAddress}${path}`, {
            ...options,
            headers,
        });
    } catch (error) {
        console.error(error);
        throw {
            status: 500,
            message: "An unexpected network error occurred. Please try again later.",
        };
    }

    const data = await normalizeResponseData(response);

    if (response.status === 401 || response.status === 403) {
        clearAdminToken();
        throw {
            status: 401,
            message: "Your session expired. Please sign in again.",
        };
    }

    if (!response.ok) {
        throw toErrorShape(data, response.status, "Something went wrong. Please try again.");
    }

    return data;
};
