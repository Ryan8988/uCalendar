import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimbleMapsComponent } from './trimble-maps.component';

describe('TrimbleMapsComponent', () => {
  let component: TrimbleMapsComponent;
  let fixture: ComponentFixture<TrimbleMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrimbleMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrimbleMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
