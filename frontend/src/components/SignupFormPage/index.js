import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import Toggle from "../controls/Toggle";
import { useAddFamilyMemberSignUp } from "../../context/AddFamilyMembers";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { addFamilyMembers, setAddFamilyMembers } = useAddFamilyMemberSignUp();
  const [finishedInitialQuestions, setInitialQuestions] = useState(false);
  const [errors, setErrors] = useState([]);

  const inputQuestions = [
    {
      label: "Email address",
      type: "email",
      value: email,
      setValue: setEmail,
      initial: true,
    },

    {
      label: "First Name",
      type: "text",
      value: firstName,
      setValue: setFirstName,
      initial: true,
    },
    {
      label: "Last Name",
      type: "text",
      value: lastName,
      setValue: setLastName,
      initial: true,
    },
    {
      label: "Password",
      type: "password",
      value: password,
      setValue: setPassword,
      initial: false,
    },
    {
      label: "Confirm Password",
      type: "password",
      value: confirmPassword,
      setValue: setConfirmPassword,
      initial: false,
    },
  ];

  function checkContinue(e) {
    e.preventDefault();
    if (inputQuestions.some((key) => !key.value && key.initial))
      setInitialQuestions(false);
    else setInitialQuestions(true);
  }

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ email, username, password })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  //if(initial)
  return (
    <div className="min-h-screen bg-pink-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Crypfam
        </h2>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Sign up for an account
        </h2>
        <p className="mt-2 text-center text-sm text-white">
          Already have an invite from a family member
          <Link
            to="/"
            className="font-medium hover:text-purple-600 pl-2 text-white pb-4"
          >
            Click here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-200 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {inputQuestions.map((question) => {
              if (!finishedInitialQuestions && question.initial === true) {
                return (
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {question.label}
                    </label>
                    <div className="mt-1">
                      <input
                        type={question.type}
                        value={question.value}
                        onChange={(e) => question.setValue(e.target.value)}
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      />
                    </div>
                  </div>
                );
              }
              if (finishedInitialQuestions && !question.initial) {
                return (
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {question.label}
                    </label>
                    <div className="mt-1">
                      <input
                        type={question.type}
                        value={question.value}
                        onChange={(e) => question.setValue(e.target.value)}
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      />
                    </div>
                  </div>
                );
              }
            })}
            {finishedInitialQuestions && <Toggle />}
            {addFamilyMembers && <h1>Hello it worked</h1>}
            <div className="flex-row flex justify-between">
              {!finishedInitialQuestions && (
                <button
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={(e) => checkContinue(e)}
                >
                  Continue
                </button>
              )}
              {finishedInitialQuestions && (
                <>
                  <button
                    className=" py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    onClick={() => setInitialQuestions(false)}
                  >
                    Back
                  </button>
                  <button className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    Next
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
