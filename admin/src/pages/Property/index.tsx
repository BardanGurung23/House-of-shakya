import DeleteModal from "@/components/DeleteModal";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Table from "@/components/Table";
import { PROPERTY_URL } from "@/constants/apiUrlConstants";
import usePagination from "@/hooks/usePagination";
import { useDeleteApiMutation, useGetApiQuery } from "@/redux/services/crudApi";
import { PROPERTY_ADD_ROUTE } from "@/routes/routeNames";
import { checkAccess } from "@/utils/accessHelper";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { useMemo, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Property() {
  const navigate = useNavigate();
  const accessList = checkAccess("Property");

  const { query, handlePagination } = usePagination({ page: 1, limit: 10 });
  const [open, setOpen] = useState<boolean>(false);
  const [deleteId, setDeletedId] = useState<number | null>(null);

  const listQuery = useMemo(
    () => new URLSearchParams(query).toString(),
    [query],
  );
  const {
    data: allProperties,
    isSuccess: success,
    refetch,
  } = useGetApiQuery(`${PROPERTY_URL}list?${listQuery}`);
  const [deleteProperty] = useDeleteApiMutation();

  const handleNewProperty = (id: number | null) => {
    id === null
      ? navigate(PROPERTY_ADD_ROUTE)
      : navigate(`${PROPERTY_ADD_ROUTE}${id}`);
  };

  const handleDeleteTrigger = (id: number) => {
    setDeletedId(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteProperty(
        `${PROPERTY_URL}${deleteId}`,
      ).unwrap();
      handleResponse({ res: response, onSuccess: () => {} });
    } catch (error) {
      handleError({ error });
    } finally {
      setOpen(false);
    }
  };

  const pagination = {
    page: allProperties?.data?.page,
    limit: allProperties?.data?.limit,
    total: allProperties?.data?.total,
    totalPages: allProperties?.data?.totalPages,
  };

  const tableHeaders = [
    "Name",
    "Category",
    "Location",
    "Beds",
    "Bath",
    "Anna",
    "Price",
    (accessList.includes("edit") || accessList.includes("delete")) && "Actions",
  ];

  const tableData =
    success && allProperties?.data?.data
      ? allProperties.data.data.map(
          ({ id, name, category, location, beds, bath, anna, price }) => [
            name,
            category?.name || "-",
            location,
            beds ?? "-",
            bath ?? "-",
            anna ?? "-",
            price,
            <div
              key={id}
              className="flex items-center justify-center cursor-pointer gap-[0.5rem]"
            >
              {accessList.includes("edit") && (
                <MdEditSquare
                  size={18}
                  className="text-primaryColor"
                  onClick={() => handleNewProperty(id)}
                />
              )}
              {accessList.includes("delete") && (
                <DeleteModal
                  open={open}
                  setOpen={setOpen}
                  handleDeleteTrigger={() => handleDeleteTrigger(id)}
                  handleConfirmDelete={handleDelete}
                />
              )}
            </div>,
          ],
        )
      : [];

  return (
    <>
      <PageTitle title="Property" />
      <PageHeader
        hasAddButton={accessList.includes("add")}
        newButtonText="Add New Property"
        handleNewButton={() => handleNewProperty(null)}
        handleReloadButton={() => refetch()}
        hasSubText
        subText="Manage property listings and images"
      />
      {accessList.includes("view") ? (
        <Table
          isSN
          headers={tableHeaders}
          data={tableData}
          pagination={pagination}
          handlePagination={handlePagination}
        />
      ) : (
        <p>You don't have Permission to view this table</p>
      )}
    </>
  );
}
