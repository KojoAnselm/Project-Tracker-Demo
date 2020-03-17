import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateProjectDetailsComponent } from './create-project-details/create-project-details.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';

 

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CreateProjectDetailsComponent,
    ProjectsListComponent,
    ProjectDetailsComponent,
    CreateProjectComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'create-project-details', component: CreateProjectDetailsComponent, canActivate: [AuthorizeGuard]},
      { path: 'project-details', component: ProjectDetailsComponent, canActivate: [AuthorizeGuard] },
      { path: 'projects-list', component: ProjectsListComponent, canActivate: [AuthorizeGuard] },
      { path: 'create-project', component: CreateProjectComponent, canActivate: [AuthorizeGuard] },
    ]),
    BrowserAnimationsModule,
    GridModule,
 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
