/* eslint-disable react/jsx-props-no-spreading */
import { useSelector } from "react-redux";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";

import CategoryItems from "./CategoryItems";

const Container = styled.div`
  width: 100%;
`;

function CategorySlide() {
  const { hotelData, selected } = useSelector((store) => store.global);

  const handlers = useSwipeable({
    onSwipedLeft: () => console.log("rightSwipe"),
    onSwipedRight: () => console.log("leftSwipe"),
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
