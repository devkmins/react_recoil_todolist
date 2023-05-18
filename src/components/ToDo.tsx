import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  Categories,
  IToDo,
  ICategoryForm,
  customCategoryState,
  toDoState,
} from "../atoms";

function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const customCategories = useRecoilValue(customCategoryState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      const newToDos = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];

      localStorage.setItem("toDos", JSON.stringify(newToDos));

      return newToDos;
    });
  };

  const removeToDo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((prevTodos) => {
      const updateToDos = prevTodos.filter((item) => item.id !== id);
      localStorage.setItem("toDos", JSON.stringify(updateToDos));

      return updateToDos;
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      {customCategories
        ? customCategories.map((customCategory: ICategoryForm) => {
            if (customCategory.category !== category) {
              return (
                <button name={customCategory.category} onClick={onClick}>
                  {customCategory.category}
                </button>
              );
            }
          })
        : ""}
      {category === Categories.DONE && (
        <button onClick={removeToDo}>Remove</button>
      )}
    </li>
  );
}

export default ToDo;
