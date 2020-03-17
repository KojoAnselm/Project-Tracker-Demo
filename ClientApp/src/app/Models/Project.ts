export class Project {
  id: number;
  name: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
  assignedTo: string;
  comment: string;
  isCompleted: boolean;
  hoursWorked: number;

}

export class AppUser {
  id: string;
  userName: string;
  email: string;
  hoursWorked: number;

}
