import Button from "@/components/Button";
import ImageInputUIComponent, {
  MultipleImageInputUI,
} from "@/components/ImageInputUIComponent";
import Input from "@/components/Input";
import MediaComponent from "@/components/MediaComponent";
import PageTitle from "@/components/PageTitle";
import Select from "@/components/Select";
import useImageHandler from "@/hooks/useImageHandler";
import {
  PROPERTY_CATEGORY_URL,
  PROPERTY_URL,
} from "@/constants/apiUrlConstants";
import {
  useCreateApiMutation,
  useGetApiQuery,
  useUpdateApiMutation,
} from "@/redux/services/crudApi";
import { PROPERTY_LIST_ROUTE } from "@/routes/routeNames";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PropertyFormType, PropertySchema } from "./schema";
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
import TextArea from "@/components/TextArea";
import { useGetAllUserQuery } from "@/redux/services/authentication";

const sortByOrder = <T extends { sortOrder?: number | string | null }>(
  items: T[] = [],
) => {
  return [...items].sort(
    (a, b) => Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0),
  );
};

const propertyStatusOptions = [
  { value: "ready_to_move", label: "Ready To Move" },
  { value: "new_launch", label: "New Launch" },
  { value: "pre_launch", label: "Pre Launch" },
  { value: "on_going", label: "On Going" },
];

const SortableFieldRow = ({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
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

export default function AddEditProperty() {
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
  } = useForm<PropertyFormType>({
    resolver: zodResolver(PropertySchema),
    defaultValues: {
      propertyCategoryId: "",
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

  const [createProperty] = useCreateApiMutation();
  const [updateProperty] = useUpdateApiMutation();
  const { data: propertyData } = useGetApiQuery(`${PROPERTY_URL}${id}`, {
    skip: !isEditMode,
  });
  const { data: propertyCategoryData } = useGetApiQuery(
    `${PROPERTY_CATEGORY_URL}list?limit=999`,
  );

  const { data: usersData } = useGetAllUserQuery({ page: 1, limit: 999 });
  useEffect(() => {
    if (propertyData?.data) {
      reset({
        ...propertyData.data,
        images:
          propertyData.data.images?.map(
            (image: { image: string }) => image.image,
          ) || [],
        features: sortByOrder(propertyData.data.features || []),
        nearbyPlaces: sortByOrder(propertyData.data.nearbyPlaces || []),
      });
    }
  }, [propertyData, reset]);

  const propertyCategoryOptions = useMemo(() => {
    if (!propertyCategoryData?.data?.data) return [];
    return propertyCategoryData.data.data.map(
      (item: { id: number; name: string }) => ({
        value: item.id,
        label: item.name,
      }),
    );
  }, [propertyCategoryData]);

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

  const onSubmit = async (data: PropertyFormType) => {
    const emptyToNull = (value: unknown) => (value === "" ? null : value);
    const body = {
      ...data,
      propertyCategoryId: data.propertyCategoryId || null,
      beds: emptyToNull(data.beds),
      bath: emptyToNull(data.bath),
      anna: emptyToNull(data.anna),
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
        ? await updateProperty({
            url: `${PROPERTY_URL}${propertyData?.data?.id}`,
            body,
          }).unwrap()
        : await createProperty({
            url: PROPERTY_URL,
            body,
          }).unwrap();

      handleResponse({
        res: response,
        onSuccess: () => navigate(PROPERTY_LIST_ROUTE),
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
      <PageTitle title={id ? "Edit Property" : "Add Property"} isBack />
      <form
        className="form-container flex flex-col gap-[1rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FloatingFormSectionWrapper title="Property Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
            <Input
              label="Name"
              isRequired
              {...register("name")}
              error={errors?.name?.message}
            />
            <Controller
              name="propertyCategoryId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Property Category"
                  options={propertyCategoryOptions}
                  error={errors?.propertyCategoryId?.message}
                />
              )}
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
              isRequired
              {...register("price")}
              error={errors?.price?.message}
            />

            <Input
              label="Anna"
              type="number"
              step="0.01"
              {...register("anna")}
              error={errors?.anna?.message}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status"
                  options={propertyStatusOptions}
                  error={errors?.status?.message}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
            <Input
              label="Bedroom"
              type="number"
              {...register("beds")}
              error={errors?.beds?.message}
            />
            <Input
              label="Bathroom"
              type="number"
              {...register("bath")}
              error={errors?.bath?.message}
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
              Property Media
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

        <div className="border border-gray-200 rounded p-4">
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

        <div className="border border-gray-200 rounded p-4">
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

        <div className="flex justify-start">
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
