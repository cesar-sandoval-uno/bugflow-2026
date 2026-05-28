import { Issue } from "./issue.interface";

export interface Project {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  issues?: Issue[];
  createdAt: string;
  updatedAt: string;
}

export type CreateProjectPayload = {
  name: string;
  description: string;
};
export type UpdateProjectPayload = Partial<CreateProjectPayload>;
