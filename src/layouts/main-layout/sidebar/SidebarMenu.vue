<template>
    <div class="app-sidebar-menu overflow-hidden flex-column-fluid">
        <div id="kt_app_sidebar_menu_wrapper"
             class="app-sidebar-wrapper hover-scroll-overlay-y my-5"
             data-kt-scroll="true"
             data-kt-scroll-activate="true"
             data-kt-scroll-height="auto"
             data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
             data-kt-scroll-wrappers="#kt_app_sidebar_menu"
             data-kt-scroll-offset="5px"
             data-kt-scroll-save-state="true">
            <div id="#kt_app_sidebar_menu" class="menu menu-column menu-rounded menu-sub-indention px-3" data-kt-menu="true">
                <template v-for="(mainMenu, i) in MainMenuConfig" :key="i">
                    <div v-if="mainMenu.heading" class="menu-item pt-5">
                        <div class="menu-content">
                            <span class="menu-heading fw-bold text-uppercase fs-7">{{ mainMenu.heading }}</span>
                        </div>
                    </div>
                    <template v-for="(menuItem, j) in mainMenu.pages" :key="j">
                        <template v-if="menuItem.heading">
                            <div class="menu-item">
                                <router-link v-if="menuItem.route" :to="{name: menuItem.route}">
                                    <a class="menu-link" :class="`${isActive(menuItem.module)}`">
                                        <span class="svg-icon svg-icon-2">
                                            <inline-svg :src="menuItem.svgIcon" />
                                        </span>
                                        <span class="menu-title">{{ menuItem.heading }}</span>
                                    </a>
                                </router-link>
                            </div>
                        </template>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import MainMenuConfig from "@/core/config/MainMenuConfig";
import {sidebarMenuIcons} from "@/core/helpers/config";
import {segments} from "@/core/helpers/segments";

export default defineComponent({
    name: "sidebar-menu",
    components: {},
    methods: {
        isActive: (module: string) => {
            if (segments(window.location.pathname)[0] === module) {
                return `active`;
            }
        },
    },
    setup() {
        const pathName = window.location.pathname;
        const route = useRoute();
        const scrollElRef = ref<null | HTMLElement>(null);

        onMounted(() => {
            if (scrollElRef.value) {
                scrollElRef.value.scrollTop = 0;
            }
        });


        const hasActiveChildren = (match: string) => {
            return route.path.indexOf(match) !== -1;
        };

        return {
            hasActiveChildren,
            MainMenuConfig,
            sidebarMenuIcons,
            segments,
            pathName
        };
    },
});
</script>
