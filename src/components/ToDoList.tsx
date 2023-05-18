import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import CreateToDo from "./CreateToDo";
import {
  Categories,
  ICategoryForm,
  categoryState,
  customCategoryState,
  toDoSelector,
  toDoState,
} from "../atoms";
import ToDo from "./ToDo";
import CreateCategory from "./CreateCategory";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const setToDos = useSetRecoilState(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [customCategory, setCustomCategory] =
    useRecoilState(customCategoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const removeAllCategories = () => {
    setCustomCategory([]);
    setToDos([]);
    localStorage.setItem("categories", [] as never);
    localStorage.setItem("toDos", [] as never);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {customCategory
          ? customCategory.map((customCate: ICategoryForm) => (
              <option value={customCate.category}>{customCate.category}</option>
            ))
          : []}
      </select>
      <CreateCategory />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo}></ToDo>
      ))}
      <button onClick={removeAllCategories}>Remove All</button>
    </div>
  );
}

export default ToDoList;
