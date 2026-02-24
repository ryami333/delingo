"use client";

import { authClient } from "../helpers/authClient";

export function SignInButton() {
  const onClick = async () => {
    const { data } = await authClient.signIn.social({
      provider: "pocket-id",
      callbackURL: "/admin/dashboard",
    });
    if (data?.redirect && data.url) {
      window.location.href = data.url;
    }
  };
  return <button onClick={onClick}>Login</button>;
}
