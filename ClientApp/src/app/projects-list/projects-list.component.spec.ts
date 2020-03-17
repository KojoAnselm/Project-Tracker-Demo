/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { ProjectsListComponent } from './projects-list.component';

let component: ProjectsListComponent;
let fixture: ComponentFixture<ProjectsListComponent>;

describe('projects-list component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProjectsListComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ProjectsListComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});