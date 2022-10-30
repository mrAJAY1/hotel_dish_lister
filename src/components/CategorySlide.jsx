/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";
import { setSelected } from "../features/globalSlice";

import CategoryItems from "./CategoryItems";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

function CategorySlide() {
  const { hotelData, selected } = useSelector((store) => store.global);
  const [swipe, setSwipe] = useState(1);
  const dispatch = useDispatch();
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setSwipe(1);
      dispatch(
        setSelected({
          id: hotelData[selected.nextIndex].menu_category_id,
          index: selected.nextIndex,
        })
      );
    },

    onSwipedRight: () => {
      setSwipe(2);
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
      <CategoryItems swipe={swipe} />
    </Container>
  );
}

export default CategorySlide;
