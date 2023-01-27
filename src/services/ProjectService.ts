import ServiceResponse from "@/core/helpers/ServiceResponse";
import type IProjectService from "@/interfaces/IProjectService";
import ApiEndpoints from "@/core/config/ApiEndpoints";
import ApiService from "@/core/services/ApiService";

class ProjectService implements IProjectService {
    // @ts-ignore
    async getByUser(): ServiceResponse {
        ApiService.setHeader();
        let response = await ApiService.get(ApiEndpoints.GET_PROJECT_BY_USER);

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

export default new ProjectService;
