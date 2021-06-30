import { CheckIcon } from "@heroicons/react/solid";
import React from "react";
import { useAddFamilyMemberSignUp } from "../../context/AddFamilyMembers";

function FamilyMemberCounter({ label, handleClick }) {
  const { addFamilyMembers, setAddFamilyMembers } = useAddFamilyMemberSignUp();
  return (
    <div>
      <span className="flex-shrink-0">{label}</span>
      <div className="relative inline-flex items-center">
        <p className="mr-4">0</p>
        <button onClick={handleClick}>
          <CheckIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default FamilyMemberCounter;
