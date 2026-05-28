import {
  Component,
  inject,
  input,
  signal,
  effect,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsFacade, UsersFacade } from '@bugflow-2026/data-access';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './comments.html',
})
export class CommentsComponent {
  private fb = inject(FormBuilder).nonNullable;
  private usersFacade = inject(UsersFacade);
  readonly facade = inject(CommentsFacade);

  currentUser = this.usersFacade.me;
  issueId = input.required<string>();
  editingCommentId = signal<string | null>(null);
  loading = signal(false);
  form = this.fb.group({
    content: this.fb.control(
      '',
      Validators.required,
    ),
  });

  constructor() {
    effect(() => {
      this.facade.setIssue(
        this.issueId()
      );
    });
  }

  formatDate(date: string) {
    return new Intl.DateTimeFormat(
      'en',
      {
        dateStyle: 'medium',
        timeStyle: 'short',
      }
    ).format(new Date(date));
  }

  isOwner(authorId: string) {
    return (
      this.currentUser()?.auth0Id === authorId
    );
  }

  startEdit(comment: any) {
    this.editingCommentId.set(comment.id);
    this.form.patchValue({
      content: comment.content,
    });
  }

  deleteComment(commentId: string) {
    if (!confirm('Delete this comment?')) {
      return;
    }
    this.facade
      .deleteComment(
        this.issueId(),
        commentId,
      )
      .subscribe(() => {
        this.facade.refresh();
      });
  }

  cancelEdit() {
    this.editingCommentId.set(null);
    this.form.reset();
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const content = this.form.getRawValue().content;
    const editingId = this.editingCommentId();
    const request$ = editingId
      ? this.facade.updateComment(
          this.issueId(),
          editingId,
          content,
        )
      : this.facade.createComment(
          this.issueId(),
          content,
        );

    request$.subscribe({
      next: () => {
        this.loading.set(false);
        this.form.reset();
        this.editingCommentId.set(null);
        this.facade.refresh();
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
