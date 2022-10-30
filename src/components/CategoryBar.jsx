import { useEffect, useRef } from "react";
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
    background-color: transparent;
    border-radius: 30px;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: #efefef;
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  @media (max-width: 720px) {
    width: 150px;
    width: 250px;
  }
  height: 100%;
  font-size: 1.5ch;
  @media (min-width: 720px) {
    width: 30vw;
    font-size: calc(0.2rem + 0.8vw);
  }
  font-weight: 500;
  padding-bottom: 10px;
  &::after {
    transition: all 0.5s ease;
    content: "";
    display: block;
    position: absolute;
    height: 2px;
    width: ${(p) => (p.active ? "100%" : "0%")};
    left: 0;
    bottom: -2px;
    border-bottom: ${(p) =>
      p.active ? `2px solid ${p.theme.textWarning}` : "2px solid transparent"};
  }
  transition: all 0.5s ease;
  color: ${(p) => (p.active ? p.theme.textWarning : p.theme.textSecondary)};

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
  const ref = useRef(null);
  const mainRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if ((!selected.current.id || !selected.current.index) && hotelData[0])
      dispatch(setSelected({ index: 0, id: hotelData[0]?.menu_category_id }));
  }, [hotelData]);

  useEffect(() => {
    dispatch(setCurrentDishes(selected.current.id));
    if (ref.current?.offsetLeft) {
      mainRef.current.scrollTo({
        left: ref.current.offsetLeft - 50,
        top: 0,
        behavior: "smooth",
      });
    } else {
      mainRef.current.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth",
      });
    }
  }, [selected]);

  return (
    <Container ref={mainRef}>
      <Main>
        {hotelData?.map((item, index) => {
          return (
            <TitleContainer
              ref={selected.current.id === item.menu_category_id ? ref : null}
              active={selected.current.id === item.menu_category_id}
              key={item.menu_category_id}
              onClick={() =>
                selected.current.id !== item.menu_category_id &&
                dispatch(
                  setSelected({
                    id: item.menu_category_id,
                    index,
                  })
                )
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
