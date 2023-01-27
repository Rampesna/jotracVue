import type ServiceResponse from "@/core/helpers/ServiceResponse";

interface IProjectService {
    getByUser(): ServiceResponse;
}

export default IProjectService;
