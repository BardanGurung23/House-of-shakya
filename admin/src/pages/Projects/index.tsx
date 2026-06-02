import DeleteModal from "@/components/DeleteModal";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Table from "@/components/Table";
import { PROJECTS_URL } from "@/constants/apiUrlConstants";
import usePagination from "@/hooks/usePagination";
import { useDeleteApiMutation, useGetApiQuery } from "@/redux/services/crudApi";
import { PROJECTS_ADD_ROUTE } from "@/routes/routeNames";
import { checkAccess } from "@/utils/accessHelper";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { useMemo, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const navigate = useNavigate();
  const accessList = checkAccess("Projects");

  const { query, handlePagination } = usePagination({ page: 1, limit: 10 });
  const [open, setOpen] = useState<boolean>(false);
  const [deleteId, setDeletedId] = useState<number | null>(null);

  const listQuery = useMemo(
    () => new URLSearchParams(query).toString(),
    [query],
  );
  const {
    data: allProjects,
    isSuccess: success,
    refetch,
  } = useGetApiQuery(`${PROJECTS_URL}list?${listQuery}`);
  const [deleteProjects] = useDeleteApiMutation();

  const handleNewProjects = (id: number | null) => {
    id === null
      ? navigate(PROJECTS_ADD_ROUTE)
      : navigate(`${PROJECTS_ADD_ROUTE}${id}`);
  };

  const handleDeleteTrigger = (id: number) => {
    setDeletedId(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteProjects(
        `${PROJECTS_URL}${deleteId}`,
      ).unwrap();
      handleResponse({ res: response, onSuccess: () => {} });
    } catch (error) {
      handleError({ error });
    } finally {
      setOpen(false);
    }
  };

  const pagination = {
    page: allProjects?.data?.page,
    limit: allProjects?.data?.limit,
    total: allProjects?.data?.total,
    totalPages: allProjects?.data?.totalPages,
  };

  const tableHeaders = [
    "Name",
    "Category",
    "Type",
    "Location",
    "Description",
    (accessList.includes("edit") || accessList.includes("delete")) && "Actions",
  ];

  const tableData =
    success && allProjects?.data?.data
      ? allProjects.data.data.map(
          ({ id, name, category, type, location, description }) => [
            name,
            category?.name || "-",
            type,
            location,
            <p key={`${id}-description`} className="line-clamp-2">
              {description}
            </p>,
            <div
              key={id}
              className="flex items-center justify-center cursor-pointer gap-[0.5rem]"
            >
              {accessList.includes("edit") && (
                <MdEditSquare
                  size={18}
                  className="text-primaryColor"
                  onClick={() => handleNewProjects(id)}
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
      <PageTitle title="Projects" />
      <PageHeader
        hasAddButton={accessList.includes("add")}
        newButtonText="Add New Project"
        handleNewButton={() => handleNewProjects(null)}
        handleReloadButton={() => refetch()}
        hasSubText
        subText="Manage project entries"
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
