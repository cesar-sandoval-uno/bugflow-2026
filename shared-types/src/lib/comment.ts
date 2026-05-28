
export interface CommentAuthor {
  id: string;
  name: string;
}

export interface Comment {
  id: string;
  content: string;

  authorId: string;
  issueId: string;

  author: CommentAuthor;

  createdAt: string;
  updatedAt?: string;
}
