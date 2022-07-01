import "./App.css";
import axios from "axios";
import { useState } from "react";
import Search from "./design-systems/Molecules/Search";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const getDetailsByAddress = async () => {
    try {
      setLoading(true);
      if (walletAddress) {
        const res = await axios.get(
          `https://api.covalenthq.com/v1/1/address/${walletAddress}/balances_v2/?key=${process.env.REACT_APP_COVALENT_API_KEY}&page-size=5&page-number=0&nft=true`
        );
        navigate(`/dashboard/${walletAddress}`, {
          state: { data: res.data.data },
        });
        setData(res.data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response.data.error_code === 400) {
        toast.error("Invalid data");
      }
      if (error.response.data.error_code === 409) {
        toast.error("You have exceeded your limit, come back after sometime.");
      }
    }
  };

  return (
    <>
      <div className="App-header h-full w-full bg-gradient-to-r from-indigo-500 to-blue-500">
        {loading ? (
          <div className="flex flex-row items-center justify-center h-full w-full">
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              className="animate-spin"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5459 7.35737C12.6589 6.09063 12.961 4.33104 14.3099 3.57496C17.3341 1.87996 20.6541 0.757227 24.1032 0.272494C28.4788 -0.342469 32.938 0.0868951 37.1159 1.52548C41.2939 2.96407 45.072 5.37103 48.1415 8.54957C51.211 11.7281 53.4846 15.588 54.7765 19.8136C56.0684 24.0392 56.3419 28.5106 55.5746 32.8621C54.8073 37.2137 53.021 41.3219 50.3618 44.8508C47.7026 48.3797 44.2459 51.2292 40.2744 53.1662C37.1439 54.6931 33.7637 55.6188 30.3087 55.9047C28.7676 56.0322 27.5332 54.7423 27.5602 53.1962C27.5872 51.65 28.867 50.4366 30.4045 50.2706C32.9742 49.9931 35.4838 49.2722 37.8195 48.133C40.9967 46.5834 43.7621 44.3038 45.8894 41.4807C48.0168 38.6575 49.4459 35.371 50.0597 31.8897C50.6735 28.4085 50.4547 24.8314 49.4212 21.4509C48.3877 18.0704 46.5688 14.9825 44.1132 12.4397C41.6576 9.89682 38.6351 7.97125 35.2927 6.82038C31.9504 5.66952 28.3831 5.32603 24.8825 5.818C22.3091 6.17967 19.8254 6.98533 17.5398 8.1923C16.1724 8.91442 14.4329 8.6241 13.5459 7.35737Z"
                fill="#9CA3AF"
              />
            </svg>
          </div>
        ) : (
          <div className="flex flex-row h-full w-full items-center justify-center">
            <Search
              walletAddress={walletAddress}
              setWalletAddress={setWalletAddress}
              getDetailsByAddress={getDetailsByAddress}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
