<template>

    <Heading :encrypted-id="this.encryptedId"></Heading>

    <div class="row">
        <div class="col-xl-12">
            <div class="row">
                <div class="col-xl-12">
                    <draggable v-if="boards.length > 0" :key="boards.length" group="allBoards">
                        <div v-for="(board, i) in boards" @dragend="onBoardDragEnd($event)" class="kanban-board" :id="board.id">
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
                                <draggable group="allTasks" :board-id="board.id" @dragstart="onTaskDragStart($event)" @dragend="onTaskDragEnd($event)">
                                    <div v-for="(task, j) in board.tasks" class="kanban-item border border-danger bg-light" :board-id="board.id" :id="task.id">
                                        <div class="row">
                                            <div class="col-xl-10">
                                                <i class="fa fa-check-circle text-success"></i>
                                                <span class="taskTitle cursor-pointer ms-2">{{ task.name }}</span>
                                            </div>
                                            <div class="col-xl-1 text-right">
                                                <i class="fas fa-sort-amount-down cursor-pointer sublistToggleIcon" :id="task.id"></i>
                                            </div>
                                        </div>
                                        <div class="taskSublist">

                                        </div>
                                    </div>
                                </draggable>
                                <div class="opacity-70 mt-8" data-class="opacity-60">
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
import {VueDraggableNext} from 'vue-draggable-next';
import toastr from "toastr";
import {io} from "socket.io-client";
import SocketIoService from "@/core/services/SocketIoService";

