import type {User} from "@/stores/auth";

const _KEY = "_auth_user" as string;

export const getUser = (): any => {
    // @ts-ignore
    return JSON.parse(window.localStorage.getItem(_KEY));
};

export const saveUser = (user: User): void => {
    window.localStorage.setItem(_KEY, JSON.stringify(user));
};

export const destroyUser = (): void => {
    window.localStorage.removeItem(_KEY);
};

export default {
    getUser,
    saveUser,
    destroyUser
};
