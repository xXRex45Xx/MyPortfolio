import serverAddress from "./server-address.util";

export const getSkills = async () => {
    let response;
    let data;
    try {
        response = await fetch(`${serverAddress}/api/skills`);
        data = await response.json();
    } catch (error) {
        console.error(error);
        throw {
            message: "An unexpected error occurred. Please try again later.",
            status: 500,
        };
    }
    if (!response.ok) throw { message: data.message, status: response.status };
    return data;
};
