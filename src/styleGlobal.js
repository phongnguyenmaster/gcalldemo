import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #333;
    color: #000000;
    font-size: 16px;
}
body {
  background-image: url(https://gcalls.co/wp-content/uploads/2022/08/home-v7-banner.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #af87f55c;
}
.scroll-height {
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
}
.scroll-height::-webkit-scrollbar {
  width: 16px;
}
.scroll-height::-webkit-scrollbar-track {
  background: none;
  background-clip: padding-box;
  border: 4px solid transparent;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.scroll-height:hover::-webkit-scrollbar-track:hover {
  background: #82828261;
  background-clip: padding-box;
}

.scroll-height::-webkit-scrollbar-thumb {
  background: #828282;
  background-clip: padding-box;
  border: 4px solid transparent;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  -webkit-box-shadow: none;
  box-shadow: none;
}
input::placeholder {
  color: #9e9e9e;
  opacity: 1; /* Firefox */
}
`;