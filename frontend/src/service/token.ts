
export class Token {
  private static AUTH_TOKEN_NAME = 'guitar-shop-token';

  static save(token: string): void {
    localStorage.setItem(this.AUTH_TOKEN_NAME, token);
  }

  static get(): string {
    return localStorage.getItem(this.AUTH_TOKEN_NAME) ?? '';
  }

  static drop() {
    localStorage.removeItem(this.AUTH_TOKEN_NAME);
  }
}
