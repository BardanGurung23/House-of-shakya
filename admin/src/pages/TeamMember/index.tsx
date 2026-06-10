import DeleteModal from "@/components/DeleteModal";
import DraggableTable from "@/components/Table/dragableTable";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import { TEAM_MEMBER_URL } from "@/constants/apiUrlConstants";
import usePagination from "@/hooks/usePagination";
import {
  useDeleteApiMutation,
  useGetApiQuery,
  useUpdateApiMutation,
} from "@/redux/services/crudApi";
import { TEAM_MEMBER_ADD_ROUTE } from "@/routes/routeNames";
import { checkAccess } from "@/utils/accessHelper";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { useMemo, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function TeamMember() {
  const navigate = useNavigate();
  const accessList = checkAccess("Team Member");

  const { query, handlePagination } = usePagination({ page: 1, limit: 10 });
  const [open, setOpen] = useState<boolean>(false);
  const [deleteId, setDeletedId] = useState<number | null>(null);

  const listQuery = useMemo(
    () => new URLSearchParams(query).toString(),
    [query],
  );
  const {
    data: allTeamMembers,
    isSuccess: success,
    refetch,
  } = useGetApiQuery(`${TEAM_MEMBER_URL}list?${listQuery}`);
  const [deleteTeamMember] = useDeleteApiMutation();
  const [updateTeamMemberOrder] = useUpdateApiMutation();

  const handleNewTeamMember = (id: number | null) => {
    id === null
      ? navigate(TEAM_MEMBER_ADD_ROUTE)
      : navigate(`${TEAM_MEMBER_ADD_ROUTE}${id}`);
  };

  const handleDeleteTrigger = (id: number) => {
    setDeletedId(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteTeamMember(
        `${TEAM_MEMBER_URL}${deleteId}`,
      ).unwrap();
      handleResponse({ res: response, onSuccess: () => {} });
    } catch (error) {
      handleError({ error });
    } finally {
      setOpen(false);
    }
  };

  const pagination = {
    page: allTeamMembers?.data?.page,
    limit: allTeamMembers?.data?.limit,
    total: allTeamMembers?.data?.total,
    totalPages: allTeamMembers?.data?.totalPages,
  };

  const tableHeaders = [
    "Name",
    "Designation",
    "Status",
    (accessList.includes("edit") || accessList.includes("delete")) && "Actions",
  ].filter(Boolean);

  const tableData =
    success && allTeamMembers?.data?.data
      ? allTeamMembers.data.data.map(
          ({ id, name, designation, sortOrder, isActive }) => [
            sortOrder,
            id,
            name,
            designation,

            isActive ? "Active" : "Inactive",
            <div
              key={id}
              className="flex items-center justify-center cursor-pointer gap-[0.5rem]"
            >
              {accessList.includes("edit") && (
                <MdEditSquare
                  size={18}
                  className="text-primaryColor"
                  onClick={() => handleNewTeamMember(id)}
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

  const handleOrderChange = async (items) => {
    try {
      const response = await updateTeamMemberOrder({
        url: `${TEAM_MEMBER_URL}order`,
        body: items.map(({ id, order }) => ({
          id,
          sortOrder: order,
        })),
      }).unwrap();
      handleResponse({ res: response, onSuccess: () => refetch() });
    } catch (error) {
      handleError({ error });
    }
  };

  return (
    <>
      <PageTitle title="Team Member" />
      <PageHeader
        hasAddButton={accessList.includes("add")}
        newButtonText="Add New Team Member"
        handleNewButton={() => handleNewTeamMember(null)}
        handleReloadButton={() => refetch()}
        hasSubText
        subText="Manage public team members"
      />
      {accessList.includes("view") ? (
        <DraggableTable
          headers={tableHeaders}
          tableData={tableData}
          onOrderChange={handleOrderChange}
          pagination={pagination}
          handlePagination={handlePagination}
          orderOffset={((pagination.page || 1) - 1) * (pagination.limit || 10)}
        />
      ) : (
        <p>You don't have Permission to view this table</p>
      )}
    </>
  );
}
