import React from "react";
import { useAddFamilyMemberSignUp } from "../../context/AddFamilyMembers";
import Input from "../controls/Input";

function FamilyMembers() {
  const { additionalFamilyMember, setAdditionalFamilyMember } =
    useAddFamilyMemberSignUp();
  return (
    <div>
      <Input
        label="First Name"
        type="text"
        value={additionalFamilyMember.firstName}
        handleChange={(e) =>
          setAdditionalFamilyMember({
            ...additionalFamilyMember, // spread the old object to new state
            firstName: e.target.value, // update the state with new value
          })
        }
        css="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
      />
      <Input
        label="Last Name"
        type="text"
        value={additionalFamilyMember.lastName}
        handleChange={(e) =>
          setAdditionalFamilyMember({
            ...additionalFamilyMember,
            lastName: e.target.value,
          })
        }
        css="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
      />
      <Input
        label="Email"
        type="email"
        value={additionalFamilyMember.email}
        handleChange={(e) =>
          setAdditionalFamilyMember({
            ...additionalFamilyMember,
            email: e.target.value,
          })
        }
        css="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
      />
    </div>
  );
}

export default FamilyMembers;
