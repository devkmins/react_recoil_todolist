import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IForm, IToDo, categoryState, toDoState } from "../atoms";
import styled from "styled-components";

const Form = styled.form`
  width: 85%;
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 12fr;
`;

const Input = styled.input`
  background-color: #5c6fbe;
  color: white;
  border: none;

  &::placeholder {
    color: white;
  }
`;

const Button = styled.button`
  background-color: #5c6fbe;
  color: white;
  border: none;
  font-size: 30px;
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    const newToDo: IToDo = {
      text: toDo,
      id: Date.now(),
      category,
    };

    setToDos((oldToDos) => {
      const newToDos = [newToDo, ...oldToDos];
      localStorage.setItem("toDos", JSON.stringify(newToDos));

      return newToDos;
    });

    setValue("toDo", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Button>+</Button>
      <Input
        {...register("toDo", {
          required: "Please Write a To Do",
        })}
        placeholder="Write a to do"
      />
    </Form>
  );
}

export default CreateToDo;
