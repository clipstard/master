import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentWrapperComponent } from './student-wrapper.component';

describe('AdminLayoutComponent', () => {
    let component: StudentWrapperComponent;
    let fixture: ComponentFixture<StudentWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StudentWrapperComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StudentWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
