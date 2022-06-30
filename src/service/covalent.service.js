import axios from "axios";

const getAllAddressDetails = async ({ walletAddress }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_COVALENT_API_URL}1/address/${walletAddress}/balances_v2/?key=${process.env.REACT_APP_COVALENT_API_KEY}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
