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
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const columns = useMemo(
    () => [
      {
        Header: "Value",
        accessor: "value",
      },
      {
        Header: "Block Height",
        accessor: "block_height",
      },
      {
        Header: "Block Signed At",
        accessor: "block_signed_at",
      },
      {
        Header: "fees_paid",
        accessor: "fees_paid",
      },
      {
        Header: "from_address",
        accessor: "from_address",
      },
      {
        Header: "to_address",
        accessor: "to_address",
      },
      {
        Header: "gas_offered",
        accessor: "gas_offered",
      },
      {
        Header: "gas_price",
        accessor: "gas_price",
      },
      {
        Header: "gas_spent",
        accessor: "gas_spent",
      },
    ],
    []
  );

  const getDetailsByAddress = async (pageNumber = 0, pageSize = 5) => {
    try {
      setLoading(true);
      if (address) {
        const res = await axios.get(
          `https://api.covalenthq.com/v1/1/address/${address}/transactions_v2/?key=${process.env.REACT_APP_COVALENT_API_KEY}&page-size=${pageSize}&page-number=${pageNumber}`
        );
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

  useEffect(() => {
    getDetailsByAddress();
  }, []);

  return (
    <div className="flex flex-col flex-wrap">
      {data && (
        <>
          <Banner addressData={data} />
          <DataTable
            columns={columns}
            data={data.items}
            paginate={true}
            count={-1}
            rowsPerPage={pageSize}
            pageIndex={currentPage}
            pageSize={pageSize}
            handleChangeRowsPerPage={(e) => (setPageSize(e.target.value), getDetailsByAddress(currentPage, e.target.value))}
            onPageChange={(e, page) => (getDetailsByAddress(page, pageSize), setCurrentPage(page), console.log(page, ' == ', currentPage))}
          />
        </>
      )}
    </div>
  );
};

export default DashBoard;
