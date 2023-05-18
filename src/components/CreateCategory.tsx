import { useSetRecoilState } from "recoil";
import { ICategoryForm, customCategoryState } from "../atoms";
import { useForm } from "react-hook-form";

function CreateCategory() {
  const setCategories = useSetRecoilState(customCategoryState);
  const { register, handleSubmit, setValue } = useForm<ICategoryForm>();

  const handleValid = ({ category }: ICategoryForm) => {
    setCategories((prevCategories: ICategoryForm[]) => {
      const newCategory: ICategoryForm = {
        category: category,
      };
      const newCategories = [newCategory, ...prevCategories];
      localStorage.setItem("categories", JSON.stringify(newCategories));

      return newCategories;
    });

    setValue("category", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("category", {
          required: "Please write a new category",
        })}
        placeholder="Add a new category"></input>
      <button>Add</button>
    </form>
  );
}

export default CreateCategory;
