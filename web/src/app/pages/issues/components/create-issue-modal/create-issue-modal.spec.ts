import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateIssueModal } from './create-issue-modal';

describe('CreateIssueModal', () => {
  let component: CreateIssueModal;
  let fixture: ComponentFixture<CreateIssueModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateIssueModal],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateIssueModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
