class ApiEndpoints {
    static BASE_URL = 'http://localhost:3000/api';
    static VERSION = '';
    static BASE_ENDPOINT = ApiEndpoints.BASE_URL + ApiEndpoints.VERSION;
    static LOGIN = '/user/auth/login';
    static GET_PROFILE = '/user/getProfile';

    static GET_PROJECT_BY_USER = '/project/getByUser';
    static GET_PROJECT_BY_ID = '/project/getById';
    static CREATE_PROJECT = '/project/create';

    static GET_BOARD_WITH_TASKS_BY_PROJECT_ID = '/board/getByProjectIdWithTasks';
    static CREATE_BOARD = '/board/create';
    static UPDATE_BOARD = '/board/update';
    static UPDATE_BOARD_ORDER = '/board/updateOrder';

    static CREATE_TASK = '/task/create';
    static UPDATE_TASK_ORDER = '/task/updateOrder';
}

export default ApiEndpoints;
