import type ServiceResponse from "@/core/helpers/ServiceResponse";

interface IProjectService {
    getByUser(): ServiceResponse;
    create(): ServiceResponse;
}

export default IProjectService;
