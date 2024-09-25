import React from "react";
// import LoginFormDetails from "./login-form-details";

type LoginPageProps = {
  searchParams: {
    callbackUrl?: string;
  };
};

export default function LoginPage({
  searchParams: { callbackUrl },
}: LoginPageProps) {
  return (
    <section>
      <div className="w-full h-screen flex items-center justify-center px-4">
        {/* <LoginFormDetails callbackUrl={callbackUrl} /> */}
      </div>
    </section>
  );
}
