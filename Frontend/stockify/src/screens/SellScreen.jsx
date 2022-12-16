import { useEtherContext } from '../contexts/EtherContext';
import styled from 'styled-components';
import {TextField, InputAdornment, Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
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
          let obj = Object.fromEntries(form)
        obj = {
            name: obj.name,
            symbol:obj.symbol,
            premint: obj.premint,
            equity: obj.equity,
            equityValue: obj.valuation * (obj.equity / 100),
            duration: Math.ceil((obj.deadline - new Date())/ (1000 * 60 * 60 * 24))
        }
      const promise = EtherHelper.createProject(obj);
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
              <Grid item xs={6}>
                  <h1 className="title t"> Sell your Stock</h1>
                  <form onSubmit={mint}>
                      <div className="container">
                          <Grid container spacing={2}>
                              <Grid item xs={6}>
                                  <h4 className="t">What is the name of your company?</h4>
                                  <TextField variant="outlined" type="text" name="name" className="text-field"/>
                                  <h4 className='t'>Acronym</h4>
                                  <TextField variant="outlined" type="text" name="symbol" className="text-field"/>
                                  <h4 className='t'>What percentage of your company do you wish to offer?</h4>
                                  <TextField variant="outlined" type="number" min="0" max="100" name="equity" className="text-field"/>
                                  <Button className="button" type="submit">Mint</Button>
                              </Grid>
                              <Grid item xs={6} className="name">
                                  <h4 className="t">How much is your company worth?</h4>
                                  <TextField variant="outlined" type="number"  name="valuation" className="text-field"/>
                                  <h4 className='t'>How many tokens do you wish to mint?</h4>
                                  <TextField variant="outlined" type="number" name="premint" className="text-field"/>
                                  <h4 className='t'>When is the deadline?</h4>
                                  <TextField variant="outlined" type="date"  name="deadline" className="text-field"/>
                              </Grid>
                          </Grid>


                      </div>

                  </form>
              </Grid>


        </Wrapper>
    )
}

const Wrapper = styled.div`
  .container {
    align-items: center;
    margin-top: 2%;
    margin-left: 12%;
  }
  
  .text-field{
    background-color: white;
  }

  .title{
    font-size: 40px;
    margin-left: 10%;
    margin-top: 5%;
  }

  .t{
    color: white;
  }


  .button{
    background-color: limegreen;
    color: black;
    margin-top: 3%;
    padding-left: 5%;
    padding-right: 5%;
    align-content: center;
    display:block;
  }
  .end{
    margin-bottom: 10%;
  }
 `
