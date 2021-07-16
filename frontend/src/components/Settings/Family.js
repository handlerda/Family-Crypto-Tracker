import React, { useEffect, useState } from "react";
import Header from "../Controls/Header";
import Input from "../Controls/Input";
import Popup from "../Controls/Popup";
import FamilyMemberInputs from "../SignupFormPage/FamilyMembersInputs";
import { useAddFamilyMemberSignUp } from "../../context/AddFamilyMembers";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewFamilyMember,
  deleteFamilyMember,
  getFamilyMembers,
} from "../../store/session";

function Family() {
  const [password, setPassword] = useState("");
  const { additionalFamilyMember, setAdditionalFamilyMember } =
    useAddFamilyMemberSignUp();
  const dispatch = useDispatch();
  const familyMembers = useSelector((state) => state.session);

  const [familyMembersLoaded, setFamilyMembersLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  async function addNewFamilyMemberClick(e) {
    e.preventDefault();
    // add password to additionalFamilyMember payload
    additionalFamilyMember["password"] = password;

    // add new member to database
    const data = await dispatch(addNewFamilyMember(additionalFamilyMember));
    //clear the input field
    if (!data.errors) {
      setAdditionalFamilyMember({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
    }
    // set errors
    else {
      setErrors(data.errors);
    }
    console.log(data);
  }

  function deleteUser(id) {
    // delete the user
    const response = dispatch(deleteFamilyMember(id));
    return response;
  }

  //want to call if an add or subtract opp happens
  //   useEffect(() => {
  //     if (!familyMembersLoaded) {
  //       (async () => {
  //         await dispatch(getFamilyMembers());
  //         setFamilyMembersLoaded(true);
  //       })();
  //     }
  //   }, [dispatch, familyMembersLoaded]);
  //   console.log(familyMembers);
  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Family Details
          </h2>
        </div>
      </div>
      {
        <ul className="divide-y divide-gray-200 mt-5">
          {familyMembers.familyMembers.users.map((member) => (
            <li key={member.id} className="py-4 flex">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  <span className="font-bold"> Name: </span>
                  {`${member.firstName} ${member.lastName}`}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-bold text-gray-600">
                    Phone number:{" "}
                  </span>
                  {member.phone}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-bold text-gray-600">
                    Family status:{" "}
                  </span>

                  {member.headOfHouseHold
                    ? `Head of household`
                    : `Family member`}
                </p>
                {familyMembers.user.headOfHouseHold &&
                  familyMembers.user.id !== member.id && (
                    <button
                      className="inline-flex items-center px-4 mt-5 py-1 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={() => deleteUser(member.id)}
                    >
                      Delete
                    </button>
                  )}
                <p className="text-gray-600 text-xs mt-2">
                  If you can not delete a family member. Make sure you they are
                  not linked to any accounts or the account owner. More
                  sophisticated error handling is being build.
                </p>
              </div>
            </li>
          ))}
        </ul>
      }
      <div className="py-5">
        <Header
          title="Add a new family member"
          details="If you would like to add a new family member please fill out the following information. Once successfully added to your household they will receive a text message"
        />
      </div>
      <FamilyMemberInputs />
      <Input
        label="Family password"
        type="text"
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
        css="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
      />
      <button
        onClick={addNewFamilyMemberClick}
        className="inline-flex items-center px-4 mt-5 py-1 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Add
      </button>
      {errors && (
        <ul>
          {errors.map((error) => {
            return <li>{error}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

export default Family;
