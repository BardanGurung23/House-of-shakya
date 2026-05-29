import Button from "@/components/Button";
import ImageInputUIComponent from "@/components/ImageInputUIComponent";
import Input from "@/components/Input";
import MediaComponent from "@/components/MediaComponent";
import PageTitle from "@/components/PageTitle";
import TextArea from "@/components/TextArea";
import { PROJECTS_URL } from "@/constants/apiUrlConstants";
import { useSingleImageHandler } from "@/hooks/useImageHandler";
import {
  useCreateApiMutation,
  useGetApiQuery,
  useUpdateApiMutation,
} from "@/redux/services/crudApi";
import { PROJECTS_LIST_ROUTE } from "@/routes/routeNames";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectsFormType, ProjectsSchema } from "./schema";

export default function AddEditProjects() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    reset,
    formState: { errors },
  } = useForm<ProjectsFormType>({
    resolver: zodResolver(ProjectsSchema),
    defaultValues: {
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

  useEffect(() => {
    if (projectsData?.data) {
      reset(projectsData.data);
    }
  }, [projectsData, reset]);

  const onSubmit = async (data: ProjectsFormType) => {
    try {
      const response = isEditMode
        ? await updateProjects({
            url: `${PROJECTS_URL}${projectsData?.data?.id}`,
            body: data,
          }).unwrap()
        : await createProjects({
            url: PROJECTS_URL,
            body: data,
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
