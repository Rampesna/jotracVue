<template>
    <div
        class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold py-4 fs-6 w-275px"
        data-kt-menu="true">

        <div class="menu-item px-3">
            <div class="menu-content d-flex align-items-center px-3">

                <div class="symbol symbol-50px me-5">
                    <img alt="Logo" src="/media/avatars/300-1.jpg"/>
                </div>

                <div class="d-flex flex-column">
                    <div class="fw-bold d-flex align-items-center fs-5">
                        {{ store.user.name }}
                        <span class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">
                            Online
                        </span>
                    </div>
                    <a href="#" class="fw-semobold text-muted text-hover-primary fs-7">
                        {{ store.user.email }}
                    </a>
                </div>

            </div>
        </div>
        <div class="separator my-2"></div>
        <div class="menu-item px-5">
            <div class="menu-link px-5">
                Profilim
            </div>
        </div>
        <div class="menu-item px-5 my-1">
            <div class="menu-link px-5">
                Hesap Ayarları
            </div>
        </div>
        <div class="menu-item px-5">
            <a @click="signOut()" class="menu-link px-5">Çıkış Yap</a>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useAuthStore} from "@/stores/auth";
import {useRouter} from "vue-router";

export default defineComponent({
    name: "kt-user-menu",
    components: {},
    setup() {
        const router = useRouter();
        const store = useAuthStore();

        const signOut = () => {
            store.logout();
            router.push({name: "login"});
        };

        return {
            signOut,
            store,
        };
    },
});
</script>
