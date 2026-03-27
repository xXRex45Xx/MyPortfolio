import { adminFetch } from "../auth/admin-fetch.util";
import { getMyInfo } from "./my-info-api.util";
import { getProject, getProjects } from "./project-api.util";
import { getSkills } from "./skill-api.util";
import { getSocialMediaLinks } from "./social-media-api.util";

export const getAdminOverview = async () => {
    const [myInfo, projects, skills, socialMediaLinks] = await Promise.all([
        getMyInfo(),
        getProjects(),
        getSkills(),
        getSocialMediaLinks(),
    ]);

    return {
        myInfo,
        projects,
        skills,
        socialMediaLinks,
    };
};

export const updateMyInfoAdmin = (payload) =>
    adminFetch("/api/myinfo", {
        method: "PUT",
        body: JSON.stringify(payload),
    });

export const getProjectAdmin = (id) => getProject(id);

export const createProjectAdmin = (formData) =>
    adminFetch("/api/project", {
        method: "POST",
        body: formData,
    });

export const updateProjectAdmin = (id, formData) =>
    adminFetch(`/api/project/${id}`, {
        method: "PUT",
        body: formData,
    });

export const deleteProjectAdmin = (id) =>
    adminFetch(`/api/project/${id}`, {
        method: "DELETE",
    });

export const createSkillAdmin = (payload) =>
    adminFetch("/api/skills", {
        method: "POST",
        body: JSON.stringify(payload),
    });

export const updateSkillAdmin = (id, payload) =>
    adminFetch(`/api/skills/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });

export const deleteSkillAdmin = (id) =>
    adminFetch(`/api/skills/${id}`, {
        method: "DELETE",
    });

export const createSocialMediaAdmin = (payload) =>
    adminFetch("/api/socialmedia", {
        method: "POST",
        body: JSON.stringify(payload),
    });

export const updateSocialMediaAdmin = (id, payload) =>
    adminFetch(`/api/socialmedia/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });

export const deleteSocialMediaAdmin = (id) =>
    adminFetch(`/api/socialmedia/${id}`, {
        method: "DELETE",
    });

export const uploadResumeAdmin = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return adminFetch("/api/files/resume", {
        method: "POST",
        body: formData,
    });
};

export const uploadProfilePictureAdmin = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return adminFetch("/api/files/profile-picture", {
        method: "POST",
        body: formData,
    });
};
