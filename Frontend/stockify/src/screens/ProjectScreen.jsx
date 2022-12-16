import { useParams } from 'react-router-dom';
import { useEtherContext } from '../contexts/EtherContext';
import '../app.css'
import styled from 'styled-components';
import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {Button} from "@mui/material";
import AmountButtons from '../components/AmountButtons';
import { toast } from 'react-hot-toast';

export default function ProjectScreen() {
  const { EtherHelper } = useEtherContext()
    const { projectId } = useParams();


    const STOCK_ADDRESS = "0x"
    const [selectedStock, setSelectedStock] = useState(0);
    const [availableStock, setAvailableStock] = useState(145);
    //TODO: get real available number

    const projectName = "Krusty Crab"
    //TODO: get real name
    
    const buy = () => {
      const promise = EtherHelper.mintTokens(STOCK_ADDRESS, selectedStock)
      toast.promise(
        promise,
        {
          loading: "Minting...",
          success: "Tokens minted!",
          error: "Error while minting the tokens!"
        }
      )
    }

    const handleUp = () => {
        if (selectedStock < availableStock){
            setSelectedStock(selectedStock+1);
        }
    }

    const handleDown = () => {
        if (selectedStock > 0){
            setSelectedStock(selectedStock-1);
        }
    }

    return (
        <Wrapper>
        <div>
            <h2 className="App-title">{projectName}</h2>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Carousel className="App-image">
                        <div>
                            <img src="/kc2.jpg" alt="krusty crab"/>
                        </div>
                        <div>
                            <img src="/kc.png" alt="krusty crab 2"></img>
                        </div>
                    </Carousel>
                </Grid>
                <Grid item xs={6} className="container2">
                    <h3 className="floating-text">Buy {projectName} stock now!</h3>
                    <div className="container">
                      <AmountButtons increase={handleUp} decrease={handleDown} amount={selectedStock}/>
                    </div>
                    <Button className="button" variant="contained" onClick={buy}>Buy</Button>
                    <h5 className="floating-text">Available shares: {availableStock}</h5>
                </Grid>
            </Grid>
        </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  .container {
    display: block;align-items: center;margin-bottom: 5%;
  }
  .container2{
    align-items: center;
    text-align: center;
  }
  .button{
    background-color: limegreen;
    color: black;
    align-content: center;
    margin-bottom: 5%;
  }
  .floating-text{
    color:white;
    text-align: center;
    clear: both;
    overflow: hidden;
    white-space: nowrap;
  }
  .button2{
    background-color: white;
    color: black;
    align-content: center;
    border-radius: 100%;
    margin: 5%;
  }
  .button3{
    background-color: white;
    color: black;
    align-content: center;
    border-radius: 100%;
    margin: 5%;
  }
  .button2:hover{
    background-color: darkslategray;
  }.button3:hover{
    background-color: darkslategray;
  }
  .box {
    display: inline-flex;
    width: 15%;
    border-radius: 10%;
    background-color: white;
    text-align: center;
  }
  .center-text{
    text-align: center;
    align-self: center;
    margin-left: 40%;
  }
  
  
 `