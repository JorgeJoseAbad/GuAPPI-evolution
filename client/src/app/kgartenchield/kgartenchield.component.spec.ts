import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KgartenchieldComponent } from './kgartenchield.component';

describe('KgartenchieldComponent', () => {
  let component: KgartenchieldComponent;
  let fixture: ComponentFixture<KgartenchieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KgartenchieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KgartenchieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
