import { Project } from "./Project";

 


export class ProjectDetails {
  id: number;
  name: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
  startDate: string;
  completedDate: string;
  comment: string;
  projectId: number;
  project: Project;
  isCompleted: boolean;
}
