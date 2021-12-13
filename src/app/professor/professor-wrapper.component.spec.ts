import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorWrapperComponent } from './professor-wrapper.component';

describe('AdminLayoutComponent', () => {
    let component: ProfessorWrapperComponent;
    let fixture: ComponentFixture<ProfessorWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfessorWrapperComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfessorWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
