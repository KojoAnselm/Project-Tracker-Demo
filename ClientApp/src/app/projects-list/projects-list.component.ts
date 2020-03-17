import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../Models/Project';

@Component({
    selector: 'projects-list',
    templateUrl: './projects-list.component.html',
    styleUrls: ['./projects-list.component.css']
})
/** projects-list component*/
export class ProjectsListComponent {
  public projects: Project[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Project[]>(baseUrl + 'Project').subscribe(result => {
      this.projects = result;
    }, error => console.error(error));
  }
}
