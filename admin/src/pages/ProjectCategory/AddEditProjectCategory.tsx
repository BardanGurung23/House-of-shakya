import Button from "@/components/Button";
import Input from "@/components/Input";
import PageTitle from "@/components/PageTitle";
import { PROJECT_CATEGORY_URL } from "@/constants/apiUrlConstants";
import {
  useCreateApiMutation,
  useGetApiQuery,
  useUpdateApiMutation,
} from "@/redux/services/crudApi";
import { PROJECT_CATEGORY_LIST_ROUTE } from "@/routes/routeNames";
import { handleError, handleResponse } from "@/utils/responseHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectCategoryFormType, ProjectCategorySchema } from "./schema";

export default function AddEditProjectCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ProjectCategoryFormType>({
    resolver: zodResolver(ProjectCategorySchema),
  });

  const [createProjectCategory] = useCreateApiMutation();
  const [updateProjectCategory] = useUpdateApiMutation();
  const { data: projectCategoryData } = useGetApiQuery(
    `${PROJECT_CATEGORY_URL}${id}`,
    {
      skip: !isEditMode,
    },
  );

  useEffect(() => {
    if (projectCategoryData?.data) {
      reset(projectCategoryData.data);
    }
  }, [projectCategoryData, reset]);

  const onSubmit = async (data: ProjectCategoryFormType) => {
    try {
      const response = isEditMode
        ? await updateProjectCategory({
            url: `${PROJECT_CATEGORY_URL}${projectCategoryData?.data?.id}`,
            body: data,
          }).unwrap()
        : await createProjectCategory({
            url: PROJECT_CATEGORY_URL,
            body: data,
          }).unwrap();

      handleResponse({
        res: response,
        onSuccess: () => navigate(PROJECT_CATEGORY_LIST_ROUTE),
      });
    } catch (error) {
      handleError({ error, setError });
    }
  };

  return (
    <>
      <PageTitle
        title={id ? "Edit Project Category" : "Add Project Category"}
        isBack
      />
      <form
        className="form-container space-y-[1rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Name"
          isRequired
          {...register("name")}
          className="w-full md:w-1/2"
          error={errors?.name?.message}
        />

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
