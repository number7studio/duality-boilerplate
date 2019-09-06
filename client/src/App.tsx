import React from 'react';
import { Home } from './pages/Home';
import { Box,  Grommet } from 'grommet';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MoodEntry from './pages/MoodEntry';
import Mood from './pages/Mood';


const AppBar = (props: any) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
  
);

const App: React.FC = () => {
  return (
    <Grommet full>
      <Box
        fill
        style={{ width: "100%", maxWidth: "450px", margin: "0 auto" }}
        alignSelf="center"
        elevation="xsmall">
        <AppBar> Self Tracker </AppBar>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/mood" exact strict={true} component={Mood} />
          <Route path="/mood/" exact strict={true} component={MoodEntry} />
        </Router>
      </Box>
    </Grommet>
  );
}

export default App;
