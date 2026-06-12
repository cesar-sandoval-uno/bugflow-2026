import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'data-access/src/lib/api-config.token';
import { UsersPage } from './users';

describe('UsersPage', () => {
  let component: UsersPage;
  let fixture: ComponentFixture<UsersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPage],
      providers: [
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: API_CONFIG,
          useValue: {
            baseUrl: 'http://localhost:3000/api',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersPage);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
