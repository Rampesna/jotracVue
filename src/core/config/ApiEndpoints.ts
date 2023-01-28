class ApiEndpoints {
    static BASE_URL = 'http://localhost:3000/api';
    static VERSION = '';
    static BASE_ENDPOINT = ApiEndpoints.BASE_URL + ApiEndpoints.VERSION;
    static LOGIN = '/user/auth/login';
    static GET_PROFILE = '/user/getProfile';

    static GET_PROJECT_BY_USER = '/project/getByUser';
    static CREATE_PROJECT = '/project/create';
}

export default ApiEndpoints;
