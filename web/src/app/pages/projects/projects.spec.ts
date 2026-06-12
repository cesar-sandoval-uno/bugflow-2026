import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ProjectsPage } from './projects';
import {
  ProjectsFacade,
  UsersFacade,
} from '@bugflow-2026/data-access';

describe('ProjectsPage', () => {
  let component: ProjectsPage;
  let fixture: ComponentFixture<ProjectsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsPage],
      providers: [
        {
          provide: ProjectsFacade,
          useValue: {
            projectsState: signal({
              data: [],
              loading: false,
              error: null,
            }),
            refresh: jest.fn(),
          },
        },
        {
          provide: UsersFacade,
          useValue: {
            me: signal(null),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsPage);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
