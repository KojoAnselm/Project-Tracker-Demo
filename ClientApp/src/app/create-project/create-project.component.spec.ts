/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { CreateProjectComponent } from './create-project.component';

let component: CreateProjectComponent;
let fixture: ComponentFixture<CreateProjectComponent>;

describe('create-project component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CreateProjectComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(CreateProjectComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});