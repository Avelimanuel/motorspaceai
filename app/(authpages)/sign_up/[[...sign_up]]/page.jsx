import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen mt-10">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
