import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment, CreateCommentPayload } from '@bugflow-2026/shared-types';

@Injectable({
  providedIn: 'root',
})
export class CommentsApiService {
  private http = inject(HttpClient);

  getComments(issueId: string) {
    return this.http.get<Comment[]>(
      `/api/issues/${issueId}/comments`
    );
  }

  createComment(
    issueId: string,
    data: CreateCommentPayload,
  ) {
    return this.http.post(
      `/api/issues/${issueId}/comments`,
      data,
    );
  }

  updateComment(
    issueId: string,
    commentId: string,
    content: string,
  ) {
    return this.http.patch(
      `/api/issues/${issueId}/comments/${commentId}`,
      { content },
    );
  }

  deleteComment(
    issueId: string,
    commentId: string,
  ) {
    return this.http.delete(
      `/api/issues/${issueId}/comments/${commentId}`,
    );
  }

}
