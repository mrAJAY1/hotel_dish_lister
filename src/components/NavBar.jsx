import styled from "styled-components";
import { HiShoppingCart } from "react-icons/hi";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  margin-top: 10px;
`;
const Logo = styled.div`
  color: ${(p) => p.theme.textSecondary};
  h1 {
    font-size: calc(1rem + 1vw);
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  width: 40%;
  color: ${(p) => p.theme.textSecondary};
  h3 {
    font-size: calc(0.7rem + 1vw);
    align-self: flex-end;
    font-weight: 600;
  }
`;
const Icon = styled.div`
  position: relative;
  span {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 18px;
    text-align: center;
    height: 12px;
    border-radius: 30px;
    background-color: ${(p) => p.theme.textWarning};
    font-weight: bold;
    color: white;
    font-size: 10px;
  }
  .icon {
    height: 100%;
    width: 100%;
  }
`;

function NavBar() {
  const cart = useSelector((store) => store.cart);
  return (
    <Container>
      <Logo>
        <h1>UNI Resto Cafe</h1>
      </Logo>
      <Options>
        <h3>My Orders</h3>
        <Icon>
          <HiShoppingCart className='icon' />
          <span>{cart.cartCount}</span>
        </Icon>
      </Options>
    </Container>
  );
}

export default NavBar;
