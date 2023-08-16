import * as React from 'react';
import { useState,useEffect  } from "react";
import Box from '@mui/material/Box';
import axios from 'axios';
import './App.css';
import { Grid } from '@mui/material';

const ShowHistory = () => {
   const [winnerList, setWinnerList] = useState([""]);

   useEffect(() => {
     axios.get('http://localhost:5000/select').then((response) => {
       setWinnerList(response.data.results); 
     });
   }, []);
  
  return (
    <div className="showHistory">
        <h2 className="text-title">Tic-Tac-Toe (XO) Game</h2>
        <h3 className="text">History Game</h3>
        <button className="back-btn" onClick={
          (e) =>{
            e.preventDefault();
            window.location = '/';
          }} >Back</button>
        <div className='form-row'> 
        <Grid>
            {winnerList.map((post) => (
            <Box className="box-list">
              <h3 className='text-win'>{post.win} : Winner</h3>
            </Box>
          ))}
        </Grid>
        </div>
    </div>
  );
}

export default ShowHistory;
