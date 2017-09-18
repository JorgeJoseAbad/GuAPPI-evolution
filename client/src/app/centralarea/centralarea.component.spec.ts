import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralareaComponent } from './centralarea.component';

describe('CentralareaComponent', () => {
  let component: CentralareaComponent;
  let fixture: ComponentFixture<CentralareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentralareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
