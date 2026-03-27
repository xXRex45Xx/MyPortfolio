import serverAddress from "./server-address.util";

const parseResponse = async (response) => {
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

const toError = (response, data, fallbackMessage) => {
    if (typeof data === "string") {
        return { status: response.status, message: data };
    }

    return {
        status: response.status,
        message: data?.message ?? data?.title ?? fallbackMessage,
        details: data?.errors ?? null,
    };
};

export const loginAdmin = async (credentials) => {
    let response;

    try {
        response = await fetch(`${serverAddress}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    } catch (error) {
        console.error(error);
        throw {
            status: 500,
            message: "Unable to reach the server right now. Please try again later.",
        };
    }

    const data = await parseResponse(response);

    if (!response.ok) {
        throw toError(response, data, "Invalid credentials.");
    }

    return data;
};

export const resetAdminPassword = async (payload) => {
    let response;

    try {
        response = await fetch(`${serverAddress}/api/auth/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
    } catch (error) {
        console.error(error);
        throw {
            status: 500,
            message: "Unable to reach the server right now. Please try again later.",
        };
    }

    const data = await parseResponse(response);

    if (!response.ok) {
        throw toError(response, data, "Unable to update the password.");
    }

    return data;
};
