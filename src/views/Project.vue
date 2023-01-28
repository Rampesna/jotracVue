<template>

    <CreateProjectModal ref="CreateProjectModalReference"></CreateProjectModal>

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
            <router-link :to="{name: 'projectOverview'}">
                <div class="card border-hover-primary align-items-center">
                    <div class="card-header border-0 pt-9 d-flex">
                        <div class="card-title m-0">
                            <a class="symbol symbol-50px w-50px bg-light">
                                <img src="public/media/svg/brand-logos/xing-icon.svg" alt="image" class="p-3">
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
import CreateProjectModal from "@/views/components/CreateProjectModal.vue";
export default {
    name: "Project",
    components: {
        CreateProjectModal
    },
    data() {
        return {
            projects: [
                {
                    id: 1,
                    name: 'Test 1',
                    progress: 75,
                    waitingTicketsCount: 7,
                }
            ],
            statuses: [],
            selectedStatuses: [],
            selectedKeyword: "",
            showModal: false,
        };
    },
    methods: {
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
        const socket = io('http://127.0.0.1:3001');
        socket.emit('updateProject', 'test');
        socket.emit('updateBoard', 'test');
        socket.emit('updateTask', 'test');
        socket.emit('updateSubTask', 'test');

        socket.on('onProjectUpdate', (data) => {
            console.log(data);
        });

        socket.on('onBoardUpdate', (data) => {
            console.log(data);
        });

        socket.on('onTaskUpdate', (data) => {
            console.log(data);
        });

        socket.on('onSubTaskUpdate', (data) => {
            console.log(data);
        });
    },
    // emits: [
    //     'getProjects'
    // ]
}
</script>
<style>

</style>
