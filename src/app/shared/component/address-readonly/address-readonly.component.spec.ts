import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressReadonlyComponent } from './address-readonly.component';

describe('AddressReadonlyComponent', () => {
  let component: AddressReadonlyComponent;
  let fixture: ComponentFixture<AddressReadonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressReadonlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
