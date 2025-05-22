export class BlogPostNotFoundError extends Error {
  constructor(id: string) {
    super(`Blog post with id ${id} not found`);
    this.name = 'BlogPostNotFoundError';
  }
}
