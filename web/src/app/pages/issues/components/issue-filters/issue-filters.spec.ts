import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueFilters } from './issue-filters';

describe('IssueFilters', () => {
  let component: IssueFilters;
  let fixture: ComponentFixture<IssueFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
