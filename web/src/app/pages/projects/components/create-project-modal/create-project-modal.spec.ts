import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProjectModalComponent } from './create-project-modal';
import { ProjectsFacade } from '@bugflow-2026/data-access';
import { NotificationService } from '../../../../core/services/notification.service/notification.service';

describe('CreateProjectModalComponent', () => {
  let component: CreateProjectModalComponent;
  let fixture: ComponentFixture<CreateProjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProjectModalComponent],
      providers: [
        {
          provide: ProjectsFacade,
          useValue: {
            createProject: jest.fn(),
            updateProject: jest.fn(),
            refresh: jest.fn(),
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

    fixture = TestBed.createComponent(
      CreateProjectModalComponent
    );

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
