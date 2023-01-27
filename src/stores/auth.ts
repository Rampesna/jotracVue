import {ref} from "vue";
import {defineStore} from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import AuthService from "@/services/AuthService";
// @ts-ignore
import ServiceResponse from "@/core/helpers/ServiceResponse";
import UserService from "@/core/services/UserService";

export interface User {
    name: string;
    surname?: string;
    email: string;
    password: string;
    api_token?: string;
}

export const useAuthStore = defineStore("auth", () => {
    const errors = ref({});
    const user = ref(UserService.getUser());
    const isAuthenticated = ref(!!JwtService.getToken());

    function setAuth(authUser: User) {
        isAuthenticated.value = true;
        user.value = authUser;
        errors.value = {};
        UserService.saveUser(authUser);
    }

    function setError(error: any) {
        errors.value = {...error};
    }

    function purgeAuth() {
        isAuthenticated.value = false;
        user.value = {} as User;
        errors.value = [];
        JwtService.destroyToken();
    }

    // @ts-ignore
    async function login(credentials: User): ServiceResponse {
        let loginResponse = await AuthService.login(credentials.email, credentials.password);
        if (loginResponse.Success) {
            JwtService.saveToken(loginResponse.Data.token);
            let getProfileResponse = await AuthService.getProfile();
            if (getProfileResponse.Success) {
                console.log(getProfileResponse.Data);
                setAuth({
                    name: getProfileResponse.Data.name,
                    email: getProfileResponse.Data.email,
                    password: getProfileResponse.Data.password,
                });
                return new ServiceResponse(
                    true,
                    "Login successful",
                    {},
                    200
                );
            } else {
                return getProfileResponse;
            }
        } else {
            return loginResponse;
        }
    }

    function logout() {
        purgeAuth();
    }

    function register(credentials: User) {

    }

    function forgotPassword(email: string) {

    }


    return {
        errors,
        user,
        isAuthenticated,
        login,
        logout,
        register,
        forgotPassword,
    };
});
