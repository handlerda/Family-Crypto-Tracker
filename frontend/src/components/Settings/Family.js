import React, { useEffect, useState } from "react";
import Header from "../Controls/Header";
import Input from "../Controls/Input";
import Popup from "../Controls/Popup";
import FamilyMemberInputs from "../SignupFormPage/FamilyMembersInputs";
import { useAddFamilyMemberSignUp } from "../../context/AddFamilyMembers";
import { useDispatch, useSelector } from "react-redux";
import { addNewFamilyMember, getFamilyMembers } from "../../store/session";
const people = [
  {
    name: "Calvin Hawkins",
    email: "calvin.hawkins@example.com",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Kristen Ramos",
    email: "kristen.ramos@example.com",
    image:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Ted Fox",
    email: "ted.fox@example.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

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
    } else {
      setErrors(data.errors);
    }
    console.log(data);
  }

  useEffect(() => {
    (async () => {
      await dispatch(getFamilyMembers());
      setFamilyMembersLoaded(true);
    })();
  }, [dispatch]);
  console.log(familyMembers);
  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Family Details
          </h2>
        </div>
      </div>
      {familyMembersLoaded && (
        <ul className="divide-y divide-gray-200 mt-5">
          {familyMembers.familyMembers.users.map((member) => (
            <li key={member.id} className="py-4 flex">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {`${member.firstName} ${member.lastName}`}
                </p>
                <p className="text-sm text-gray-500">{member.phone}</p>
                <p className="text-sm text-gray-500">
                  {member.headOfHouseHold
                    ? `head of household`
                    : `family member`}
                </p>
                {familyMembers.user. <button className="bg-red-500 px-2 rounded-md text-white mt-5">
                  Delete
                </button>
              </div>}
            </li>
          ))}
        </ul>
      )}
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
      <button onClick={addNewFamilyMemberClick}>Add</button>
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
