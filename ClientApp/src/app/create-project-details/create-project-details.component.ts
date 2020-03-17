import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as $ from 'jquery' 




import { Project } from '../Models/Project';
import { ProjectDetails } from '../Models/ProjectDetails';

@Component({
    selector: 'create-project-details',
    templateUrl: './create-project-details.component.html',
    styleUrls: ['./create-project-details.component.css']
})
/** create-project-details component*/
export class CreateProjectDetailsComponent {
  public projects: Project[];

  FormHeader = "Add"


  public _baseUrl: string;
  public _httpclient: HttpClient;

  projectDetail = new ProjectDetails;




  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public _router: Router, public _location: Location) {
    http.get<Project[]>(baseUrl + 'Project/active').subscribe(result => {
      this.projects = result;
    }, error => console.error(error));
    this._baseUrl = baseUrl;
    this._httpclient = http;

     
  }

  GetAllProjectDetails() {
    
  }


  save() {

    switch (this.FormHeader) {
      case "Add":
        //const headers = new HttpHeaders().set('content-type', 'application/json');
        var data = { StartDate: this.projectDetail.startDate, CompletedDate: this.projectDetail.completedDate, Comment: this.projectDetail.comment, ProjectId: this.projectDetail.projectId ,IsCompleted: this.projectDetail.isCompleted}
        var Getresult = this._httpclient.post<ProjectDetails>(this._baseUrl + 'ProjectDetails/create', data).subscribe(result => {
          this.projectDetail = result;
        }, error => console.error(error));
        this.reset();
        this.GetAllProjectDetails();
        break;
      case "Edit":

        break;
      case "Delete":

        break;
      default:
        break;

    }
  }

  reset(): void {
    this.projectDetail = new ProjectDetails;
    this.FormHeader = "Add";
    window.location.reload();
  }

 

  selectProjectChangeHandler(event: any) {
    //update the ui
    this.projectDetail.projectId = event.target.value;
  }


}
