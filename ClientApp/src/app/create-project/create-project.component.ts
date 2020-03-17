import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms'
import { FormsModule } from '@angular/forms'
import { Project } from '../Models/Project';
import { AppUser } from '../Models/Project';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject, Observable } from 'rxjs';


@Component({
    selector: 'create-project',
    templateUrl: './create-project.component.html',
    styleUrls: ['./create-project.component.css']
})
/** create-project component*/
export class CreateProjectComponent {
  public users: AppUser[];

  FormHeader = "Add"
  public _baseUrl: string;
  public _httpclient: HttpClient;
  project = new Project;
  public projects: Project[];




  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public _router: Router, public _location: Location) {
    this.GetInitData(http, baseUrl);


    this._baseUrl = baseUrl;
    this._httpclient = http;
   

  }


  public GetInitData(http: HttpClient, baseUrl: string) {
        http.get<AppUser[]>(baseUrl + 'Project/users').subscribe(result => {
            this.users = result;
        }, error => console.error(error));
        http.get<Project[]>(baseUrl + 'Project').subscribe(result => {
            this.projects = result;
        }, error => console.error(error));
    }

  save() {

    switch (this.FormHeader) {
      case "Add":
        //const headers = new HttpHeaders().set('content-type', 'application/json');
        var data = { Name: this.project.name, Comment: this.project.comment, IsCompleted: this.project.isCompleted, AssignedTo: this.project.assignedTo }
        var Getresult = this._httpclient.post<Project>(this._baseUrl + 'Project/create', data).subscribe(result => {
          this.project = result;
          
        }, error => console.error(error));
        this.reset();
        this.GetInitData(this._httpclient, this._baseUrl);
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
    this.project = new Project;
    this.FormHeader = "Add";
     
      window.location.reload();
    
  }


 

  selectProjectChangeHandler(event: any) {
    //update the ui
    this.project.assignedTo = event.target.value;
  }


  private _listners = new Subject<any>();

  listen(): Observable<any> {
    return this._listners.asObservable();
  }

  filter(filterBy: string) {
    this._listners.next(filterBy);
  }

}
