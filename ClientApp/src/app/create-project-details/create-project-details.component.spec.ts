/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { CreateProjectDetailsComponent } from './create-project-details.component';

let component: CreateProjectDetailsComponent;
let fixture: ComponentFixture<CreateProjectDetailsComponent>;

describe('create-project-details component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CreateProjectDetailsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(CreateProjectDetailsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});