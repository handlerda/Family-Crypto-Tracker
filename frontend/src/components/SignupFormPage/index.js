import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import { useAddFamilyMemberSignUp } from "../../context/AddFamilyMembers";
import Input from "../controls/Input";
import FamilyMemberInputs from "./FamilyMembersInputs";
import Popup from "../controls/Popup";
import { Dialog } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import FamilyMemberCounter from "../controls/FamilyMemberCounter";
import Toggle from "../controls/Toggle";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    addFamilyMembers,
    setAddFamilyMembers,
    additionalFamilyMember,
    setAdditionalFamilyMember,
    familyMembers,
    setFamilyMembers,
  } = useAddFamilyMemberSignUp();
  const [finishedInitialQuestions, setInitialQuestions] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
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

  // will take user to password and additional fam member
  function checkContinue(e) {
    e.preventDefault();
    if (inputQuestions.some((key) => !key.value && key.initial))
      setInitialQuestions(false);
    else setInitialQuestions(true);
  }

  //call popup
  function renderPopUp(e) {
    e.preventDefault();
    setShowPopUp(true);
  }

  //handle adding family members
  function addFamilyMembersForm(e) {
    e.preventDefault();
    setFamilyMembers((prevState) => [...prevState, additionalFamilyMember]);
    setAdditionalFamilyMember({ firstName: "", lastName: "", email: "" });
  }

  //remove family member
  // function removeFamilyMembersForm(e) {
  //   e.preventDefault();
  //   // get familyMembers
  //   //const members = familyMembers;

  //   setFamilyMembers([...familyMembers.pop()]);
  // }
  console.log(`here are family members`, familyMembers);
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

  console.log(`additionalFamilyMember`, additionalFamilyMember);
  return (
    <div className="min-h-screen bg-pink-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {showPopUp && (
        <Popup open={showPopUp} setOpen={setShowPopUp}>
          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  Payment successful
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consequatur amet labore.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                // onClick={() => setOpen(false)}
              >
                Go back to dashboard
              </button>
            </div>
          </div>
        </Popup>
      )}
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
                  <Input
                    label={question.label}
                    type={question.type}
                    value={question.value}
                    handleChange={(e) => question.setValue(e.target.value)}
                    css="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                );
              }
              if (finishedInitialQuestions && !question.initial) {
                return (
                  <Input
                    label={question.label}
                    type={question.type}
                    value={question.value}
                    handleChange={(e) => question.setValue(e.target.value)}
                    css="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                );
              }
            })}
            {finishedInitialQuestions && (
              <>
                <Toggle
                  label="Add a family member"
                  handleToggleChange={() =>
                    setAddFamilyMembers(!addFamilyMembers)
                  }
                  toggled={addFamilyMembers}
                />
                {addFamilyMembers && finishedInitialQuestions && (
                  <div className=" py-3">
                    <FamilyMemberInputs />
                  </div>
                )}
                {addFamilyMembers && (
                  <FamilyMemberCounter
                    handleAdd={(e) => addFamilyMembersForm(e)}
                    //handleSubtract={(e) => removeFamilyMembersForm(e)}
                    label="Add another member"
                  />
                )}
              </>
            )}
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
                  <button
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    onClick={(e) => renderPopUp(e)}
                  >
                    Verify Info
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
