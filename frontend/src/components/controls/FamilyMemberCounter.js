import { MinusSmIcon } from "@heroicons/react/outline";
import { CheckIcon, PlusSmIcon, UserAddIcon } from "@heroicons/react/solid";
import React from "react";
import { useAddFamilyMemberSignUp } from "../../context/AddFamilyMembers";

function FamilyMemberCounter({ label, handleAdd, handleSubtract }) {
  const { familyMembers } = useAddFamilyMemberSignUp();
  return (
    <div className="flex justify-between">
      <span className="flex-shrink-0">{label}</span>
      <div className="relative inline-flex items-center">
        <p className="mr-4">{familyMembers.length} Total</p>
        <button onClick={handleAdd}>
          <PlusSmIcon className="h-5 w-5 text-pink-500" />
        </button>
        <button onClick={handleSubtract}>
          <MinusSmIcon className="h-5 w-5 text-pink-500" />
        </button>
      </div>
    </div>
  );
}

export default FamilyMemberCounter;
