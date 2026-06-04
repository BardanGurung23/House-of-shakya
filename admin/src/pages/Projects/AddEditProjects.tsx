import Button from "@/components/Button";
import { MultipleImageInputUI } from "@/components/ImageInputUIComponent";
import Input from "@/components/Input";
import MediaComponent from "@/components/MediaComponent";
import PageTitle from "@/components/PageTitle";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import {
  PROJECT_CATEGORY_URL,
  PROJECTS_URL,
} from "@/constants/apiUrlConstants";
import useImageHandler from "@/hooks/useImageHandler";
import { useGetAllUserQuery } from "@/redux/services/authentication";
import {
  useCreateApiMutation,
  useGetApiQuery,
  useUpdateApiMutation,
} from "@/redux/services/crudApi";
import { PROJECTS_LIST_ROUTE } from "@/routes/routeNames";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectsFormType, ProjectsSchema } from "./schema";
import FloatingFormSectionWrapper from "@/components/FloatingFormSectionWrapper";
import CustomModal from "@/components/Modal/customModal";
import Loader from "@/components/Loader";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
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
import { GripVertical } from "lucide-react";
import * as MaterialIcons from "react-icons/md";

const sortByOrder = <T extends { sortOrder?: number | string | null }>(
  items: T[] = [],
) => {
  return [...items].sort(
    (a, b) => Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0),
  );
};

const SortableFieldRow = ({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className: string;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={className}
    >
      <button
        type="button"
        className="mb-2 flex h-10 w-10 items-center justify-center rounded border border-gray-200 bg-white text-gray-500 cursor-grab active:cursor-grabbing md:mb-0"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
      >
        <GripVertical size={18} />
      </button>
      {children}
    </div>
  );
};

