import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueDetailsModalComponent } from './issue-details-modal';

describe('IssueDetailsModalComponent', () => {
  let component: IssueDetailsModalComponent;
  let fixture: ComponentFixture<IssueDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueDetailsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueDetailsModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
