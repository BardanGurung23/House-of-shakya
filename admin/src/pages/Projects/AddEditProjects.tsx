import Button from "@/components/Button";
import ImageInputUIComponent from "@/components/ImageInputUIComponent";
import Input from "@/components/Input";
import MediaComponent from "@/components/MediaComponent";
import PageTitle from "@/components/PageTitle";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import {
  PROJECT_CATEGORY_URL,
  PROJECTS_URL,
} from "@/constants/apiUrlConstants";
import { useSingleImageHandler } from "@/hooks/useImageHandler";
import {
  useCreateApiMutation,
  useGetApiQuery,
  useUpdateApiMutation,
} from "@/redux/services/crudApi";
import { PROJECTS_LIST_ROUTE } from "@/routes/routeNames";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectsFormType, ProjectsSchema } from "./schema";

export default function AddEditProjects() {
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
  } = useForm<ProjectsFormType>({
    resolver: zodResolver(ProjectsSchema),
    defaultValues: {
      projectCategoryId: "",
      img: "",
    },
  });

  const {
    imageUrl,
    handleConfirmImage,
    isImageModelOpen,
    setIsImageModelOpen,
  } = useSingleImageHandler(setValue, getValues, "img");

  const [createProjects] = useCreateApiMutation();
  const [updateProjects] = useUpdateApiMutation();
  const { data: projectsData } = useGetApiQuery(`${PROJECTS_URL}${id}`, {
    skip: !isEditMode,
  });
  const { data: projectCategoryData } = useGetApiQuery(
    `${PROJECT_CATEGORY_URL}list?limit=999`,
  );

  useEffect(() => {
    if (projectsData?.data) {
      reset(projectsData.data);
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

  const onSubmit = async (data: ProjectsFormType) => {
    const body = {
      ...data,
      projectCategoryId: data.projectCategoryId || null,
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

  return (
    <>
      <PageTitle title={id ? "Edit Project" : "Add Project"} isBack />
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
        <TextArea
          label="Description"
          isRequired
          {...register("description")}
          error={errors?.description?.message}
        />
        <div className="flex flex-col items-start">
          <label className="input-label text-start mb-[2px]">
            Project Image
          </label>
          <MediaComponent
            title={
              <ImageInputUIComponent
                type="large"
                image={imageUrl}
                error={errors?.img?.message}
              />
            }
            isMultiSelect={false}
            open={isImageModelOpen}
            setOpen={setIsImageModelOpen}
            handleConfirmImage={handleConfirmImage}
          />
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
