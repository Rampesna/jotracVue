<template>

    <div class="card mb-6 mb-xl-9">
        <div class="card-body pt-9 pb-0">
            <div class="d-flex flex-wrap flex-sm-nowrap mb-6">
                <div class="d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px me-7 mb-4">
                    <img class="mw-50px mw-lg-75px" :src="getBaseAssetsPath('public/media/svg/brand-logos/xing-icon.svg')" alt="image">
                </div>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start flex-wrap mb-2">
                        <div class="d-flex flex-column">
                            <div class="d-flex align-items-center mb-1">
                                <a href="#" class="text-gray-800 text-hover-primary fs-2 fw-bolder me-3" id="projectNameSpan">
                                    {{ project.name }}
                                </a>
                                <span class="badge me-auto" :class="`badge-light-${project.status.color}`" id="projectStatusBadge">
                                {{ project.status.name }}
                            </span>
                            </div>
                            <div class="d-flex flex-wrap fw-bold mb-4 fs-5 text-gray-400" id="projectDescription">
                                {{ project.description }}
                            </div>
                        </div>
                        <div class="d-flex mb-4">
                            <div class="me-0">
                                <button class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                    <i class="bi bi-three-dots fs-3"></i>
                                </button>
                                <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px py-3" data-kt-menu="true" style="">
                                    <div class="menu-item px-3">
                                        <div class="menu-content text-muted pb-2 px-3 fs-7 text-uppercase">İşlemler</div>
                                    </div>
                                    <div class="menu-item px-3">
                                        <a onclick="updateProject()" class="menu-link px-3 cursor-pointer">Projeyi Düzenle</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-wrap justify-content-start">
                        <div class="d-flex flex-wrap">
                            <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                <div class="d-flex align-items-center">
                                    <div class="fs-4 fw-bolder" id="projectStartDateSpan">
                                        {{ moment(project.start_date).format('DD.MM.YYYY') }}
                                    </div>
                                </div>
                                <div class="fw-bold fs-6 text-gray-400">Başlangıç Tarihi</div>
                            </div>
                            <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                <div class="d-flex align-items-center">
                                    <div class="fs-4 fw-bolder" id="projectEndDateSpan">
                                        {{ moment(project.end_date).format('DD.MM.YYYY') }}
                                    </div>
                                </div>
                                <div class="fw-bold fs-6 text-gray-400">Bitiş Tarihi</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="separator"></div>
            <ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder">
                <router-link :to="{name: 'projectOverview'}">
                    <li class="nav-item">
                        <span class="nav-link text-active-primary py-5 me-6" :class="`${segments(pathname)[2] === `overview` ? `active` : ``}`">Önizleme</span>
                    </li>
                </router-link>
                <router-link :to="{name: 'projectBoards', params: {encryptedId: this.encryptedId}}">
                    <li class="nav-item">
                        <span class="nav-link text-active-primary py-5 me-6" :class="`${segments(pathname)[2] === `boards` ? `active` : ``}`">Panolar</span>
                    </li>
                </router-link>
                <router-link :to="{name: 'projectNotes', params: {encryptedId: this.encryptedId}}">
                    <li class="nav-item">
                        <span class="nav-link text-active-primary py-5 me-6" :class="`${segments(pathname)[2] === `notes` ? `active` : ``}`">Notlar</span>
                    </li>
                </router-link>
                <router-link :to="{name: 'projectFiles', params: {encryptedId: this.encryptedId}}">
                    <li class="nav-item">
                        <span class="nav-link text-active-primary py-5 me-6" :class="`${segments(pathname)[2] === `files` ? `active` : ``}`">Dosyalar</span>
                    </li>
                </router-link>
                <router-link :to="{name: 'projectTickets', params: {encryptedId: this.encryptedId}}">
                    <li class="nav-item">
                        <span class="nav-link text-active-primary py-5 me-6" :class="`${segments(pathname)[2] === `tickets` ? `active` : ``}`">Destek Talepleri</span>
                    </li>
                </router-link>
            </ul>
        </div>
    </div>

</template>

<script>

import {getBaseAssetsPath} from "@/core/helpers/assets";
import {segments} from "@/core/helpers/segments";
import ProjectService from "@/services/ProjectService";
import {decrypt} from "@/core/helpers/crypto";
import {getToken} from "@/core/services/JwtService";
import md5 from "md5";
import moment from "moment";

export default {
    props: {
        encryptedId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            project: {
                name: '',
                description: '',
                start_date: '',
                end_date: '',
                status: {
                    name: '',
                    color: ''
                }
            }
        }
    },
    methods: {
        async getProjectById() {
            let response = await ProjectService.getById(decrypt(this.encryptedId, md5(getToken())));
            if (response.Success) {
                this.project = response.Data;
            } else {
                this.$router.push({name: 'projects'});
            }
        }
    },
    mounted() {
        this.getProjectById();
    },
    setup() {
        let pathname = window.location.pathname;

        return {
            pathname,
            segments,
            md5,
            moment,
            getToken,
            getBaseAssetsPath
        }
    }
}

</script>
