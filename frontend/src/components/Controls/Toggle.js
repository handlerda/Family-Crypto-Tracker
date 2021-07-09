import { Switch } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import React from "react";
//import { useAddFamilyMemberSignUp } from "../../context/AddFamilyMembers";

function Toggle({ label, handleToggleChange, toggled }) {
  // const { addFamilyMembers, setAddFamilyMembers } = useAddFamilyMemberSignUp();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="flex justify-between">
      <span className="flex-shrink-0">{label}</span>
      <Switch
        checked={true}
        onChange={handleToggleChange}
        className={classNames(
          toggled ? "bg-indigo-600" : "bg-gray-200",
          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ring-2 focus:ring-offset-2 ring-indigo-500"
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={classNames(
            toggled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          )}
        />
      </Switch>
    </div>
  );
}

export default Toggle;
