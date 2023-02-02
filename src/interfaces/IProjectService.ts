import type ServiceResponse from "@/core/helpers/ServiceResponse";

interface IProjectService {
    getByUser(): ServiceResponse;
    getById(): ServiceResponse;
    create(): ServiceResponse;
}

export default IProjectService;
