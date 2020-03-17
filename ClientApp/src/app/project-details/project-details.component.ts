import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectDetails } from '../Models/ProjectDetails';
import { Subject, Observable } from 'rxjs';
 

 
@Component({
    selector: 'project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.css']
})
/** project-details component*/
export class ProjectDetailsComponent {
  public projectDetails: ProjectDetails[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<ProjectDetails[]>(baseUrl + 'ProjectDetails/active').subscribe(result => {
      this.projectDetails = result;
    }, error => console.error(error));
  }

  private _listners = new Subject<any>();

  listen(): Observable<any> {
    return this._listners.asObservable();
  }

  filter(filterBy: string) {
    this._listners.next(filterBy);
  }
}

 


