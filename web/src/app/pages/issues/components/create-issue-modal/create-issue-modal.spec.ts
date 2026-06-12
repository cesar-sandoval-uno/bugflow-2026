import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { CreateIssueModalComponent } from './create-issue-modal';
import { IssuesFacade, ProjectsFacade, UsersFacade } from '@bugflow-2026/data-access';
import { NotificationService } from '../../../../core/services/notification.service/notification.service';

describe('CreateIssueModalComponent', () => {
  let component: CreateIssueModalComponent;
  let fixture: ComponentFixture<CreateIssueModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateIssueModalComponent],
      providers: [
        {
          provide: IssuesFacade,
          useValue: {
            createIssue: jest.fn(),
            updateIssue: jest.fn(),
            refresh: jest.fn(),
          },
        },
        {
          provide: ProjectsFacade,
          useValue: {
            refresh: jest.fn(),
            projectsState: signal({
              data: [],
            }),
          },
        },
        {
          provide: UsersFacade,
          useValue: {
            me: signal(null),
            getAssignableUsers: jest.fn(() => of([])),
          },
        },
        {
          provide: NotificationService,
          useValue: {
            show: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateIssueModalComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
