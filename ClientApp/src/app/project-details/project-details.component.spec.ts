/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { ProjectDetailsComponent } from './project-details.component';

let component: ProjectDetailsComponent;
let fixture: ComponentFixture<ProjectDetailsComponent>;

describe('project-details component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProjectDetailsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ProjectDetailsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});