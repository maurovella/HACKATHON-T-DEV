import { useEtherContext } from '../contexts/EtherContext';
import styled from 'styled-components';
import {TextField, InputAdornment, Button, Container } from "@mui/material";
import { toast } from 'react-hot-toast';

export default function SellScreen() {
    const { EtherHelper } = useEtherContext()
    const form_tpl = {  // Entries template
      name: "pelote",
      symbol: "PEL",
      premint: 0xff,
      equityValue: 0xff,
      equity: 50,
      duration: 16712,
    }
    const mint = e => {
      e.preventDefault();
      const form = new FormData(e.target)
      const entries = Object.fromEntries(form)
      const promise = EtherHelper.createProject();
      toast.promise(
        promise,
        {
          loading: "Deploying project token contract...",
          success: <b>Congratulations token deployed!</b>,
          error: <b>Error while deploying project token contract 👾 </b>
        })
    }
    return (
        <Wrapper>
          <Container>
            <h1 className="title t"> Sell your Stock</h1>
            <form onSubmit={mint}>
              <div className="container">
                  <h4 className="t">What percentage of your company are you willing to mint?</h4>
                  <TextField variant="outlined" type="number" max="100" min="0" name="perc"/>
                  <h4 className='t'>To what valuation?</h4>
                  <TextField variant="outlined" type="number" min="0" name="valuation"/>
                  <h4 className='t'>How many tokens do you want to mint?</h4>
                  <TextField variant="outlined" type="number" min="0" name="tokenAmount"/>
              </div>
              <Button className="button" type="submit">Mint</Button>
            </form>
              
          </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  .container {
    align-items: center;
    margin-top: 2%;
    margin-left: 12%;
  }

  .title{
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
