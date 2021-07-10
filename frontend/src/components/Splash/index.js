import React from "react";
import {
  ShieldCheckIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  MailIcon,
  ScaleIcon,
} from "@heroicons/react/outline";

function Splash() {
  const transferFeatures = [
    {
      id: 1,
      name: "Manage family accounts under one roof:",
      description:
        "No more sending a family member 2 factor auth code to login to an exchange. Now you can access your family's crypto  in a secure centralized portal.",
      icon: ShieldCheckIcon,
    },
    {
      id: 2,
      name: "Bank level security:",
      description:
        "Crypfam does not store any public or private key's in our database. We connect to the exchanges, custodians, and blockchain providers via API using the highest level's of encryption.",
      icon: ScaleIcon,
    },
    {
      id: 3,
      name: "Conditional account access",
      description:
        "Each family member has a head of household. The head of household or the specific account owner can decide which family members can access the respective account.",
      icon: LightningBoltIcon,
    },
  ];

  return (
    <div className="py-16 bg-gray-100 overflow-hidden lg:py-24">
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl bg-gray m-4">
        <svg
          className="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={784}
            fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)"
          />
        </svg>

        <div className="flex flex-col content-center">
          <h2 className="text-center text-3xl ml-3 leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to keep track of your family's crypto
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text center text-xl text-gray-500">
            Crypfam allows your family to have full visibility to all crypto
            accounts regardless of custodian and blockchain.
          </p>

          <div className="mt-10 max-w-3xl mx-auto md:w-2/3 lg:w-2/3 ">
            <div className=" bg-white p-8 rounded-md">
              <h3 className="text-2xl text-center font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                Connect to the most popular exchanges
              </h3>
              <p className="mt-3 text-lg text-gray-500">
                You can connect to the most popular exchanges including
                Coinbase, Gemini and Binance. If you manage your own keys you
                can connect via a secure Trezor or Ledger integration or just
                enter your public wallet address.
              </p>

              <dl className="mt-10 space-y-10">
                {transferFeatures.map((item) => (
                  <div key={item.id} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white">
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        {item.name}
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      {item.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
            <svg
              className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
              width={784}
              height={404}
              fill="none"
              viewBox="0 0 784 404"
            >
              <defs>
                <pattern
                  id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={784}
                height={404}
                fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)"
              />
            </svg>
          </div>
        </div>

        <svg
          className="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={784}
            fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
          />
        </svg>
      </div>
    </div>
  );
}

export default Splash;
