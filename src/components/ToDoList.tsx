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
import styled from "styled-components";

const Container = styled.div`
  background-color: #7386d8;
`;

const HeaderContainer = styled.div`
  padding: 10px 0px 5px 0px;
  border-bottom: 2px solid white;
`;

const Header = styled.h1`
  font-size: 48px;
  font-weight: 700;
  padding-left: 10px;
  color: white;
`;

const MainContainer = styled.main`
  display: grid;
  grid-template-columns: 1fr 3fr;
  height: 100vh;
  margin: 0;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 2px solid white;
`;

const Select = styled.select`
  margin-top: 10px;
  width: 95%;
  height: 50px;
  font-size: 16px;
  background-color: white;
`;

const RemoveBtn = styled.button`
  width: 95%;
  height: 45px;
  background-color: white;
  border: none;
`;

const ToDoContainer = styled.div`
  display: grid;
  grid-template-rows: 75% 25%;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
    <Container>
      <HeaderContainer>
        <Header>{category}</Header>
      </HeaderContainer>
      <MainContainer>
        <CategoryContainer>
          <Select value={category} onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
            {customCategory
              ? customCategory.map((customCate: ICategoryForm) => (
                  <option value={customCate.category}>
                    {customCate.category}
                  </option>
                ))
              : []}
          </Select>
          <CreateCategory />
          <RemoveBtn onClick={removeAllCategories}>Remove All</RemoveBtn>
        </CategoryContainer>
        <ToDoContainer>
          <TopContainer>
            {toDos?.map((toDo) => (
              <ToDo key={toDo.id} {...toDo}></ToDo>
            ))}
          </TopContainer>
          <BottomContainer>
            <CreateToDo />
          </BottomContainer>
        </ToDoContainer>
      </MainContainer>
    </Container>
  );
}

export default ToDoList;
