import { Fragment, useState } from "react";
import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  MenuIcon,
  UserCircleIcon,
  ViewGridAddIcon,
  XIcon,
} from "@heroicons/react/outline";
import Account from "./Account";
import Family from "./Family";
import accountReducer from "../../store/account";
import Password from "./Password";

const user = {
  name: "Debbie Lewis",
  handle: "deblewis",
  email: "debbielewis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Settings() {
  const [accountActive, setAccountActive] = useState(true);
  const [familyActive, setFamilyActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);
  const [billingActive, setBillingActive] = useState(false);

  const subNavigation = [
    {
      name: "Account",
      icon: CogIcon,
      setActive: setAccountActive,
      active: accountActive,
    },
    {
      name: "Family",
      icon: UserCircleIcon,
      setActive: setFamilyActive,
      active: familyActive,
    },
    {
      name: "Password",
      icon: KeyIcon,
      setActive: setPasswordActive,
      active: passwordActive,
    },
    {
      name: "Billing",
      icon: CreditCardIcon,
      setActive: setBillingActive,
      active: billingActive,
    },
  ];

  function setActive(e, item) {
    e.preventDefault();
    subNavigation.forEach((item) => {
      console.log(item);
      item.setActive(false);
    });
    item.setActive(true);
  }

  return (
    <div className="bg-white-100">
      <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
        <div className="">
          <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
            <aside className="py-6 lg:col-span-3">
              <nav className="space-y-1">
                {subNavigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={(e) => setActive(e, item)}
                    className={classNames(
                      item.current
                        ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                        : "border-transparent text-gray-900  hover:text-gray-900",
                      "group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-teal-500 group-hover:text-teal-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </button>
                ))}
              </nav>
            </aside>
            <div className="divide-y divide-gray-200 bg-white h-full lg:col-span-9 pl-5 pt-5 ">
              {console.log(`what is active`, accountActive)}
              {accountActive && <Account />}
              {familyActive && <Family />}
              {passwordActive && <Password />}
              {billingActive && (
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    Account Details
                  </h2>
                  <h1>This is being worked on in V2</h1>
                </div>
              )}
              {/* <Account />
              <Family /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
