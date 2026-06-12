import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { of } from 'rxjs';

import { CommentsComponent } from './comments';
import {
  UsersFacade,
  CommentsFacade,
} from '@bugflow-2026/data-access';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsComponent],
      providers: [
        {
          provide: UsersFacade,
          useValue: {
            me: signal(null),
          },
        },
        {
          provide: CommentsFacade,
          useValue: {
            commentsState: signal({
              data: [],
              loading: false,
              error: null,
            }),
            setIssue: jest.fn(),
            refresh: jest.fn(),
            createComment: jest.fn(() => of({})),
            updateComment: jest.fn(() => of({})),
            deleteComment: jest.fn(() => of({})),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);

    fixture.componentRef.setInput(
      'issueId',
      'test-issue-id'
    );

    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
