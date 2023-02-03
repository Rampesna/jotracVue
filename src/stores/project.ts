import {ref} from "vue";
import {defineStore} from "pinia";
import type {Project} from "@/stores/interfaces/project";

export const projectStore = defineStore("projectStore", () => {

    const project = ref({} as Project);

    function setProject(project: Project) {
        // @ts-ignore
        project.value = project;
    }

    function getProject() {
        return project.value;
    }

    return {
        setProject,
        getProject
    }

});
