import React, { useState } from 'react';
import { LockClosedIcon } from "@heroicons/react/20/solid";
import axios from 'axios';

const PasswordForgot = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/forgot-password', {
        email,
      });
      setMessage(response.data.status);
    } catch (error) {
      setError(error.response.data.email[0]);
    }
  };

  return (
    <>
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
      </div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Forgot Password
      </h2>

      {error && (
        <div className="bg-red-500 rounded py-2 px-3 text-white">
          {error}
        </div>
      )}
      {message && (
        <div className="bg-green-500 rounded py-2 px-3 text-white">
          {message}
        </div>
      )}

      <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Send Reset Link
          </button>
        </div>
      </form>
    </>
  );
};

export default PasswordForgot;
