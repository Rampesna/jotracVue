<template>

    <div
        class="modal fade"
        id="CreateProjectModal"
        ref="CreateProjectModalRef"
        tabindex="-1"
        aria-modal="true"
        role="dialog"
        data-bs-backdrop="static"
    >
        <div class="modal-dialog modal-dialog-centered mw-800px">
            <div class="modal-content rounded">
                <div class="modal-header pb-0 border-0 justify-content-end">
                    <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                    <span class="svg-icon svg-icon-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black"></rect>
                            <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black"></rect>
                        </svg>
                    </span>
                    </div>
                </div>
                <div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
                    <div class="form fv-plugins-bootstrap5 fv-plugins-framework">
                        <div class="mb-13 text-center">
                            <h1 class="mb-3">Proje Oluştur</h1>
                        </div>
                        <div class="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                            <div class="row mb-5">
                                <div class="col-xl-12">
                                    <div class="form-group">
                                        <label class="ms-2 mb-1 font-weight-bolder">Proje Adı</label>
                                        <input v-model="createProjectName" type="text" class="form-control form-control-solid" placeholder="Proje Adı">
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-5">
                                <div class="col-xl-6">
                                    <div class="form-group">
                                        <label class="ms-2 mb-1 font-weight-bolder">Başlangıç Tarihi</label>
                                        <input v-model="createProjectStartDate" type="datetime-local" class="form-control form-control-solid">
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <div class="form-group">
                                        <label class="ms-2 mb-1 font-weight-bolder">Bitiş Tarihi</label>
                                        <input v-model="createProjectEndDate" type="datetime-local" class="form-control form-control-solid">
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-5">
                                <div class="col-xl-12">
                                    <div class="form-group">
                                        <label class="ms-2 mb-1 font-weight-bolder">Açıklamalar</label>
                                        <textarea v-model="createProjectDescription" class="form-control form-control-solid" rows="4"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <button type="button" data-bs-dismiss="modal" id="CancelCreateProjectButton" class="btn btn-light me-3">Vazgeç</button>
                            <button type="button" class="btn btn-success" id="CreateProjectButton" @click="createProject()">Oluştur</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style>


</style>

<script>
import $ from "jquery";
import toastr from "toastr";
import ProjectService from "@/services/ProjectService";
export default {
    name: "CreateProjectModal",
    emits: [
        'onProjectCreated'
    ],
    components: {

    },
    data() {
        return {
            createProjectName: "",
            createProjectStartDate: "",
            createProjectEndDate: "",
            createProjectDescription: "",
        }
    },
    methods: {
        onCreateProjectModalOpen() {
            this.createProjectName = "";
            this.createProjectStartDate = "";
            this.createProjectEndDate = "";
            this.createProjectDescription = "";
        },
        async createProject() {
            let CreateProjectButton = $('#CreateProjectButton');
            let CancelCreateProjectButton = $('#CancelCreateProjectButton');
            if (!this.createProjectName) {
                toastr.warning('Proje adı boş bırakılamaz.');
            } else {
                CreateProjectButton.attr('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Oluşturuluyor...');
                let createProjectResponse = await ProjectService.create(
                    this.createProjectName,
                    this.createProjectStartDate,
                    this.createProjectEndDate,
                    this.createProjectDescription
                );
                CreateProjectButton.attr('disabled', false).html('Oluştur');
                if (createProjectResponse.Success) {
                    toastr.success(createProjectResponse.Message);
                    CancelCreateProjectButton.click();
                    this.$emit('onProjectCreated');
                } else {
                    toastr.error(createProjectResponse.Message);
                }
            }
        }
    },
    setup() {

    },
}

</script>
