import '../app.css'
import styled from 'styled-components';
import React from "react";

export default function HomeScreen() {

    return (
        <Wrapper>
        <div className="container">
            <p className="p1">Stockify is a decentralized stock market</p>
            <p className="p2">Buy and sell company Stock!</p>
        </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  .container {
    align-items: center;
    text-align: center;
  }

  .p1{
    font-size: 30px;
    color: white;
  }

  .p2{
    font-size: 20px;
    color: white;
  }

  .button{
    background-color: limegreen;
    color: black;
    margin-left: 15%;
    margin-bottom: 10%;
    display: inline-flex;
    align-content: center;
  }
 `
