<template>
    <div class="app-navbar flex-shrink-0">
        <div class="app-navbar-item ms-1 ms-lg-3">
            <a href="#"
               class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
               data-kt-menu-trigger="{default:'click', lg: 'hover'}"
               data-kt-menu-attach="parent"
               data-kt-menu-placement="bottom-end">
                <span v-if="themeMode === 'light'" class="svg-icon theme-dark-hide svg-icon-2">
                  <inline-svg src="/media/icons/duotune/general/gen060.svg"/>
                </span>
                <span v-else class="svg-icon theme-light-hide svg-icon-2">
                  <inline-svg src="/media/icons/duotune/general/gen061.svg"/>
                </span>
            </a>
            <KTThemeModeSwitcher/>
        </div>
        <div class="app-navbar-item ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
            <div class="cursor-pointer symbol symbol-35px symbol-md-40px"
                 data-kt-menu-trigger="click"
                 data-kt-menu-attach="parent"
                 data-kt-menu-placement="bottom-end">
                <img src="/media/avatars/300-1.jpg" alt="user"/>
            </div>
            <KTUserMenu/>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, computed} from "vue";
import KTUserMenu from "@/layouts/main-layout/menus/UserAccountMenu.vue";
import KTThemeModeSwitcher from "@/layouts/main-layout/theme-mode/ThemeModeSwitcher.vue";
import {useThemeStore} from "@/stores/theme";

export default defineComponent({
    name: "header-navbar",
    components: {
        KTUserMenu,
        KTThemeModeSwitcher,
    },
    setup() {
        const store = useThemeStore();

        const themeMode = computed(() => {
            return store.mode;
        });

        return {
            themeMode,
        };
    },
});
</script>
