import serverAddress from "./server-address.util";

export const getProjects = async () => {
    const response = await fetch(`${serverAddress}/api/project`);
    const data = await response.json();
    if (!response.ok) throw { message: data.message, status: response.status };
    return data;
};

export const getProject = async (id) => {
    const response = await fetch(`${serverAddress}/api/project/${id}`);
    const data = await response.json();
    if (!response.ok) throw { message: data.message, status: response.status };
    return data;
};
