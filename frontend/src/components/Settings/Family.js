import React, { useState } from "react";
import Header from "../Controls/Header";
import Popup from "../Controls/Popup";
import FamilyMemberInputs from "../SignupFormPage/FamilyMembersInputs";

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
  const [showNewMembers, setShowNewMembers] = useState(false);

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Family Details
          </h2>
        </div>
      </div>
      <ul className="divide-y divide-gray-200 mt-5">
        {people.map((person) => (
          <li key={person.email} className="py-4 flex">
            <div>
              <p className="text-sm font-medium text-gray-900">{person.name}</p>
              <p className="text-sm text-gray-500">{person.email}</p>
              <button className="bg-red-500 px-2 rounded-md text-white mt-5">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="py-5">
        <Header
          title="Add a new family member"
          details="If you would like to add a new family member please fill out the following information. Once successfully added to your household they will receive a text message"
        />
      </div>
      <FamilyMemberInputs />
    </div>
  );
}

export default Family;
