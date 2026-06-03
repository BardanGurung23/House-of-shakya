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
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PropertyFormType, PropertySchema } from "./schema";

export default function AddEditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

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
    },
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

  useEffect(() => {
    if (propertyData?.data) {
      reset({
        ...propertyData.data,
        images:
          propertyData.data.images?.map(
            (image: { image: string }) => image.image,
          ) || [],
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

  const onSubmit = async (data: PropertyFormType) => {
    const body = {
      ...data,
      propertyCategoryId: data.propertyCategoryId || null,
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

  return (
    <>
      <PageTitle title={id ? "Edit Property" : "Add Property"} isBack />
      <form
        className="form-container grid grid-cols-1 md:grid-cols-2 gap-[1rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          label="Price"
          type="number"
          isRequired
          {...register("price")}
          error={errors?.price?.message}
        />
        <Input
          label="Beds"
          type="number"
          {...register("beds")}
          error={errors?.beds?.message}
        />
        <Input
          label="Bath"
          type="number"
          {...register("bath")}
          error={errors?.bath?.message}
        />
        <Input
          label="Anna"
          type="number"
          step="0.01"
          {...register("anna")}
          error={errors?.anna?.message}
        />

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

        <div className="flex justify-start md:col-span-2">
          <Button type="submit" className="submit-button w-[5rem]">
            <div className="flex justify-center items-center gap-[0.5rem] text-white">
              Submit
            </div>
          </Button>
        </div>
      </form>
    </>
  );
}
