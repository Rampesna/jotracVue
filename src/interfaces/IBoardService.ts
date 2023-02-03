import type ServiceResponse from "@/core/helpers/ServiceResponse";

interface IBoardService {
    getByProjectIdWithTasks(
        projectId: number
    ): ServiceResponse;

    create(
        projectId: number
    ): ServiceResponse;
}

export default IBoardService;
