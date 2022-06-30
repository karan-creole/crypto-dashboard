import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Banner({ addressData }) {
  const location = useLocation();
  const refWalletAddress = useRef();
  const [data, setData] = useState(null);
  const params = useParams();
  const { address } = params;
  const [loading, setLoading] = useState(false);

  const onAddressClick = () => {
    navigator.clipboard.writeText(data.address);
    refWalletAddress.current.ariaLabel = "Copied!";
    toast.success("Address copied to clipboard");
    setTimeout(() => {
      refWalletAddress.current.ariaLabel = "Copy";
    }, 1000);
  };

  useEffect(() => {
    setData(addressData)
  }, []);

  return (
    <div className="w-full h-full bg-red-400 ">
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
    </div>
  );
}

export default Banner;
