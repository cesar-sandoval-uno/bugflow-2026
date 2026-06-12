import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicPage } from './public';
import { AuthService } from '@auth0/auth0-angular';

describe('PublicPage', () => {
  let component: PublicPage;
  let fixture: ComponentFixture<PublicPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicPage],
      providers: [
        {
          provide: AuthService,
          useValue: {
            loginWithRedirect: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicPage);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
