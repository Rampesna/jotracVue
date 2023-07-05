<template>

    <CreateProjectModal ref="CreateProjectModalReference" @onProjectCreated="getProjects"></CreateProjectModal>

    <div class="row">
        <div class="col-xl-12 mb-5">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-xl-9 mb-5">
                            <div class="form-group">
                                <label for="keyword">Proje Adı</label>
                                <input id="keyword" type="text" class="form-control form-control-solid filterInput" placeholder="Proje Adı">
                            </div>
                        </div>
                        <div class="col-xl-3 mb-5">
                            <div class="form-group">
                                <label for="statusIds">Proje Durumu</label>
                                <select id="statusIds" class="form-select form-select-solid select2Input" data-control="select2" data-placeholder="Proje Durumu">

                                </select>
                            </div>
                        </div>
                        <div class="col-xl-6 mb-5">
                            <div class="row">
                                <div class="col-xl-6">
                                    <div class="form-group d-grid">
                                        <button class="btn btn-primary mt-6" id="FilterButton">Filtrele</button>
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <div class="form-group d-grid">
                                        <button class="btn btn-secondary mt-6" id="ClearFilterButton">Temizle</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="row">
                                <div class="col-xl-6"></div>
                                <div class="col-xl-6 text-end mt-5">
                                    <button
                                        class="btn btn-success"
                                        data-bs-toggle="modal"
                                        data-bs-target="#CreateProjectModal"
                                        @click="this.$refs.CreateProjectModalReference.onCreateProjectModalOpen()"
                                    >
                                        Yeni Proje Oluştur
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <hr class="text-muted">
    <div class="row">
        <div v-for="(project, i) in projects" class="col-sm-12 col-md-6 col-lg-4 col-xl-2 mb-5">
            <router-link :to="{name: 'projectOverview', params: {encryptedId: encrypt(project.id.toString(), md5(getToken()))}}">
                <div class="card border-hover-primary align-items-center">
                    <div class="card-header border-0 pt-9 d-flex">
                        <div class="card-title m-0">
                            <a class="symbol symbol-50px w-50px bg-light">
                                <img src="../../../../public/media/svg/brand-logos/xing-icon.svg" alt="image" class="p-3">
                            </a>
                        </div>
                    </div>
                    <div class="card-body p-9">
                        <a class="fs-3 fw-bolder text-dark">{{ project.name }}</a>
                    </div>
                </div>
            </router-link>
        </div>
    </div>

</template>

<script lang="ts">

import ProjectService from "@/services/ProjectService";
// @ts-ignore
import  { io } from "socket.io-client";
import CreateProjectModal from "@/views/modules/project/components/CreateProjectModal.vue";
import {encrypt} from "@/core/helpers/crypto";
import {getToken} from "@/core/services/JwtService";
import md5 from "md5";

export default {
    name: "Project",
    components: {
        CreateProjectModal
    },
    data() {
        return {
            projects: [],
            statuses: [],
            selectedStatuses: [],
            selectedKeyword: "",
            showModal: false,
        };
    },
    methods: {
        encrypt,
        async getProjects() {
            // @ts-ignore
            let projectsResponse = await ProjectService.getByUser();
            if (projectsResponse.Success) {
                // @ts-ignore
                this.projects = projectsResponse.Data;
            } else {
                // @ts-ignore
                toastr.error(projectsResponse.Message);
            }
        },
    },
    mounted() {
        // @ts-ignore
        this.getProjects();
    },
    setup() {
        return {
            getToken,
            md5
        }
    },
    // emits: [
    //     'getProjects'
    // ]
}
</script>
<style>

</style>
