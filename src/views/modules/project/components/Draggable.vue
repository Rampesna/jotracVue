<template>

    <div class="row">
        <div class="col-xl-12">
            <div class="kanban-container">
                <div data-id="62" data-order="1" class="kanban-board" style="width: 300px;">
                    <header class="kanban-board-header">
                        <div class="kanban-title-board">
                            <div class="row">
                                <div class="col-xl-1">
                                    <i class="far fa-circle fa-sm mt-5" @dragstart=""></i>
                                </div>
                                <div class="col-xl-9">
                                    <input data-id="62" class="form-control font-weight-bold moveTaskIcon updateBoardTitle" type="text" value="Masaüstü Geliştirme Talepleri" style="color:gray; font-size: 15px; border: none; background: transparent">
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
                        <div class="kanban-item border border-danger" data-eid="82">
                            <div class="row">
                                <div class="col-xl-10">
                                    <i class="fa fa-check-circle text-success"></i>
                                    <span data-id="82" class="taskTitle cursor-pointer ms-2">Luca için XML formatını destek tarafında biz oluşturabilir miyiz?</span>
                                </div>
                                <div class="col-xl-1 text-right">
                                    <i class="fas fa-sort-amount-down cursor-pointer sublistToggleIcon" data-id="82"></i>
                                </div>
                            </div>
                            <div id="sublist_82" class="taskSublist">
                                <hr>
                                <div class="row" id="task_sublist_control_82">
                                    abc
                                </div>
                            </div>
                        </div>
                        <div class="kanban-item opacity-60" data-eid="board_62_task_adder" data-draggable="false"
                             data-class="opacity-60">
                            <div class="row mt-n3 mb-n3 taskAdderSelector">
                                <div class="col-xl-12 pl-1 pr-0">
                                    <input data-board-id="62" type="text" class="form-control form-control-sm boardTaskAdder" placeholder="+ Görev Ekle" style="border: none">
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    </div>

</template>

<style>
.kanban-container {
    position: relative;
    box-sizing: border-box;
    width: auto
}

.kanban-container * {
    box-sizing: border-box
}

.kanban-container:after {
    clear: both;
    display: block;
    content: ""
}

.kanban-board {
    position: relative;
    float: left;
    background: #e2e4e6;
    transition: all .3s cubic-bezier(.23, 1, .32, 1)
}

.kanban-board.disabled-board {
    opacity: .3
}

.kanban-board.is-moving.gu-mirror {
    transform: rotate(3deg)
}

.kanban-board.is-moving.gu-mirror .kanban-drag {
    overflow: hidden;
    padding-right: 50px
}

.kanban-board header {
    font-size: 16px;
    padding: 15px
}

.kanban-board header .kanban-title-board {
    font-weight: 700;
    margin: 0;
    padding: 0;
    display: inline
}

.kanban-board header .kanban-title-button {
    float: right
}

.kanban-board .kanban-drag {
    min-height: 200px;
    padding: 20px
}

.kanban-board:after {
    clear: both;
    display: block;
    content: ""
}

.kanban-item {
    background: #fff;
    padding: 15px;
    margin-bottom: 20px;
    transition: all .3s cubic-bezier(.23, 1, .32, 1)
}

.kanban-item:hover {
    cursor: move
}

.kanban-item:last-child {
    margin: 0
}

.kanban-item.is-moving.gu-mirror {
    transform: rotate(3deg);
    height: auto !important
}

.gu-mirror {
    position: fixed !important;
    margin: 0 !important;
    z-index: 9999 !important
}

.gu-hide {
    display: none !important
}

.gu-unselectable {
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important
}

.gu-transit {
    opacity: .2 !important;
    transform: rotate(0) !important
}

.drag_handler {
    background: #fff;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    position: relative;
    float: left;
    top: -3px;
    margin-right: 4px
}

.drag_handler:hover {
    cursor: move
}

.drag_handler_icon {
    position: relative;
    display: block;
    background: #000;
    width: 24px;
    height: 2px;
    top: 12px;
    transition: .5s ease-in-out
}

.drag_handler_icon:after, .drag_handler_icon:before {
    background: #000;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    transition: .5s ease-in-out
}

.drag_handler_icon:before {
    top: 6px
}

.drag_handler_icon:after {
    bottom: 6px
}

.showTaskHeaderTitleBackground {
    background: rgb(255, 139, 0);
    background: linear-gradient(90deg, rgba(255, 139, 0, 1) 0%, rgba(181, 77, 0, 1) 100%);
}

.kanban-board-header {
    margin-bottom: -20px;
}

.kanban-container .kanban-board {
    float: none;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    margin-bottom: 1.25rem;
    margin-right: 1.25rem !important;
    background-color: transparent;
    border-radius: 0.42rem;
}

.kanban-container .kanban-board .kanban-drag .kanban-item {
    border-radius: 1rem;
    -webkit-box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.05);
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.05);
}

.offcanvas.offcanvas-right {
    right: -900px;
    left: auto;
}

.opacity-60 {
    opacity: 60%;
}

.kanban-container {
    flex-wrap: inherit;
}
</style>

<script>

export default {

    //

}

</script>
