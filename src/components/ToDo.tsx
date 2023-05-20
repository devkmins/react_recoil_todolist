import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  Categories,
  IToDo,
  ICategoryForm,
  customCategoryState,
  toDoState,
} from "../atoms";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  width: 50%;
  height: 50px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: white;
  margin: 15px 10px 0px 10px;
`;

const SpanContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 5px;
`;

const Span = styled.span`
  display: flex;
  justify-content: flex-start;
  font-size: 18px;
  font-weight: 500;
  color: #2f3640;
  margin-left: 5px;
`;

const Button = styled.button``;

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
    <Container>
      <SpanContainer>
        <img
          width="15"
          height="15"
          src="https://img.icons8.com/ios-filled/50/000000/circled.png"
          alt="circled"
        />
        <Span>{text}</Span>
      </SpanContainer>
      <BtnContainer>
        {category !== Categories.TO_DO && (
          <Button name={Categories.TO_DO} onClick={onClick}>
            To Do
          </Button>
        )}
        {category !== Categories.DOING && (
          <Button name={Categories.DOING} onClick={onClick}>
            Doing
          </Button>
        )}
        {category !== Categories.DONE && (
          <Button name={Categories.DONE} onClick={onClick}>
            Done
          </Button>
        )}
        {customCategories
          ? customCategories.map((customCategory: ICategoryForm) => {
              if (customCategory.category !== category) {
                return (
                  <Button name={customCategory.category} onClick={onClick}>
                    {customCategory.category}
                  </Button>
                );
              }

              return null;
            })
          : ""}
        {
          <Button onClick={removeToDo}>
            <img
              width="12"
              height="12"
              src="https://img.icons8.com/material-outlined/24/waste.png"
              alt="waste"
            />
          </Button>
        }
      </BtnContainer>
    </Container>
  );
}

export default ToDo;
