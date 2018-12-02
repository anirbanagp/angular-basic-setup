import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqDetailsViewComponent } from './faq-details-view.component';

describe('FaqDetailsViewComponent', () => {
  let component: FaqDetailsViewComponent;
  let fixture: ComponentFixture<FaqDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
