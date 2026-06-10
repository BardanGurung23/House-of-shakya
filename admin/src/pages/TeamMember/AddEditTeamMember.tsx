import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import ImageInputUIComponent from "@/components/ImageInputUIComponent";
import Input from "@/components/Input";
import MediaComponent from "@/components/MediaComponent";
import PageTitle from "@/components/PageTitle";
import TextArea from "@/components/TextArea";
import { TEAM_MEMBER_URL } from "@/constants/apiUrlConstants";
import { useSingleImageHandler } from "@/hooks/useImageHandler";
import {
  useCreateApiMutation,
  useGetApiQuery,
  useUpdateApiMutation,
} from "@/redux/services/crudApi";
import { TEAM_MEMBER_LIST_ROUTE } from "@/routes/routeNames";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { TeamMemberFormType, TeamMemberSchema } from "./schema";

export default function AddEditTeamMember() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<TeamMemberFormType>({
    resolver: zodResolver(TeamMemberSchema),
    defaultValues: {
      name: "",
      designation: "",

      bio: "",
      image: "",
      email: "",
      phone: "",
      linkedinUrl: "",
      sortOrder: 0,
      isFeatured: false,
      isActive: true,
    },
  });

  const {
    imageUrl,
    handleConfirmImage,
    isImageModelOpen,
    setIsImageModelOpen,
  } = useSingleImageHandler(setValue, getValues, "image");

  const [createTeamMember] = useCreateApiMutation();
  const [updateTeamMember] = useUpdateApiMutation();
  const { data: teamMemberData } = useGetApiQuery(`${TEAM_MEMBER_URL}${id}`, {
    skip: !isEditMode,
  });

  useEffect(() => {
    if (teamMemberData?.data) {
      reset(teamMemberData.data);
    }
  }, [teamMemberData, reset]);

  const onSubmit = async (data: TeamMemberFormType) => {
    try {
      const response = isEditMode
        ? await updateTeamMember({
            url: `${TEAM_MEMBER_URL}${teamMemberData?.data?.id}`,
            body: data,
          }).unwrap()
        : await createTeamMember({
            url: TEAM_MEMBER_URL,
            body: data,
          }).unwrap();

      handleResponse({
        res: response,
        onSuccess: () => navigate(TEAM_MEMBER_LIST_ROUTE),
      });
    } catch (error) {
      handleError({ error, setError });
    }
  };

  return (
    <>
      <PageTitle title={id ? "Edit Team Member" : "Add Team Member"} isBack />
      <form
        className="form-container space-y-[1rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
          <Input
            label="Name"
            isRequired
            {...register("name")}
            error={errors?.name?.message}
          />
          <Input
            label="Designation"
            isRequired
            {...register("designation")}
            error={errors?.designation?.message}
          />
          <Input
            label="Email"
            {...register("email")}
            error={errors?.email?.message}
          />
          <Input
            label="Phone"
            {...register("phone")}
            error={errors?.phone?.message}
          />
          <Input
            label="LinkedIn URL"
            {...register("linkedinUrl")}
            error={errors?.linkedinUrl?.message}
          />
          <Input
            label="Sort Order"
            type="number"
            {...register("sortOrder")}
            error={errors?.sortOrder?.message}
          />
        </div>

        <div className="relative flex flex-col items-start w-[20rem]">
          <label className="input-label">Image</label>
          <MediaComponent
            title={
              <ImageInputUIComponent
                error={errors?.image?.message}
                type="large"
                image={imageUrl}
              />
            }
            isMultiSelect={false}
            handleConfirmImage={handleConfirmImage}
            open={isImageModelOpen}
            setOpen={setIsImageModelOpen}
            acceptFiles="image/*"
          />
        </div>

        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              value={field.value || ""}
              label="Bio"
              error={errors?.bio?.message}
            />
          )}
        />

        <div className="flex flex-wrap gap-[1.5rem]">
          <Controller
            name="isFeatured"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="Featured"
                checked={!!field.value}
                onChange={(event) => field.onChange(event.target.checked)}
              />
            )}
          />
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="Active"
                checked={!!field.value}
                onChange={(event) => field.onChange(event.target.checked)}
              />
            )}
          />
        </div>

        <div className="flex justify-start">
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
