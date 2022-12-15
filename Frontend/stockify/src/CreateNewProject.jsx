import React from 'react';
import Grid2 from '@mui/material/Grid'// Grid version 2
import './app.css'

function CreateNewProject(){
    return(
        <div>
            <header className="App-header">
                <h1 className="App-title">Stockify</h1>
                <Grid2 container>
                    <Grid2 xs="3"/>
                    <Grid2 xs="8">Create new Project:</Grid2>
                </Grid2>
            </header>
        </div>
    )
}

export default CreateNewProject;