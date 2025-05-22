// export custom domain typescript error for if allowed items length is less than 10
export class RestrictedTodosError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RestrictedTodosError';
  }
}
