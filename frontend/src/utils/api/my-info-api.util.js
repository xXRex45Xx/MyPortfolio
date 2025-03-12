import serverAddress from "./server-address.util";

export const getMyInfo = async () => {
    const response = await fetch(`${serverAddress}/api/myinfo`);
    const data = await response.json();
    if (!response.ok) throw { message: data.message, status: response.status };
    return data;
};
