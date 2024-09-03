import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      email: string;
      name: string;
      surname1: string;
      surname2: string;
      access_token: string;
    };
  }
}
