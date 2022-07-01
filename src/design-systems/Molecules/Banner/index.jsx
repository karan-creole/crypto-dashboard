import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

function Banner({ addressData }) {
  const refWalletAddress = useRef();
  const [data, setData] = useState(null);

  const onAddressClick = () => {
    navigator.clipboard.writeText(data.address);
    toast.success("Address copied to clipboard");
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Shareable link copied to clipboard!");
  };

  useEffect(() => {
    setData(addressData);
  }, []);

  return (
    <div className="w-full h-full bg-indigo-400 py-20 px-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <img
            src={
              "https://lh3.googleusercontent.com/VFdpUbTVcSSh8GvYrgRPnZS6Pz8hkppj6QpG4OsolTnI0dup5Is6pK8IbhyX5iwWBcdBC0LCrBTZAnsq6luVa-98pVd3NnfDkaJdvsU=s0"
            }
            className="h-20 w-20 rounded-full mx-4"
          />
          <div
            className="border-[1px] border-gray-300 cursor-pointer rounded-lg flex items-center gap-2 justify-center h-8 px-4"
            onClick={onAddressClick}
            aria-label="Copy"
            data-balloon-pos="up"
            ref={refWalletAddress}
          >
            {data?.address &&
              `${data?.address.substring(0, 7)}...${data?.address.substring(
                data?.address.length - 4,
                data?.address.length
              )}`}
          </div>
        </div>
        <div
          className="flex fex-row mx-10 text-white hover:text-indigo-700"
          onClick={handleCopyUrl}
        >
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
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Banner;
