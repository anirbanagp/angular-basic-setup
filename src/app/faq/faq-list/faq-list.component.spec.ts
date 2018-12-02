import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FaqDetailsComponent } from "./faq-list.component";

describe("FaqDetailsComponent", () => {
  let component: FaqDetailsComponent;
  let fixture: ComponentFixture<FaqDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaqDetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
