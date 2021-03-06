import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import { CogIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { addAccount, clearAccountStore } from "../../store/account";
import Zabo from "zabo-sdk-js";
// zabo helper function
export const zaboLogin = async () => {
  // init the zabo object (pass in sandbox / prod based on context)
  const zabo = await Zabo.init({
    clientId: process.env.REACT_APP_ZABO_CLIENT_ID,
    env: "sandbox",
  });
  return zabo.connect();
};

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  // inject the zabo object on the screen
  const newZaboAccount = async () => {
    const zabo = await zaboLogin();
    // get account information
    zabo
      .onConnection((account) => {
        // handle successful connection
        // dispatch the account object to the backend
        dispatch(addAccount(sessionUser.id, account));
      })
      .onError((error) => {
        // handle error
        console.error("account connection error:", error.message);
      });
  };

  const logout = async (e) => {
    // fixed
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
    window.location.reload();
  };

  const loginDemoUser = async (e) => {
    e.preventDefault();
    dispatch(sessionActions.signInDemoUser());
    history.push("/dashboard");
  };

  //logout

  const unauthenticatedButtons = [
    { name: "Login", href: "/login", current: false },
    { name: "Signup", href: "/sign-up", current: false },
  ];

  //user settings for a logged in user
  const userNavigation = [
    { name: "Settings", href: "/settings" },
    { name: "Sign out" },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    isLoaded && (
      <Disclosure as="nav" className="bg-purple-600">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="-ml-2 mr-2 flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div
                    className="flex-shrink-0 flex items-center"
                    onClick={() =>
                      sessionUser
                        ? history.push("/dashboard")
                        : history.push("/")
                    }
                  >
                    <span className="hidden font-bold text-pink-200 lg:block w-auto text-2xl">
                      Crypfam
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {sessionUser ? (
                      <button
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        onClick={newZaboAccount}
                      >
                        <PlusIcon
                          className="-ml-1 mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        <span>Connect a crypto wallet</span>
                      </button>
                    ) : (
                      unauthenticatedButtons.map((item) => {
                        return (
                          <button
                            type="button"
                            className="relative inline-flex items-center mx-4 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
                            onClick={() => history.push(item.href)}
                          >
                            <span>{item.name}</span>
                          </button>
                        );
                      })
                    )}
                    {!sessionUser && (
                      <button
                        type="button"
                        className="relative inline-flex items-center mx-4 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        onClick={(e) => loginDemoUser(e)}
                      >
                        <span>Demo User</span>
                      </button>
                    )}
                  </div>

                  {sessionUser && (
                    <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        {({ open }) => (
                          <>
                            <div>
                              <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                <CogIcon className="h-8 w-8 rounded-full text-white" />
                              </Menu.Button>
                            </div>
                            <Transition
                              show={open}
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items
                                static
                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                              >
                                {userNavigation.map((item) => {
                                  if (item.name === "Sign out") {
                                    return (
                                      <Menu.Item key={item.name}>
                                        {({ active }) => (
                                          <Link
                                            className={classNames(
                                              active ? "bg-gray-100" : "",
                                              "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                            onClick={logout}
                                          >
                                            {item.name}
                                          </Link>
                                        )}
                                      </Menu.Item>
                                    );
                                  } else {
                                    return (
                                      <Menu.Item key={item.name}>
                                        {({ active }) => (
                                          <Link
                                            className={classNames(
                                              active ? "bg-gray-100" : "",
                                              "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                            to={item.href}
                                          >
                                            {item.name}
                                          </Link>
                                        )}
                                      </Menu.Item>
                                    );
                                  }
                                })}
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Disclosure.Panel className="md:hidden">
              {sessionUser && (
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5 sm:px-6">
                    <div>
                      <div className="text-base font-medium text-white">
                        {sessionUser.name}
                      </div>
                      <div className="text-sm font-medium text-white">
                        {sessionUser.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1 sm:px-3">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-gray-700"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
  );
}

export default Navigation;
