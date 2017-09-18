import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KgartenComponent } from './kgarten.component';

describe('KgartenComponent', () => {
  let component: KgartenComponent;
  let fixture: ComponentFixture<KgartenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KgartenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KgartenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
