import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <div className='flex justify-center items-center min-h-screen mt-10'>
      <SignIn />
    </div>
  );
}

export default SignInPage
