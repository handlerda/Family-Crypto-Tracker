/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/
import { Fragment, useEffect, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  ArrowNarrowLeftIcon,
  CashIcon,
  CheckIcon,
  HomeIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  ThumbUpIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Account from "../Settings/Account";
import { getTransactions } from "../../store/account";
import Transactions from "../Table/Transactions";
import Header from "../Controls/Header";
import NewWallet from "./NewWallet";

const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#" },
  { name: "Jobs", href: "#" },
  { name: "Applicants", href: "#" },
  { name: "Company", href: "#" },
];
const breadcrumbs = [
  { name: "Jobs", href: "#", current: false },
  { name: "Front End Developer", href: "#", current: false },
  { name: "Applicants", href: "#", current: true },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const attachments = [
  { name: "Bitcoin", number: "12342343", id: 1, hidden: true, href: "#" },
  { name: "Cardano ", number: "0453984352", id: 2, hidden: true, href: "#" },
];
const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: ThumbUpIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: "Applied to",
    target: "Front End Developer",
    date: "Sep 20",
    datetime: "2020-09-20",
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    date: "Sep 22",
    datetime: "2020-09-22",
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    date: "Sep 28",
    datetime: "2020-09-28",
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: "Advanced to interview by",
    target: "Bethany Blake",
    date: "Sep 30",
    datetime: "2020-09-30",
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: "Completed interview with",
    target: "Katherine Snyder",
    date: "Oct 4",
    datetime: "2020-10-04",
  },
];
const comments = [
  {
    id: 1,
    name: "Leslie Alexander",
    date: "4d ago",
    imageId: "1494790108377-be9c29b29330",
    body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
  },
  {
    id: 2,
    name: "Michael Foster",
    date: "4d ago",
    imageId: "1519244703995-f4e0f30006d5",
    body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
  },
  {
    id: 3,
    name: "Dries Vincent",
    date: "4d ago",
    imageId: "1506794778202-cad84cf45f1d",
    body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Exchange() {
  const dispatch = useDispatch();
  const [wallets, setWallets] = useState(attachments);
  const [transactionsLoaded, setTransactionsLoaded] = useState(false);
  // get exchange name
  const { exchange: name } = useParams();
  const [accountLoaded, setAccountLoaded] = useState(false);

  // get account details
  const account = useSelector((state) =>
    Object.values(state.account.all).filter((account) => {
      return account.provider.name === name;
    })
  )[0];

  const transactions = useSelector((state) => state.account.transaction);
  console.log(`here come transactions`, transactions);

  //get family details
  const familyMembers = useSelector(
    (state) => state.session.familyMembers.users
  );
  console.log(familyMembers);

  useEffect(() => {
    if (account) {
      setAccountLoaded(true);
    }
  }, [account, accountLoaded]);

  useEffect(() => {
    if (!transactionsLoaded) {
      (async () => {
        dispatch(getTransactions(account.id)).then(() =>
          setTransactionsLoaded(true)
        );
      })();
    }
  }, [transactionsLoaded, account, dispatch]);

  function handleShowClick(e, id) {
    // loop through the array of wallets
    const updatedWallets = wallets.map((wallet) => {
      // find the match
      if (wallet.id === id) {
        // we have a match!!!
        // modify the hidden property
        if (wallet.hidden) {
          wallet.hidden = false;
          return wallet;
        } else {
          wallet.hidden = true;
          return wallet;
        }
      } else {
        return wallet;
      }
    });
    setWallets(updatedWallets);
  }
  return (
    accountLoaded && (
      <div className="min-h-screen bg-gray-100">
        <main className="py-10">
          {/* Page header */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    className="h-16 w-38"
                    src={account.provider.logo}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
              {/* add buttons here if I want */}
            </div>
          </div>

          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="applicant-information-title"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Account information
                    </h2>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Blockchains
                        </dt>

                        {account.balances.map((balance) => {
                          return (
                            <dd className="mt-1 text-sm text-gray-900">
                              {balance.ticker}
                            </dd>
                          );
                        })}
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Family access
                        </dt>
                        {account.accessibleUsers.map((user) => {
                          return (
                            <dd className="mt-1 text-sm text-gray-900">
                              {user.firstName}
                            </dd>
                          );
                        })}
                      </div>

                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Associated wallets
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                            {wallets.map((wallet) => (
                              <li
                                key={wallet.name}
                                className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                              >
                                <div className="w-0 flex-1 flex items-center">
                                  <CashIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                  <span className="ml-2 flex-1 w-0 truncate">
                                    {wallet.name}
                                  </span>
                                </div>

                                {wallet.hidden ? `` : wallet.number}
                                <div className="ml-4 flex-shrink-0">
                                  <button
                                    onClick={(e) =>
                                      handleShowClick(e, wallet.id)
                                    }
                                    className="font-medium text-blue-600 hover:text-blue-500"
                                  >
                                    {wallet.hidden ? "Show address" : "Hide"}
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </section>

              {/* Comments*/}
              <section aria-labelledby="notes-title"></section>
            </div>
            <div>
              <NewWallet />
            </div>
          </div>
          {/* <div className="">
            {transactionsLoaded && <Transactions accountId={account.id} />}
          </div> */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-6">
            <div className="flex-grow">
              <Header title="Transactions" />
              {transactionsLoaded ? (
                <Transactions accountId={account.id} />
              ) : (
                "loading"
              )}
            </div>
          </div>
        </main>
      </div>
    )
  );
}
