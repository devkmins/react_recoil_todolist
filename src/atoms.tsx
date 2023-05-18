import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export interface ICategoryForm {
  category: string;
}

export interface IForm {
  toDo: string;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: localStorage.getItem("toDos")
    ? JSON.parse(localStorage.getItem("toDos") as string)
    : [],
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.DOING,
});

export const customCategoryState = atom<ICategoryForm[]>({
  key: "customCategory",
  default: localStorage.getItem("categories")
    ? JSON.parse(localStorage.getItem("categories") as string)
    : [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
