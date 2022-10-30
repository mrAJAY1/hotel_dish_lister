import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import NavBar from "./components/NavBar";
import { LightTheme } from "./Theme";
import CategoryBar from "./components/CategoryBar";
import { getData } from "./features/globalSlice";
import CategorySlide from "./components/CategorySlide";

const Container = styled.div``;
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);
  return (
    <ThemeProvider theme={LightTheme}>
      <Container>
        <NavBar />
        <CategoryBar />
        <CategorySlide />
      </Container>
    </ThemeProvider>
  );
}

export default App;
