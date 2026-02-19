import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebAngularUi } from './web-angular-ui';

describe('WebAngularUi', () => {
  let component: WebAngularUi;
  let fixture: ComponentFixture<WebAngularUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebAngularUi],
    }).compileComponents();

    fixture = TestBed.createComponent(WebAngularUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
