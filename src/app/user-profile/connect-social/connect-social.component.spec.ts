import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectSocialComponent } from './connect-social.component';

describe('ConnectSocialComponent', () => {
  let component: ConnectSocialComponent;
  let fixture: ComponentFixture<ConnectSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
