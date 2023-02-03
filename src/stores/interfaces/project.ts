import type {User} from "@/stores/interfaces/user";
import type {ProjectStatus} from "@/stores/interfaces/projectStatus";

export interface Project {
    id: number;

    name: string;

    description: string;

    status: ProjectStatus;

    users: User[];

    start_date: Date;

    end_date: Date;
}
