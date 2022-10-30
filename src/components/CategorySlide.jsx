/* eslint-disable react/jsx-props-no-spreading */
import { useDispatch, useSelector } from "react-redux";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";
import { setSelected } from "../features/globalSlice";

import CategoryItems from "./CategoryItems";

const Container = styled.div`
  width: 100%;
`;

function CategorySlide() {
  const { hotelData, selected } = useSelector((store) => store.global);
  const dispatch = useDispatch();
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      dispatch(
        setSelected({
          id: hotelData[selected.nextIndex].menu_category_id,
          index: selected.nextIndex,
        })
      );
    },

    onSwipedRight: () => {
      dispatch(
        setSelected({
          id: hotelData[selected.prevIndex].menu_category_id,
          index: selected.prevIndex,
        })
      );
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  return (
    <Container {...handlers}>
      <CategoryItems />
    </Container>
  );
}

export default CategorySlide;
