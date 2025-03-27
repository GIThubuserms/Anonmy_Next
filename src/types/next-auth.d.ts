import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      username?: string;
      isVerfied?: boolean;
      isAcceptingMessage?: boolean;
    }& DedaultSession['user'];
  }

  interface User {
    _id?: string;
    username?: string;
    isVerfied?: boolean;
    isAcceptingMessage?: boolean;
  }
}
