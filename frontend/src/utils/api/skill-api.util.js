import serverAddress from "./server-address.util";

export const getSkills = async () => {
    const response = await fetch(`${serverAddress}/api/skills`);
    const data = await response.json();
    if (!response.ok) throw { message: data.message, status: response.status };
    return data;
};
