import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
 
* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   font-family: Arial, sans-serif;
}

 body {
   background-color: $f7f7f7;
   color: #333;
   padding: 20px;
 }

 h1 {
   text-align: center;
   margin-bottom: 20px;
 }
`

export default GlobalStyle;