export default function AddEditProjects() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [open, setOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number | null>(
    null,
  );
  const icons = Object.keys(MaterialIcons);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    setError,
    reset,
    formState: { errors },
  } = useForm<ProjectsFormType>({
    resolver: zodResolver(ProjectsSchema),
    defaultValues: {
      projectCategoryId: "",
      agentId: "",
      images: [],
      features: [],
      nearbyPlaces: [],
    },
  });

  const filteredIcons = icons.filter((icon) =>
    icon.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleIconSelect = (name: string) => {
    if (activeFeatureIndex === null) return;

    setValue(`features.${activeFeatureIndex}.icon`, name, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setOpen(false);
    setActiveFeatureIndex(null);
  };

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
    move: moveFeature,
  } = useFieldArray({
    control,
    name: "features",
  });

  const {
    fields: nearbyPlaceFields,
    append: appendNearbyPlace,
    remove: removeNearbyPlace,
    move: moveNearbyPlace,
  } = useFieldArray({
    control,
    name: "nearbyPlaces",
  });

  const {
    media,
    currentImageIndex,
    isImageModelOpen,
    setIsImageModalOpen,
    handleRemoveButton,
    handleConfirmImage,
    handleNextButton,
    handlePrevButton,
  } = useImageHandler(setValue, getValues, "images");

  const [createProjects] = useCreateApiMutation();
  const [updateProjects] = useUpdateApiMutation();
  const { data: projectsData } = useGetApiQuery(`${PROJECTS_URL}${id}`, {
    skip: !isEditMode,
  });
  const { data: projectCategoryData } = useGetApiQuery(
    `${PROJECT_CATEGORY_URL}list?limit=999`,
  );
  const { data: usersData } = useGetAllUserQuery({ page: 1, limit: 999 });

  useEffect(() => {
    if (projectsData?.data) {
      reset({
        ...projectsData.data,
        agentId: projectsData.data.agentId || "",
        projectCategoryId: projectsData.data.projectCategoryId || "",
        images:
          projectsData.data.images?.map(
            (image: { image: string }) => image.image,
          ) || [],
        features: sortByOrder(projectsData.data.features || []),
        nearbyPlaces: sortByOrder(projectsData.data.nearbyPlaces || []),
      });
    }
  }, [projectsData, reset]);

  const projectCategoryOptions = useMemo(() => {
    if (!projectCategoryData?.data?.data) return [];
    return projectCategoryData.data.data.map(
      (item: { id: number; name: string }) => ({
        value: item.id,
        label: item.name,
      }),
    );
  }, [projectCategoryData]);

  const agentOptions = useMemo(() => {
    if (!usersData?.data?.data) return [];
    return usersData.data.data.map(
      (item: {
        id: number;
        firstName?: string;
        lastName?: string;
        username?: string;
        email?: string;
      }) => {
        const fullName = [item.firstName, item.lastName]
          .filter(Boolean)
          .join(" ");

        return {
          value: item.id,
          label: fullName || item.username || item.email || `User ${item.id}`,
        };
      },
    );
  }, [usersData]);

  const onSubmit = async (data: ProjectsFormType) => {
    const emptyToNull = (value: unknown) => (value === "" ? null : value);
    const body = {
      ...data,
      projectCategoryId: data.projectCategoryId || null,
      agentId: data.agentId || null,
      price: emptyToNull(data.price),
      bedrooms: emptyToNull(data.bedrooms),
      bathrooms: emptyToNull(data.bathrooms),
      parking: emptyToNull(data.parking),
      yearBuilt: emptyToNull(data.yearBuilt),
      latitude: emptyToNull(data.latitude),
      longitude: emptyToNull(data.longitude),
      features: data.features?.map((feature, index) => ({
        ...feature,
        icon: feature.icon || null,
        sortOrder: index,
      })),
      nearbyPlaces: data.nearbyPlaces?.map((place, index) => ({
        ...place,
        type: place.type || null,
        distance: place.distance || null,
        sortOrder: index,
      })),
    };

    try {
      const response = isEditMode
        ? await updateProjects({
            url: `${PROJECTS_URL}${projectsData?.data?.id}`,
            body,
          }).unwrap()
        : await createProjects({
            url: PROJECTS_URL,
            body,
          }).unwrap();

      handleResponse({
        res: response,
        onSuccess: () => navigate(PROJECTS_LIST_ROUTE),
      });
    } catch (error) {
      handleError({ error, setError });
    }
  };

  const handleFeatureDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const oldIndex = featureFields.findIndex((field) => field.id === active.id);
    const newIndex = featureFields.findIndex((field) => field.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;
    moveFeature(oldIndex, newIndex);
  };

  const handleNearbyPlaceDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const oldIndex = nearbyPlaceFields.findIndex(
      (field) => field.id === active.id,
    );
    const newIndex = nearbyPlaceFields.findIndex(
      (field) => field.id === over.id,
    );

    if (oldIndex === -1 || newIndex === -1) return;
    moveNearbyPlace(oldIndex, newIndex);
  };

  return (
    <>
      <PageTitle title={id ? "Edit Project" : "Add Project"} isBack />
      <form
        className="form-container gap-[1rem] flex flex-col  "
        onSubmit={handleSubmit(onSubmit)}
      >
        <FloatingFormSectionWrapper title="Project Details">
          <div className="grid grid-cols-2 gap-5">
            <Input
              label="Name"
              isRequired
              {...register("name")}
              error={errors?.name?.message}
            />
            <Input
              label="Slug"
              {...register("slug")}
              error={errors?.slug?.message}
            />
            <Controller
              name="projectCategoryId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Project Category"
                  options={projectCategoryOptions}
                  error={errors?.projectCategoryId?.message}
                />
              )}
            />
            <Controller
              name="agentId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Agent"
                  options={agentOptions}
                  error={errors?.agentId?.message}
                />
              )}
            />
            <Input
              label="Type"
              isRequired
              {...register("type")}
              error={errors?.type?.message}
            />
            <Input
              label="Location"
              isRequired
              {...register("location")}
              error={errors?.location?.message}
            />
            <Input
              label="Address"
              {...register("address")}
              error={errors?.address?.message}
            />
            <Input
              label="Google Map URL"
              {...register("googleMapURL")}
              error={errors?.googleMapURL?.message}
            />
            <Input
              label="Price"
              type="number"
              step="0.01"
              {...register("price")}
              error={errors?.price?.message}
            />
            <Input
              label="Status"
              {...register("status")}
              error={errors?.status?.message}
            />
            <TextArea
              label="Description"
              isRequired
              {...register("description")}
              error={errors?.description?.message}
            />
            <TextArea
              label="Overview"
              {...register("overview")}
              error={errors?.overview?.message}
            />
          </div>
        </FloatingFormSectionWrapper>
        <FloatingFormSectionWrapper title="Amenities">
          <div className="grid grid-cols-2 gap-5">
            <Input
              label="Size"
              {...register("size")}
              error={errors?.size?.message}
            />
            <Input
              label="Bedrooms"
              type="number"
              {...register("bedrooms")}
              error={errors?.bedrooms?.message}
            />

            <Input
              label="Bathrooms"
              type="number"
              {...register("bathrooms")}
              error={errors?.bathrooms?.message}
            />
            <Input
              label="Parking"
              type="number"
              {...register("parking")}
              error={errors?.parking?.message}
            />
            <Input
              label="View"
              {...register("view")}
              error={errors?.view?.message}
            />
            <Input
              label="Year Built"
              type="number"
              {...register("yearBuilt")}
              error={errors?.yearBuilt?.message}
            />
            <Input
              label="Completion Date"
              {...register("completionDate")}
              error={errors?.completionDate?.message}
            />
            <Input
              label="Latitude"
              type="number"
              step="0.00000001"
              {...register("latitude")}
              error={errors?.latitude?.message}
            />
            <Input
              label="Longitude"
              type="number"
              step="0.00000001"
              {...register("longitude")}
              error={errors?.longitude?.message}
            />
          </div>
        </FloatingFormSectionWrapper>
        <FloatingFormSectionWrapper title="Media">
          <div className="flex flex-col items-start w-[20rem]">
            <label className="input-label text-start mb-[2px]">
              Project Media
            </label>
            <MediaComponent
              title={
                <MultipleImageInputUI
                  images={media}
                  imageIndex={currentImageIndex}
                />
              }
              isMultiSelect={true}
              handleConfirmImage={() => handleConfirmImage("images")}
              open={isImageModelOpen}
              setOpen={setIsImageModalOpen}
              acceptFiles="image/*,video/*"
            />
            <div className="mt-[1rem] flex w-full justify-between">
              <button
                type="button"
                className="px-[0.75rem] py-[0.5rem] rounded-[0.25rem] bg-primaryColor text-white"
                onClick={handlePrevButton}
              >
                Previous
              </button>
              <button
                type="button"
                className="px-[0.75rem] py-[0.5rem] rounded-[0.25rem] bg-primaryColor text-white"
                onClick={handleRemoveButton}
              >
                Remove
              </button>
              <button
                type="button"
                className="px-[0.75rem] py-[0.5rem] rounded-[0.25rem] bg-primaryColor text-white"
                onClick={handleNextButton}
              >
                Next
              </button>
            </div>
            {errors?.images && (
              <span className="text-red-500 text-sm">
                {errors.images.message}
              </span>
            )}
          </div>
        </FloatingFormSectionWrapper>
        <div className="md:col-span-2 border border-gray-200 rounded p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="font-medium">Features</p>
            <button
              type="button"
              className="px-3 py-2 rounded bg-primaryColor text-white"
              onClick={() =>
                appendFeature({
                  title: "",
                  icon: "",
                  sortOrder: featureFields.length,
                })
              }
            >
              Add Feature
            </button>
          </div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleFeatureDragEnd}
          >
            <SortableContext
              items={featureFields.map((field) => field.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {featureFields.map((field, index) => (
                  <SortableFieldRow
                    key={field.id}
                    id={field.id}
                    className="grid grid-cols-1 md:grid-cols-[2.5rem_1fr_1fr_auto] gap-3 items-end rounded border border-gray-100 bg-white p-3"
                  >
                    <Input
                      label="Title"
                      {...register(`features.${index}.title`)}
                      error={errors.features?.[index]?.title?.message}
                    />
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => {
                        setActiveFeatureIndex(index);
                        setOpen(true);
                      }}
                    >
                      <Input
                        label="Icon"
                        placeholder="Select icon"
                        type="text"
                        readOnly
                        className="cursor-pointer"
                        {...register(`features.${index}.icon`)}
                        error={errors.features?.[index]?.icon?.message}
                      />
                    </button>
                    <button
                      type="button"
                      className="px-3 py-2 rounded bg-red-500 text-white"
                      onClick={() => removeFeature(index)}
                    >
                      Remove
                    </button>
                  </SortableFieldRow>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <div className="md:col-span-2 border border-gray-200 rounded p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="font-medium">Nearby Places</p>
            <button
              type="button"
              className="px-3 py-2 rounded bg-primaryColor text-white"
              onClick={() =>
                appendNearbyPlace({
                  name: "",
                  type: "",
                  distance: "",
                  sortOrder: nearbyPlaceFields.length,
                })
              }
            >
              Add Nearby Place
            </button>
          </div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleNearbyPlaceDragEnd}
          >
            <SortableContext
              items={nearbyPlaceFields.map((field) => field.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {nearbyPlaceFields.map((field, index) => (
                  <SortableFieldRow
                    key={field.id}
                    id={field.id}
                    className="grid grid-cols-1 md:grid-cols-[2.5rem_1fr_1fr_1fr_auto] gap-3 items-end rounded border border-gray-100 bg-white p-3"
                  >
                    <Input
                      label="Name"
                      {...register(`nearbyPlaces.${index}.name`)}
                      error={errors.nearbyPlaces?.[index]?.name?.message}
                    />
                    <Input
                      label="Type"
                      {...register(`nearbyPlaces.${index}.type`)}
                      error={errors.nearbyPlaces?.[index]?.type?.message}
                    />
                    <Input
                      label="Distance"
                      {...register(`nearbyPlaces.${index}.distance`)}
                      error={errors.nearbyPlaces?.[index]?.distance?.message}
                    />
                    <button
                      type="button"
                      className="px-3 py-2 rounded bg-red-500 text-white"
                      onClick={() => removeNearbyPlace(index)}
                    >
                      Remove
                    </button>
                  </SortableFieldRow>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <div className="flex justify-start md:col-span-2">
          <Button type="submit" className="submit-button w-[5rem]">
            <div className="flex justify-center items-center gap-[0.5rem] text-white">
              Submit
            </div>
          </Button>
        </div>
      </form>
      <CustomModal
        open={open}
        setOpen={setOpen}
        title="Select Icons"
        contentStyle="w-[50%] h-[60%] overflow-y-auto"
      >
        <>
          <input
            type="text"
            placeholder="Search icons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 p-2 border rounded bg-white"
          />{" "}
          <div className="grid grid-cols-6 gap-6">
            {filteredIcons.map((each: string) => {
              const IconComponent = lazy(() =>
                import("react-icons/md").then((module) => ({
                  default: module[each as keyof typeof module],
                })),
              );
              return (
                <div
                  key={each}
                  className="flex cursor-pointer flex-col items-center overflow-hidden"
                  onClick={() => handleIconSelect(each)}
                >
                  <Suspense
                    fallback={
                      <div>
                        <Loader />
                      </div>
                    }
                  >
                    <IconComponent className="text-blue-700" size={50} />
                    <span className="text-secondary2">{each}</span>
                  </Suspense>
                </div>
              );
            })}
          </div>
        </>
      </CustomModal>
    </>
  );
}
