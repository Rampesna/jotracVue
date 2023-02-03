import ServiceResponse from "@/core/helpers/ServiceResponse";
import ApiEndpoints from "@/core/config/ApiEndpoints";
import ApiService from "@/core/services/ApiService";
import type ITaskService from "@/interfaces/ITaskService";

class TaskService implements ITaskService {
    // @ts-ignore
    async create(
        boardId: number,
        name: string
    ): Promise<ServiceResponse> {
        ApiService.setHeader();
        let response = await ApiService.post(ApiEndpoints.CREATE_TASK, {
            boardId: boardId,
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
}

export default new TaskService;
