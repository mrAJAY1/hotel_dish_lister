import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*,*::before,*::after,h1,h2,h3,h4,h5,h6{
    margin:0;
    padding:0;
    box-sizing: border-box;
}
h1,h2,h3,h4,h5,h6{
    display:inline-block;
}
body{
    margin:0;
    padding:0;
    overflow-x:hidden;
    line-height: 1.5 !important;
    font-family: 'Roboto Slab', serif;
}
`;

export default GlobalStyle;
