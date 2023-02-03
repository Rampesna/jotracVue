import type ServiceResponse from "@/core/helpers/ServiceResponse";

interface ITaskService {
    create(
        boardId: number,
        name: string
    ): ServiceResponse;
}

export default ITaskService;
