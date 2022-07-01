import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Banner from "../../Molecules/Banner";
import DataTable from "../../Molecules/Table";

const DashBoard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { address } = params;
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [tableData, setTableData] = useState([]);
  const [transactionData, setTransactionData] = useState(null);
  const [tabState, setTabState] = useState("address");
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: (d) => (
          <div className="flex flex-row items-center">
            <img
              src={d.logo_url}
              alt=""
              srcSet=""
              className="h-20 w-20 mx-4 rounded-full"
              onError={(e) =>
                (e.target.src =
                  "https://lh3.googleusercontent.com/VFdpUbTVcSSh8GvYrgRPnZS6Pz8hkppj6QpG4OsolTnI0dup5Is6pK8IbhyX5iwWBcdBC0LCrBTZAnsq6luVa-98pVd3NnfDkaJdvsU=s0")
              }
            />
            {d.contract_name}
          </div>
        ),
      },
      {
        Header: "Address",
        accessor: (d) => <div>{d.contract_address}</div>,
      },
      {
        Header: "Balance",
        accessor: (d) => parseFloat(d.balance).toExponential(2),
      },
      {
        Header: "Contract Name",
        accessor: "contract_name",
      },
    ],
    [data?.items[0]?.logo_url]
  );
  const transactionColumns = useMemo(
    () => [
      {
        Header: "Block Height",
        accessor: "block_height",
      },
      {
        Header: "Signed At",
        accessor: "block_signed_at",
      },
      {
        Header: "Fees Paid",
        accessor: "fees_paid",
      },
      {
        Header: "Gas Offered",
        accessor: "gas_offered",
      },
      {
        Header: "Transaction Hash",
        accessor: "tx_hash",
      },
      {
        Header: "Gas Price",
        accessor: "gas_price",
      },
      {
        Header: "From",
        accessor: "from_address",
      },
      {
        Header: "To",
        accessor: "to_address",
      },
    ],
    [data?.items[0]?.logo_url]
  );

  const getDetailsByAddress = async (pageNumber = 0, pageSize = 5) => {
    try {
      setLoading(true);
      if (address) {
        const res = await axios.get(
          `https://api.covalenthq.com/v1/1/address/${address}/balances_v2/?key=${process.env.REACT_APP_COVALENT_API_KEY}&page-size=${pageSize}&page-number=${pageNumber}&nft=true`
        );
        setData(res.data.data);
        setTableData(res.data.data.items.slice(pageNumber, pageSize));
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

  const getTansactionsByAddress = async (pageNumber = 0, pageSize = 5) => {
    try {
      setLoading(true);
      if (address) {
        const res = await axios.get(
          `https://api.covalenthq.com/v1/1/address/${address}/transactions_v2/?key=${process.env.REACT_APP_COVALENT_API_KEY}&page-size=${pageSize}&page-number=${pageNumber}&nft=true`
        );
        setTransactionData(res.data.data);
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

  const paginateData = (pageNumber = 0, pageSize = 5) => {
    setTableData([
      ...data.items.slice(
        pageNumber * pageSize,
        pageNumber * pageSize + pageSize
      ),
    ]);
  };

  useEffect(() => {
    getDetailsByAddress();
    getTansactionsByAddress();
  }, []);

  return (
    <div className="flex flex-col flex-wrap">
      {data && (
        <>
          <Banner addressData={data} />
          <div className="flex flex-row w-full bg-indigo-400">
            <button onClick={() => setTabState("address")} className="!px-4">
              <Typography
                variant="h5"
                className={`my-4 ${tabState == "address" && "border-b-2 "}`}
              >
                Address Balance
              </Typography>
            </button>
            <button onClick={() => setTabState("nft")} className="!px-4">
              <Typography
                variant="h5"
                className={`my-4  ${tabState == "nft" && "border-b-2 "}`}
              >
                NFT
              </Typography>
            </button>
          </div>
          <div className="mt-4 mx-4 max-w-[100vw]">
            {tabState === "address" ? (
              <DataTable
                columns={columns}
                data={tableData}
                paginate={true}
                count={data.items.length}
                rowsPerPage={pageSize}
                pageIndex={currentPage}
                pageSize={pageSize}
                handleChangeRowsPerPage={(e) => (
                  setPageSize(e.target.value),
                  paginateData(currentPage, e.target.value)
                )}
                onPageChange={(e, page) => (
                  paginateData(page, pageSize), setCurrentPage(page)
                )}
              />
            ) : (
              <DataTable
                columns={transactionColumns}
                data={transactionData.items}
                paginate={true}
                count={-1}
                rowsPerPage={pageSize}
                pageIndex={currentPage}
                pageSize={pageSize}
                handleChangeRowsPerPage={(e) => (
                  setPageSize(e.target.value),
                  paginateData(currentPage, e.target.value)
                )}
                onPageChange={(e, page) => (
                  paginateData(page, pageSize), setCurrentPage(page)
                )}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DashBoard;
