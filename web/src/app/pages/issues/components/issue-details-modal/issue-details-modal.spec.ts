import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueDetailsModal } from './issue-details-modal';

describe('IssueDetailsModal', () => {
  let component: IssueDetailsModal;
  let fixture: ComponentFixture<IssueDetailsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueDetailsModal],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueDetailsModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
