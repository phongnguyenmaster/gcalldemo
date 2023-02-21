import styled from "styled-components";

export const Frame = styled.div`
    width: 500px;
    height: 500px;
    color: #fff;
    .title {
        color: #fff;
        font-size: 20px;
        text-transform: uppercase;
    }
    .log {
        margin-bottom: 5px;
        padding: 0 10px;
        border-radius: 8px;
        min-height: 60px;
        background-color: white;
        color: black;
        padding: 8px;
        display: flex;
        .phonenumber {
            font-size: 18px;
            padding-left: 8px;
        }
    }
`