import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";
import {useAuthStore} from "@/stores/auth";
import {useConfigStore} from "@/stores/config";

const routes = [
    {
        path: "/",
        redirect: "/dashboard",
        component: () => import("@/layouts/main-layout/MainLayout.vue"),
        meta: {
            middleware: "auth",
        },
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                component: () => import("@/views/modules/dashboard/Dashboard.vue"),
                meta: {
                    pageTitle: "Anasayfa",
                    breadcrumbs: ["Kontrol Paneli"],
                },
            },
            {
                path: "/project",
                name: "project",
                component: () => import("@/views/modules/project/Project.vue"),
                meta: {
                    pageTitle: "Projeler",
                    // breadcrumbs: ["Projeler"],
                },
            },
            {
                path: "/project/:encryptedId/overview",
                name: "projectOverview",
                component: () => import("@/views/modules/project/modules/Overview.vue"),
                meta: {
                    pageTitle: "",
                    breadcrumbs: ["Projeler"],
                },
                props: true,
                children: [
                    // {
                    //     name:'projectOverview/Edit',
                    //     path: "projectOverview/Edit/:id", // :id mi bana lazım olan kısım sadece bu muydu la? Evet
                    //     meta :{
                    //         pageTitle: "Projeler Düzenleme / Sen düzeltirsin :D",
                    //     },
                    //     component: () => import("@/views/modules/project/modules/Overview.vue"),// componenti değiştirmen lazım
                    //     // o zaman bi sn hiç componenti değişmeye gerek yokda şöyle bi ufak düzenleme lazım deneyeyim hemen canlı canlı :D
                    // }
                ],
            },
            {
                path: "/project/:encryptedId/boards",
                name: "projectBoards",
                component: () => import("@/views/modules/project/modules/Boards.vue"),
                meta: {
                    pageTitle: "",
                    breadcrumbs: ["Projeler"],
                },
                props: true,
                children: [

                ],
            },
            {
                path: "/project/:encryptedId/notes",
                name: "projectNotes",
                component: () => import("@/views/modules/project/modules/Notes.vue"),
                meta: {
                    pageTitle: "",
                    breadcrumbs: ["Projeler"],
                },
                props: true,
                children: [

                ],
            },
            {
                path: "/project/:encryptedId/files",
                name: "projectFiles",
                component: () => import("@/views/modules/project/modules/Files.vue"),
                meta: {
                    pageTitle: "",
                    breadcrumbs: ["Projeler"],
                },
                props: true,
                children: [

                ],
            },
            {
                path: "/project/:encryptedId/tickets",
                name: "projectTickets",
                component: () => import("@/views/modules/project/modules/Tickets.vue"),
                meta: {
                    pageTitle: "",
                    breadcrumbs: ["Projeler"],
                },
                props: true,
                children: [

                ],
            }
        ],
    },

    {
        path: "/",
        component: () => import("@/layouts/AuthLayout.vue"),
        children: [
            {
                path: "/login",
                name: "login",
                component: () =>
                    import("@/views/auth/Login.vue"),
                meta: {
                    pageTitle: "Giriş Yap",
                    redirectIfLoggedIn: true,
                },
            },
            {
                path: "/sign-up",
                name: "sign-up",
                component: () =>
                    import("@/views/auth/SignUp.vue"),
                meta: {
                    pageTitle: "Sign Up",
                },
            },
            {
                path: "/password-reset",
                name: "password-reset",
                component: () =>
                    import("@/views/auth/PasswordReset.vue"),
                meta: {
                    pageTitle: "Password reset",
                },
            },
        ],
    },
    {
        path: "/",
        component: () => import("@/layouts/SystemLayout.vue"),
        children: [
            {
                // the 404 route, when none of the above matches
                path: "/404",
                name: "404",
                component: () => import("@/views/core/Error404.vue"),
                meta: {
                    pageTitle: "Error 404",
                },
            },
            {
                path: "/500",
                name: "500",
                component: () => import("@/views/core/Error500.vue"),
                meta: {
                    pageTitle: "Error 500",
                },
            },
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const configStore = useConfigStore();

    document.title = `${to.meta.pageTitle}`;

    configStore.resetLayoutConfig();

    if (to.meta.middleware == "auth") {
        if (authStore.isAuthenticated) {
            next();
        } else {
            next({name: "login"});
        }
    } else if (to.meta.redirectIfLoggedIn) {
        if (authStore.isAuthenticated) {
            next({name: "dashboard"});
        } else {
            next();
        }
    } else {
        next();
    }

    // Scroll page to top on every route change
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
});

export default router;
