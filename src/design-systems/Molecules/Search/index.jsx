import React, { useState } from "react";

const Search = ({
    walletAddress,
    setWalletAddress,
    getDetailsByAddress
}) => {
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (e) => {
        if(e.target.value) {
            setWalletAddress(e.target.value)
            setErrorMsg('')
        } else {
            setWalletAddress(e.target.value)
            setErrorMsg('Empty address not allowed')
        }
    }

  return (
    <div className="flex flex-col">
    <div className="flex flex-row items-center">
      <input
        type="text"
        placeholder="Enter wallet address"
        onChange={handleChange}
        className="px-3 py-2 bg-indigo-500 border shadow-sm border-indigo-500 placeholder-gray-400 white focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 block w-full rounded-md sm:text-sm focus:ring-1"
      />
      <button className="flex ml-4 bg-indigo-500 p-2 rounded-lg" onClick={() => getDetailsByAddress()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </button>
    </div>
    <div className="text-sm text-red-800 mt-2">{errorMsg}</div>
    </div>
  );
};

export default Search;
