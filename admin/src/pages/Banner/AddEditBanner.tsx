import Input from "@/components/Input";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { BannerSchema } from "./schema";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import { useSingleImageHandler } from "@/hooks/useImageHandler";
import MediaComponent from "@/components/MediaComponent";
import TextArea from "@/components/TextArea";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { useEffect } from "react";
import { BANNER_LIST_ROUTE } from "@/routes/routeNames";
import PageTitle from "@/components/PageTitle";
import { useGetApiQuery, useUpdateApiMutation } from "@/redux/services/crudApi";
import ImageInputUIComponent from "@/components/ImageInputUIComponent";
import { BANNER_URL } from "@/constants/apiUrlConstants";

type BannerFormType = z.infer<typeof BannerSchema>;

export default function AddEditBanner() {
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
    formState: { errors, isSubmitting },
  } = useForm<BannerFormType>({
    resolver: zodResolver(BannerSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "bannerItems",
  });

  const [updateBanner, { isLoading: updatingBanner }] = useUpdateApiMutation();
  const {
    data: bannerData,
    isSuccess: success,
    isLoading: loading,
  } = useGetApiQuery(`${BANNER_URL}${id}`, {
    skip: !isEditMode,
  });

  useEffect(() => {
    if (bannerData && bannerData?.data) {
      reset(bannerData?.data);
    }
  }, [bannerData]);

  const handleAddNewButton = (event: React.FormEvent) => {
    event.preventDefault();
    append({
      image: "",
      type: "image",
      caption: "",
      subTitle: "",
      title: "",
      overlayType: "linear",
      overlayColor: "#00152f",
      overlayOpacity: 0.45,
      overlayDirection: "to right",
    });
  };

  const onSubmit = async (data: BannerFormType) => {
    const body = { ...data };
    try {
      const response = await updateBanner({
        url: `${BANNER_URL}${bannerData?.data?.id}`,
        body,
      }).unwrap();

      handleResponse({
        res: response,
        onSuccess: () => {
          navigate(BANNER_LIST_ROUTE);
        },
      });
    } catch (error) {
      handleError({ error, setError });
    }
  };

  return (
    <>
      <PageTitle title={id ? "Edit Banner" : "Add Banner"} />
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Banner Name"
          {...register("name")}
          className={`w-1/2`}
          disabled={true}
          error={errors?.name?.message}
        />
        {/* <Input
          label="Video Url"
          {...register("video_url")}
          className={`w-1/2`}
          error={errors?.video_url?.message}
        /> */}
        <div className="floating-style-container">
          <div className="floating-input-container">
            <p className="input-title">Add Slides</p>
            <button
              type="button"
              className="text-primaryColor"
              onClick={(event) => handleAddNewButton(event)}
            >
              Add Slides
            </button>
          </div>
          <div className="py-[1rem] px-[2rem]">
            {fields.map((field, index) => (
              <SlidesInputComponent
                getValues={getValues}
                setValue={setValue}
                key={field.id}
                title={`${index + 1}. Slide ${index + 1}`}
                index={index}
                remove={remove}
                control={control}
                errors={errors}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-start">
          <Button type="submit" className="submit-button w-[5rem]">
            {" "}
            <div className="flex justify-center items-center gap-[0.5rem] text-white ">
              Submit
            </div>
          </Button>
        </div>
      </form>
    </>
  );
}

function SlidesInputComponent({
  getValues,
  setValue,
  title,
  index,
  remove,
  control,
  errors,
}) {
  const {
    imageUrl,
    handleConfirmImage,
    isImageModelOpen,
    setIsImageModelOpen,
  } = useSingleImageHandler(setValue, getValues, `bannerItems.${index}.image`);

  const handleRemoveButton = (event: React.FormEvent) => {
    event.preventDefault();
    remove(index);
  };

  return (
    <div className="floating-style-container">
      <div className="floating-input-container">
        <p className="input-title">{title}</p>
        <button
          type="button"
          className="text-red-500"
          onClick={handleRemoveButton}
        >
          Remove
        </button>
      </div>
      <div className="py-[1rem] px-[2rem] grid grid-cols-1 md:grid-cols-2">
        <div className="space-y-[1rem] ">
          <div className="relative flex flex-col items-start w-[20rem] ">
            <label className="input-label">
              Media <span className="text-red-500">*</span>
            </label>
            <MediaComponent
              title={
                <ImageInputUIComponent error="" type="large" image={imageUrl} />
              }
              isMultiSelect={false}
              handleConfirmImage={() =>
                handleConfirmImage(`bannerItems.${index}.image`)
              }
              open={isImageModelOpen}
              setOpen={setIsImageModelOpen}
              acceptFiles="image/*,video/*"
            />
          </div>
          <Controller
            name={`bannerItems.${index}.caption`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Caption"
                className="w-full md:w-1/2"
                placeholder="Enter Caption"
                error={errors.bannerItems?.[index]?.caption?.message}
              />
            )}
          />
        </div>
        <div className="space-y-[1rem]">
          <Controller
            name={`bannerItems.${index}.title`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Title"
                placeholder="Enter title"
                error={errors.bannerItems?.[index]?.title?.message}
              />
            )}
          />
          <Controller
            name={`bannerItems.${index}.subTitle`}
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                label="Sub Title"
                placeholder="Enter sub Title"
                error={errors.bannerItems?.[index]?.subTitle?.message}
              />
            )}
          />
          <div className="flex flex-col gap-4">
            <div className="flex w-full gap-4">
              <Controller
                name={`bannerItems.${index}.primaryButton`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Primary button"
                    placeholder="Enter title"
                    error={errors.bannerItems?.[index]?.title?.message}
                    className="w-full"
                  />
                )}
              />
              <Controller
                name={`bannerItems.${index}.primaryButtonUrl`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Primary button url"
                    placeholder="Enter title"
                    error={errors.bannerItems?.[index]?.title?.message}
                    className="w-full"
                  />
                )}
              />
            </div>
            <div className="flex w-full gap-4">
              <Controller
                name={`bannerItems.${index}.secondaryButton`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Secondary button"
                    placeholder="Enter title"
                    error={errors.bannerItems?.[index]?.title?.message}
                    className="w-full"
                  />
                )}
              />
              <Controller
                name={`bannerItems.${index}.secondaryButtonUrl`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Secondary button url"
                    placeholder="Enter title"
                    error={errors.bannerItems?.[index]?.title?.message}
                    className="w-full"
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Controller
              name={`bannerItems.${index}.overlayType`}
              control={control}
              render={({ field }) => (
                <div className="input-container w-full">
                  <label className="input-label">Overlay Type</label>
                  <div className="input-wrapper">
                    <select
                      {...field}
                      value={field.value || "linear"}
                      className="input-field"
                    >
                      <option value="linear">Linear Gradient</option>
                      <option value="solid">Solid Background</option>
                    </select>
                  </div>
                  {errors.bannerItems?.[index]?.overlayType?.message && (
                    <span className="input-error">
                      {errors.bannerItems?.[index]?.overlayType?.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name={`bannerItems.${index}.overlayColor`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || "#00152f"}
                  type="color"
                  label="Overlay Color"
                  error={errors.bannerItems?.[index]?.overlayColor?.message}
                  className="w-full"
                />
              )}
            />
            <Controller
              name={`bannerItems.${index}.overlayOpacity`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value ?? 0.45}
                  onChange={(event) => field.onChange(event.target.value)}
                  type="number"
                  min={0}
                  max={1}
                  step={0.05}
                  label="Overlay Opacity"
                  error={errors.bannerItems?.[index]?.overlayOpacity?.message}
                  className="w-full"
                />
              )}
            />
            <Controller
              name={`bannerItems.${index}.overlayDirection`}
              control={control}
              render={({ field }) => (
                <div className="input-container w-full">
                  <label className="input-label">Overlay Direction</label>
                  <div className="input-wrapper">
                    <select
                      {...field}
                      value={field.value || "to right"}
                      className="input-field"
                    >
                      <option value="to right">Left to Right</option>
                      <option value="to left">Right to Left</option>
                      <option value="to bottom">Top to Bottom</option>
                      <option value="to top">Bottom to Top</option>
                    </select>
                  </div>
                  {errors.bannerItems?.[index]?.overlayDirection?.message && (
                    <span className="input-error">
                      {errors.bannerItems?.[index]?.overlayDirection?.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
