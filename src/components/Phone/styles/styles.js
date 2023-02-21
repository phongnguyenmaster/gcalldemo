import styled from 'styled-components';

export const Container = styled.div`
   width: 100%;
   max-width: 1024px;
   height: 100vh;
   display: flex;
   margin: 0 auto;
   align-items: center;
   justify-content: center;
`;

export const Inner = styled.div`

   width: fit-content;
   background-color: #af87f55c;
   box-shadow: 0px 0px 20px -5px #fcfcfc8f;
   padding: 20px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 20px;
   border-radius: 20px;
   position: relative;
   width: 500px;
   .form {
    width: 80%;
    margin-top: 2px;
      .input {
         width: 100%;
         margin: 0 auto;
         border: none;
         outline: none;
         padding: 6px 0;
         background-color: transparent;
         color: #fff;
         /* border-bottom: 2px solid #fff; */
         font-size: 30px;
         text-align: center;
         font-weight: bold;
      }
   }
   .index-module_main__yO3nl {
      background-color: transparent;
   }
   .keyboard {
      position: relative;
      width: 300px;
      & + button {
         width: 80px;
         height: 80px;
         border-radius: 100%; 
      }
   }
      .index-module_itemsContainer__CjP0y {
         background-color: transparent;
         justify-content: center;
      }
      .index-module_KeyboardItem__Hjjrl {
     
         border: none;
         background-color: white;
         border-radius: 100%;
         width: 80px;
         height: 80px;
         flex: none;
         margin: 8px;
         p, img {
            user-select: none;
            font-size: 30px;
         }
         &:hover {
            background-color: #4BD68A;
         }
      }
   }
   .line {
      width: 100%;
      height: 7px;
     
      position: relative;
      z-index: 100;
   }
`;
