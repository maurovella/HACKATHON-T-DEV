import { useParams } from 'react-router-dom';

import '../app.css'
import { useEtherContext } from '../contexts/EtherContext';
import styled from 'styled-components';
import React from "react";
import Grid from "@mui/material/Grid";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {Button} from "@mui/material";

export default function ProjectScreen() {
    const { projectId } = useParams();

    return (
        <Wrapper>
        <div>
            <h3 className="App-title">Krusty Crab</h3>
                <div className="container">
                    <Carousel className="App-image">
                        <div>
                            <img src="/kc2.jpg" alt="krusty crab"/>
                        </div>
                        <div>
                            <img src="/kc.png" alt="krusty crab 2"></img>
                        </div>
                    </Carousel>
                    <Button className="App-button" variant="contained">Buy</Button>
                    <h5 className="App-projecttext">Available shares: 145</h5>
                </div>
        </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  .container {
    display: flex;align-items: center;
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