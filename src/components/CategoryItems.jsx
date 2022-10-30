import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { BiFoodTag, BiPlus, BiMinus } from "react-icons/bi";
import { decrementCount, incrementCount } from "../features/Cart";

const Container = styled.div`
  width: 100%;
  min-height: 120px;
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 10px 10px;
  border-bottom: 2px solid ${(p) => p.theme.subBorder};
  position: relative;
`;
const Details = styled.div`
  display: flex;
  height: 100%;
  max-width: 70%;
  p {
    color: ${(p) => p.theme.textSecondary};
  }
  .details {
    padding-left: 1ch;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .foodTag {
    height: 100%;
    padding-top: calc(0.2rem);
  }
  .buttons {
    margin-top: 1.5rem;
    width: 90px;
    background-color: ${(p) => p.theme.btn};
    border-radius: 25px;
    height: 25px;
    p {
      color: white;
      margin: 0;
      text-align: center;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      cursor: pointer;
      width: 35%;
      svg {
        height: 100%;
      }
      color: white;
      background: transparent;
      border: none;
    }
  }
  .customisation {
    color: ${(p) => p.theme.textWarning};
  }
  @media (max-width: 720px) {
    .foodTag {
      padding: 0;
    }
    h4 {
      font-size: calc(0.5rem + 1vw);
    }
    h5 {
      font-size: calc(0.4rem + 1vw);
    }
    p {
      margin-top: 0.5rem;
      font-size: calc(0.3rem + 1vw);
      text-align: start;
      max-width: 70%;
    }
  }
`;
const Image = styled.div`
  position: absolute;
  right: 10px;
  display: flex;
  flex-shrink: 0;
  gap: calc(4rem + 1vw);
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 1rem;
  }
  .image {
    width: 120px;
    height: 100px;
    border-radius: 15px;
    background-size: cover;
    background-position: center;
  }
  @media (max-width: 720px) {
    gap: calc(1rem + 1vw);
    .image {
      width: 80px;
      height: 60px;
    }
    p {
      font-size: 0.7rem;
    }
  }
`;

function CategoryItems() {
  const { categoryDishes } = useSelector((store) => store.global);
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const getCartCount = (id) => {
    const data = cart.cartItems?.find((item) => item.id === id);
    if (data) {
      return data.count;
    }
    return 0;
  };
  if (categoryDishes.length !== 0) {
    return categoryDishes.map((dish) => {
      return (
        <Container key={dish.dish_id}>
          <Details>
            <div className='foodTag'>
              <BiFoodTag fill={`${dish.dish_Type === 2 ? "green" : "red"}`} />
            </div>
            <div className='details'>
              <h4 className='title'>{dish.dish_name}</h4>
              <h5>{`${dish.dish_currency}   ${dish.dish_price}`}</h5>
              <p>{dish.dish_description}</p>
              <div className='buttons'>
                <button
                  type='button'
                  onClick={() => {
                    dispatch(decrementCount(dish.dish_id));
                  }}
                >
                  <BiMinus />
                </button>
                <p>{getCartCount(dish.dish_id)}</p>
                <button
                  type='button'
                  onClick={() => {
                    dispatch(incrementCount(dish.dish_id));
                  }}
                >
                  <BiPlus />
                </button>
              </div>
              {dish.addonCat.length !== 0 && (
                <p className='customisation'>costumisation available</p>
              )}
              {!dish.dish_Availability && (
                <p className='customisation'>Not Available</p>
              )}
            </div>
          </Details>
          <Image>
            <p>{dish.dish_calories} calories</p>
            <div
              className='image'
              style={{ backgroundImage: `url(${dish.dish_image})` }}
              alt='dish'
            />
          </Image>
        </Container>
      );
    });
  }
}

export default CategoryItems;
