<template>

    <Heading :encrypted-id="this.encryptedId"></Heading>

    <div class="row">
        <div class="col-xl-12">
            <div class="row">
                <div class="col-xl-12">
                    <draggable group="allBoards">
                        <div v-for="(board, i) in boards" @dragend="onBoardDragEnd" class="kanban-board" :key="board.id">
                            <header class="kanban-board-header">
                                <div class="kanban-title-board">
                                    <div class="row">
                                        <div class="col-xl-1">
                                            <i class="far fa-circle fa-sm mt-5"></i>
                                        </div>
                                        <div class="col-xl-9">
                                            <input data-id="62" class="form-control font-weight-bold moveTaskIcon updateBoardTitle" type="text" @keypress.enter="updateBoard(board.id, $event)" @focusout="updateBoard(board.id, $event)" :value="board.name" style="color:gray; font-size: 15px; border: none; background: transparent">
                                        </div>
                                        <div class="col-xl-1 mt-2 align-items-end">
                                            <div class="dropdown">
                                                <i class="fa fa-level-down cursor-pointer" id="62_Dropdown" data-bs-toggle="dropdown" aria-expanded="false"></i>
                                                <div class="dropdown-menu" aria-labelledby="62_Dropdown" style="width: 175px;">
                                                    <a class="dropdown-item cursor-pointer py-3 ps-6" onclick="deleteBoard(62)" title="Panoyu Sil">
                                                        <i class="fas fa-trash-alt me-3 text-danger"></i>
                                                        <span class="text-dark">Panoyu Sil</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <main class="kanban-drag">
                                <draggable group="allTasks">
                                    <div v-for="(task, j) in board.tasks" class="kanban-item border border-danger bg-light" data-eid="82">
                                        <div class="row">
                                            <div class="col-xl-10">
                                                <i class="fa fa-check-circle text-success"></i>
                                                <span data-id="82" class="taskTitle cursor-pointer ms-2">{{ task.name }}</span>
                                            </div>
                                            <div class="col-xl-1 text-right">
                                                <i class="fas fa-sort-amount-down cursor-pointer sublistToggleIcon" data-id="82"></i>
                                            </div>
                                        </div>
                                        <div id="sublist_82" class="taskSublist">

                                        </div>
                                    </div>
                                </draggable>
                                <div class="opacity-70 mt-8" data-eid="board_62_task_adder"
                                     data-class="opacity-60">
                                    <div class="row mt-n3 mb-n3 taskAdderSelector">
                                        <div class="col-xl-12 pl-1 pr-0">
                                            <input @keypress.enter="addTask(board.id, $event)" type="text" class="form-control form-control border-0" placeholder="+ Görev Ekle">
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </draggable>
                    <div class="kanban-board">
                        <header class="kanban-board-header">
                            <div class="kanban-title-board">
                                <div class="row">
                                    <div @click="addBoard" id="CreateBoardButton" class="col-xl-12 bg-light-dark bg-hover-secondary text-center cursor-pointer" style="border-radius: 2rem">
                                        <span class="form-control mt-1 font-weight-bold text-dark-75" type="text" style="font-size: 12px; border: none; background: transparent">
                                            <i class="fa fa-plus fa-sm mr-2"></i>
                                            <span class="ms-2">Yeni Pano</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style>
@import "@/assets/kanban/custom.css";
</style>

<script lang="ts">
import Heading from "@/views/modules/project/components/Heading.vue";
import md5 from "md5";
import {decrypt} from "@/core/helpers/crypto";
import {getToken} from "@/core/services/JwtService";
import BoardService from "@/services/BoardService";
import TaskService from "@/services/TaskService";
import { VueDraggableNext } from 'vue-draggable-next';
import toastr from "toastr";

export default {
    props: {
        encryptedId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            projectId: null,
            boards: [],
        }
    },
    async mounted() {
        // @ts-ignore
        this.projectId = decrypt(this.encryptedId, md5(getToken()));
        // @ts-ignore
        let boardsResponse = await BoardService.getByProjectIdWithTasks(this.projectId);

        if (boardsResponse.Success) {
            let boards = boardsResponse.Data;
            boards.forEach((board, index) => {
                boards[index].tasks = board.tasks.sort((a, b) => a.order - b.order);
            });
            // @ts-ignore
            this.boards = boards;
        } else {
            console.log(boardsResponse);
        }
    },
    methods: {
        async addBoard() {
            let createBoardResponse = await BoardService.create(
                // @ts-ignore
                this.projectId
            );

            if (createBoardResponse.Success) {
                // @ts-ignore
                this.boards.push(createBoardResponse.Data);
            } else {
                console.log(createBoardResponse);
            }
        },
        async updateBoard(boardId, event) {
            if (!event.target.value) {
                toastr.warning('Pano adı boş olamaz!');
            } else {
                let updateBoardResponse = await BoardService.update(
                    boardId,
                    event.target.value
                );

                if (!updateBoardResponse.Success) {
                    console.log(updateBoardResponse);
                }
            }
        },
        async addTask(boardId, event) {
            if (!event.target.value) {
                toastr.warning('Görev adı boş olamaz!');
            } else {
                let createTaskResponse = await TaskService.create(
                    boardId,
                    event.target.value
                );

                if (createTaskResponse.Success) {
                    // @ts-ignore
                    this.boards.forEach((board, index) => {
                        if (board.id === boardId) {
                            // @ts-ignore
                            this.boards[index].tasks.push(createTaskResponse.Data);
                        }
                    });
                    event.target.value = '';
                } else {
                    console.log(createTaskResponse);
                }
            }
        },
        onBoardDragEnd() {
            let getAllBoards = document.querySelectorAll('.kanban-board');
            getAllBoards.forEach((board, index) => {
                let boardKey = board.getAttribute('data-id');
                console.log(boardKey);
            });
        }
    },
    components: {
        Heading,
        draggable: VueDraggableNext,
    },
    setup() {
        return {
            getToken,
            md5
        }
    }
}
</script>
