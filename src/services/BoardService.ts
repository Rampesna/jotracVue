import ServiceResponse from "@/core/helpers/ServiceResponse";
import ApiEndpoints from "@/core/config/ApiEndpoints";
import ApiService from "@/core/services/ApiService";
import type IBoardService from "@/interfaces/IBoardService";

class BoardService implements IBoardService {
    // @ts-ignore
    async getByProjectIdWithTasks(projectId): ServiceResponse {
        ApiService.setHeader();
        let response = await ApiService.getWithBody(ApiEndpoints.GET_BOARD_WITH_TASKS_BY_PROJECT_ID, {
            projectId: projectId
        });

        return new ServiceResponse(
            // @ts-ignore
            response.coreResponse.success,
            // @ts-ignore
            response.coreResponse.message,
            // @ts-ignore
            response.coreResponse.data,
            // @ts-ignore
            response.coreResponse.status
        );
    }

    // @ts-ignore
    async create(
        projectId: number
    ): Promise<ServiceResponse> {
        ApiService.setHeader();
        let response = await ApiService.post(ApiEndpoints.CREATE_BOARD, {
            projectId: projectId
        });

        return new ServiceResponse(
            // @ts-ignore
            response.coreResponse.success,
            // @ts-ignore
            response.coreResponse.message,
            // @ts-ignore
            response.coreResponse.data,
            // @ts-ignore
            response.coreResponse.status
        );
    }

    // @ts-ignore
    async update(
        boardId: number,
        name: string
    ): Promise<ServiceResponse> {
        ApiService.setHeader();
        let response = await ApiService.put(ApiEndpoints.UPDATE_BOARD, {
            id: boardId,
            name: name
        });

        return new ServiceResponse(
            // @ts-ignore
            response.coreResponse.success,
            // @ts-ignore
            response.coreResponse.message,
            // @ts-ignore
            response.coreResponse.data,
            // @ts-ignore
            response.coreResponse.status
        );
    }

    // @ts-ignore
    async updateOrder(
        boards: []
    ): Promise<ServiceResponse> {
        ApiService.setHeader();
        let response = await ApiService.put(ApiEndpoints.UPDATE_BOARD_ORDER, {
            boards: boards
        });

        return new ServiceResponse(
            // @ts-ignore
            response.coreResponse.success,
            // @ts-ignore
            response.coreResponse.message,
            // @ts-ignore
            response.coreResponse.data,
            // @ts-ignore
            response.coreResponse.status
        );
    }
}

export default new BoardService;
