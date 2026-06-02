import DeleteModal from "@/components/DeleteModal";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Table from "@/components/Table";
import { PROJECT_CATEGORY_URL } from "@/constants/apiUrlConstants";
import usePagination from "@/hooks/usePagination";
import { useDeleteApiMutation, useGetApiQuery } from "@/redux/services/crudApi";
import { PROJECT_CATEGORY_ADD_ROUTE } from "@/routes/routeNames";
import { checkAccess } from "@/utils/accessHelper";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { useMemo, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ProjectCategory() {
  const navigate = useNavigate();
  const accessList = checkAccess("Project Category");

  const { query, handlePagination } = usePagination({ page: 1, limit: 10 });
  const [open, setOpen] = useState<boolean>(false);
  const [deleteId, setDeletedId] = useState<number | null>(null);

  const listQuery = useMemo(
    () => new URLSearchParams(query).toString(),
    [query],
  );
  const {
    data: allProjectCategories,
    isSuccess: success,
    refetch,
  } = useGetApiQuery(`${PROJECT_CATEGORY_URL}list?${listQuery}`);
  const [deleteProjectCategory] = useDeleteApiMutation();

  const handleNewProjectCategory = (id: number | null) => {
    id === null
      ? navigate(PROJECT_CATEGORY_ADD_ROUTE)
      : navigate(`${PROJECT_CATEGORY_ADD_ROUTE}${id}`);
  };

  const handleDeleteTrigger = (id: number) => {
    setDeletedId(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteProjectCategory(
        `${PROJECT_CATEGORY_URL}${deleteId}`,
      ).unwrap();
      handleResponse({ res: response, onSuccess: () => {} });
    } catch (error) {
      handleError({ error });
    } finally {
      setOpen(false);
    }
  };

  const pagination = {
    page: allProjectCategories?.data?.page,
    limit: allProjectCategories?.data?.limit,
    total: allProjectCategories?.data?.total,
    totalPages: allProjectCategories?.data?.totalPages,
  };

  const tableHeaders = [
    "Name",
    "Slug",
    (accessList.includes("edit") || accessList.includes("delete")) && "Actions",
  ];

  const tableData =
    success && allProjectCategories?.data?.data
      ? allProjectCategories.data.data.map(({ id, name, slug }) => [
          name,
          slug,
          <div
            key={id}
            className="flex items-center justify-center cursor-pointer gap-[0.5rem]"
          >
            {accessList.includes("edit") && (
              <MdEditSquare
                size={18}
                className="text-primaryColor"
                onClick={() => handleNewProjectCategory(id)}
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
        ])
      : [];

  return (
    <>
      <PageTitle title="Project Category" />
      <PageHeader
        hasAddButton={accessList.includes("add")}
        newButtonText="Add New Project Category"
        handleNewButton={() => handleNewProjectCategory(null)}
        handleReloadButton={() => refetch()}
        hasSubText
        subText="Manage project categories"
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
