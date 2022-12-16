import { useParams } from 'react-router-dom';

import '../app.css'
import { useEtherContext } from '../contexts/EtherContext';
import styled from 'styled-components';
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Button} from "@mui/material";

export default function SellScreen() {
    const { projectId } = useParams();

    return (
        <Wrapper>
        <div>
            <h1 className="App-title"> Sell your Stock</h1>
                <div className="container">
                    <h4 className="t">What percentage of your company are you willing to mint?</h4>
                    <textarea></textarea>
                    <h4 className='t'>To what valuation?</h4>
                    <textarea></textarea>
                    <h4 className='t'>How many tokens do you want to mint?</h4>
                    <textarea></textarea>
                </div>
        </div>
        <Button className="button" >Mint</Button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  .container {
    align-items: center;
    margin-top: 2%;
    margin-left: 12%;
  }

  .App-title{
    font-size: 40px;
  }

  .t{
    color: white;
  }


  .button{
    background-color: limegreen;
    color: black;
    margin-left: 12%;
    margin-top: 1%;
    padding-left: 5%;
    padding-right: 5%;
    align-content: center;
  }
 `