export default {
    props: {
        encryptedId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            taskDraggingOldBoardId: null,
            taskDraggingNewBoardId: null,
            SocketService: null,
            projectId: null,
            boards: [],
        }
    },
    created() {
        SocketIoService.connect();

        SocketIoService.listen('onBoardUpdate',  async (data) => {
            // @ts-ignore
            this.boards = await this.getAllBoards();
        });
    },
    setup() {
        let SocketService = io('http://localhost:3001');

        return {
            SocketService,
            getToken,
            md5
        }
    },
    async mounted() {
        // @ts-ignore
        this.boards = await this.getAllBoards();
    },
    methods: {
        async getAllBoards() {
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
                return boards;
            } else {
                console.log(boardsResponse);
            }
        },
        async addBoard() {
            let createBoardResponse = await BoardService.create(
                // @ts-ignore
                this.projectId
            );

            if (createBoardResponse.Success) {
                // @ts-ignore
                this.boards.push(createBoardResponse.Data);

                // @ts-ignore
                SocketIoService.emit('updateBoard');
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
                } else {
                    // @ts-ignore
                    SocketIoService.emit('updateBoard');
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
                    // // @ts-ignore
                    // this.boards.forEach((board, index) => {
                    //     if (board.id === boardId) {
                    //         // @ts-ignore
                    //         this.boards[index].tasks.push(createTaskResponse.Data);
                    //     }
                    // });
                    // event.target.value = '';

                    // @ts-ignore
                    SocketIoService.emit('updateBoard');
                } else {
                    console.log(createTaskResponse);
                }
            }
        },
        async onBoardDragEnd(event) {
            let allBoards = document.querySelectorAll('.kanban-board');
            let newBoardOrderList = [];
            allBoards.forEach((board, index) => {
                let boardId = board.getAttribute('id');
                if (boardId) {
                    newBoardOrderList.push({
                        // @ts-ignore
                        boardId: boardId,
                        // @ts-ignore
                        order: index
                    });
                }
            });

            // @ts-ignore
            let updateOrderResponse = await BoardService.updateOrder(newBoardOrderList);

            if (updateOrderResponse.Success) {
                console.log(updateOrderResponse);
                // @ts-ignore
                SocketIoService.emit('updateBoard');
            }
        },
        async onTaskDragStart(event) {
            // @ts-ignore
            this.taskDraggingOldBoardId = event.srcElement.parentNode.getAttribute('board-id');
        },
        async onTaskDragEnd(event) {
            event.stopPropagation();
            // @ts-ignore
            this.taskDraggingNewBoardId = event.srcElement.parentNode.getAttribute('board-id');

            let allBoards = document.querySelectorAll('.kanban-board');

            // @ts-ignore
            if (this.taskDraggingOldBoardId === this.taskDraggingNewBoardId) {
                // @ts-ignore
                let boardId = this.taskDraggingOldBoardId;
                let getBoard = null;
                allBoards.forEach(function (board, index) {
                    // @ts-ignore
                    if (board.getAttribute('id') === boardId) {
                        // @ts-ignore
                        getBoard = board;
                    }
                });

                // @ts-ignore
                let boardTasks = getBoard.querySelectorAll('.kanban-item');
                let newTaskOrderList = [];
                boardTasks.forEach((task, index) => {
                    let taskId = task.getAttribute('id');
                    if (taskId) {
                        newTaskOrderList.push({
                            // @ts-ignore
                            taskId: taskId,
                            // @ts-ignore
                            boardId: boardId,
                            // @ts-ignore
                            order: index
                        });
                    }
                });

                // @ts-ignore
                let updateOrderResponse = await TaskService.updateOrder(newTaskOrderList);

                // @ts-ignore
                this.taskDraggingOldBoardId = null;
                // @ts-ignore
                this.taskDraggingNewBoardId = null;

                if (updateOrderResponse.Success) {
                    // @ts-ignore
                    SocketIoService.emit('updateBoard');
                }
            } else {
                // @ts-ignore
                let oldBoardId = this.taskDraggingOldBoardId;
                // @ts-ignore
                let newBoardId = this.taskDraggingNewBoardId;

                let oldBoard = null;
                allBoards.forEach(function (board, index) {
                    // @ts-ignore
                    if (board.getAttribute('id') === oldBoardId) {
                        // @ts-ignore
                        oldBoard = board;
                    }
                });

                // @ts-ignore
                let oldBoardTasks = oldBoard.querySelectorAll('.kanban-item');
                let newTaskOrderListForOldBoard = [];
                oldBoardTasks.forEach((task, index) => {
                    let taskId = task.getAttribute('id');
                    if (taskId) {
                        newTaskOrderListForOldBoard.push({
                            // @ts-ignore
                            taskId: taskId,
                            // @ts-ignore
                            boardId: oldBoardId,
                            // @ts-ignore
                            order: index
                        });
                    }
                });

                // @ts-ignore
                let oldUpdateOrderResponse = await TaskService.updateOrder(newTaskOrderListForOldBoard);

                let newBoard = null;
                allBoards.forEach(function (board, index) {
                    // @ts-ignore
                    if (board.getAttribute('id') === newBoardId) {
                        // @ts-ignore
                        newBoard = board;
                    }
                });

                // @ts-ignore
                let newBoardTasks = newBoard.querySelectorAll('.kanban-item');
                let newTaskOrderListForNewBoard = [];
                newBoardTasks.forEach((task, index) => {
                    let taskId = task.getAttribute('id');
                    if (taskId) {
                        newTaskOrderListForNewBoard.push({
                            // @ts-ignore
                            taskId: taskId,
                            // @ts-ignore
                            boardId: newBoardId,
                            // @ts-ignore
                            order: index
                        });
                    }
                });

                // @ts-ignore
                let newUpdateOrderResponse = await TaskService.updateOrder(newTaskOrderListForNewBoard);

                // @ts-ignore
                this.taskDraggingOldBoardId = null;
                // @ts-ignore
                this.taskDraggingNewBoardId = null;

                if (
                    oldUpdateOrderResponse.Success &&
                    newUpdateOrderResponse.Success
                ) {
                    // @ts-ignore
                    SocketIoService.emit('updateBoard');
                }
            }
        },
    },
    components: {
        Heading,
        draggable: VueDraggableNext,
    },

}
</script>
