import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setCurrentDishes, setSelected } from "../features/globalSlice";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 60px;
  overflow-y: hidden;
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #efefef;
    border-radius: 30px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  color: ${(p) => p.theme.textSecondary};
  width: 250px;
  height: 100%;
  font-size: 1.5ch;
  font-weight: 500;
  padding-bottom: 10px;
  &.active {
    color: ${(p) => p.theme.textWarning};
  }
  &.active::after {
    content: "";
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    bottom: -2px;
    border-bottom: 2px solid ${(p) => p.theme.textWarning};
  }
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`;
const Main = styled.div`
  display: flex;
  flex-shrink: 0;
  height: 100%;
  min-width: 100%;
  border-bottom: 2px solid ${(p) => p.theme.textSecondary};
`;

function CategoryBar() {
  const { hotelData, selected } = useSelector((store) => store.global);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selected) dispatch(setSelected(hotelData[0]?.menu_category_id));
  }, [hotelData]);
  useEffect(() => {
    dispatch(setCurrentDishes(selected));
  }, [selected]);

  return (
    <Container>
      <Main>
        {hotelData?.map((item) => {
          return (
            <TitleContainer
              className={selected === item.menu_category_id && "active"}
              key={item.menu_category_id}
              onClick={() =>
                selected !== item.menu_category_id &&
                dispatch(setSelected(item.menu_category_id))
              }
            >
              <p>{item.menu_category}</p>
            </TitleContainer>
          );
        })}
      </Main>
    </Container>
  );
}

export default CategoryBar;
