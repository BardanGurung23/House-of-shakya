import { PaginationType } from "@/types/commonTypes";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type DraggableRow = [number, number, ...ReactNode[]];
type OrderPayload = { id: number; order: number };

type DraggableTableProps = {
  headers: ReactNode[];
  tableData: DraggableRow[];
  onOrderChange: (items: OrderPayload[]) => Promise<void> | void;
  pagination?: PaginationType;
  handlePagination?: (pagination: PaginationType) => void;
  orderOffset?: number;
};

export default function DraggableTable({
  headers,
  tableData,
  onOrderChange,
  pagination,
  handlePagination,
  orderOffset = 0,
}: DraggableTableProps) {
  const [updatedTableData, setUpdatedTableData] =
    useState<DraggableRow[]>(tableData);

  useEffect(() => {
    setUpdatedTableData(tableData);
  }, [tableData]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setUpdatedTableData((prevData) => {
      const oldIndex = prevData.findIndex((row) => row[1] === active.id);
      const newIndex = prevData.findIndex((row) => row[1] === over.id);

      if (oldIndex === -1 || newIndex === -1) return prevData;

      const newData = [...prevData];
      const [movedItem] = newData.splice(oldIndex, 1);
      newData.splice(newIndex, 0, movedItem);

      const updatedData = newData.map((row, index) => [
        orderOffset + index,
        ...row.slice(1),
      ]) as DraggableRow[];

      updateOrder(updatedData);
      return updatedData;
    });
  };

  const updateOrder = async (updatedData: DraggableRow[]) => {
    const body = updatedData.map((each) => {
      return { id: each[1], order: each[0] };
    });

    await onOrderChange(body);
  };

  const hasPagination = pagination && handlePagination;

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <Table headers={headers} data={updatedTableData} />
      {hasPagination && (
        <div className="mt-[6px] flex justify-between">
          <div>
            <p className="font-[500] text-[0.875rem] text-[#2F2B3D] bg-white px-[0.75rem] py-[0.5rem]">
              Show:{" "}
              <select
                name="pagination"
                id="pagination"
                value={pagination.limit}
                className="bg-white"
                onChange={(e) =>
                  handlePagination({ limit: Number(e.target.value) })
                }
              >
                {[10, 25, 50, 100].map((each) => (
                  <option key={each} value={each}>
                    {each}
                  </option>
                ))}
              </select>{" "}
              entries
            </p>
          </div>
          <div className="flex gap-[1rem]">
            <button
              className={
                pagination.page === 1 ? "text-gray-400 cursor-not-allowed" : ""
              }
              disabled={pagination.page === 1}
              onClick={() => handlePagination({ page: pagination.page - 1 })}
            >
              <FaAngleLeft size={24} />
            </button>
            <button
              className={
                pagination.page === pagination.totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : ""
              }
              disabled={pagination.page === pagination.totalPages}
              onClick={() => handlePagination({ page: pagination.page + 1 })}
            >
              <FaAngleRight size={24} />
            </button>
          </div>
          <div className="flex gap-[0.875rem]">
            <p className="font-[500] text-[0.875rem] text-[#2F2B3D] bg-white px-[0.75rem] py-[0.5rem]">
              Page {pagination.page} of {pagination.totalPages}
            </p>
            <p className="font-[500] text-[0.875rem] text-[#2F2B3D] bg-white px-[0.75rem] py-[0.5rem]">
              Total Data: {pagination.total}
            </p>
          </div>
        </div>
      )}
    </DndContext>
  );
}

function Table({ headers, data }: { headers: ReactNode[]; data: DraggableRow[] }) {
  const sortedData = useMemo(
    () => [...data].sort((a, b) => Number(a[0]) - Number(b[0])),
    [data],
  );

  const columnWidth = `${100 / headers.length}%`;

  return (
    <div>
      <div className="flex w-full justify-between bg-primaryColor px-4 py-2 text-center text-white font-[400] text-[1.125rem] whitespace-nowrap">
        {headers.map((header, index) => (
          <p key={index} style={{ width: columnWidth }}>
            {header}
          </p>
        ))}
      </div>
      <div className="py-2 text-center font-[400] text-[1.125rem]">
        <SortableContext
          items={sortedData.map((row) => row[1])}
          strategy={verticalListSortingStrategy}
        >
          {sortedData.length > 0 ? (
            sortedData.map((each) => (
              <TableContent
                key={each[1]}
                id={each[1]}
                data={each}
                columnWidth={columnWidth}
              />
            ))
          ) : (
            <div className="bg-white py-2">No data available</div>
          )}
        </SortableContext>
      </div>
    </div>
  );
}

function TableContent({
  id,
  data,
  columnWidth,
}: {
  id: number;
  data: DraggableRow;
  columnWidth: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex w-full justify-between py-[0.25rem]"
    >
      {data.slice(2).map((item, index) => (
        <div
          key={index}
          style={{ width: columnWidth }}
          {...(index === 0 ? attributes : {})}
          {...(index === 0 ? listeners : {})}
          className={index === 0 ? "cursor-grab active:cursor-grabbing" : ""}
        >
          {React.isValidElement(item) ? item : `${item}`}
        </div>
      ))}
    </div>
  );
}
