import { useSetRecoilState } from "recoil";
import { ICategoryForm, customCategoryState } from "../atoms";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Form = styled.form`
  display: grid;
  grid-template-columns: 4fr 1fr;
  width: 95%;
  margin: 5px;
`;

const Input = styled.input`
  height: 50px;
  background-color: white;
  border: none;
`;

const Button = styled.button`
  height: 50px;
  background-color: white;
  border: none;
  border-left: 2px solid #5c6fbe;
`;

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
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("category", {
          required: "Please write a new category",
        })}
        placeholder="Add a new category"
      />
      <Button>+</Button>
    </Form>
  );
}

export default CreateCategory;
