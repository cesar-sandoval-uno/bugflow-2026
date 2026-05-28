import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssuesPage } from './issues';

describe('IssuesPage', () => {
  let component: IssuesPage;
  let fixture: ComponentFixture<IssuesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(IssuesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
