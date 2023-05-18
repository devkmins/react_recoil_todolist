import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IForm, IToDo, categoryState, toDoState } from "../atoms";

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
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please Write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
