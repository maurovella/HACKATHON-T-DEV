import { useEtherContext } from '../contexts/EtherContext';
import styled from 'styled-components';
import {TextField, InputAdornment, Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function SellScreen() {
    const { EtherHelper } = useEtherContext()
    const mint = e => {
      e.preventDefault();
      const form = new FormData(e.target)
      const entries = Object.fromEntries(form)
      console.log(entries)
      EtherHelper.createProject(entries);
    }
    return (
        <Wrapper>
              <Grid item xs={6}>
                  <h1 className="title t"> Sell your Stock</h1>
                  <form onSubmit={mint}>
                      <div className="container">
                          <Grid container spacing={2}>
                              <Grid item xs={6}>
                                  <h4 className="t">What percentage of your company are you willing to mint?</h4>
                                  <TextField variant="outlined" type="number" max="100" min="0" name="percentage" className="text-field"/>
                                  <h4 className='t'>To what valuation?</h4>
                                  <TextField variant="outlined" min="0" name="valuation" className="text-field"/>
                                  <h4 className='t'>How many tokens do you want to mint?</h4>
                                  <TextField variant="outlined" type="number" min="0" name="tokenAmount" className="text-field"/>
                                  <Button className="button" type="submit">Mint</Button>
                              </Grid>
                              <Grid item xs={6} className="name">
                                  <h4 className="t">Description of your company</h4>
                                  <TextField multiline maxRows={4} variant="outlined" type="text"  name="description" className="text-field"/>
                                  <h4 className='t'>What is your objective?</h4>
                                  <TextField multiline maxRows={4} variant="outlined" type="text" name="objective" className="text-field"/>
                                  <h4 className='t'>What is the deadline?</h4>
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
