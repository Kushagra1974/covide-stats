import './App.css';

import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';


import Cards from './Components/Cards/Cards';
import Charts from './Components/Charts/Charts';
import CountryPicker from './Components/CountryPicker/CountryPicker';

import { StateProvider } from "./stateProvider/StateProvider"


const useStyles = makeStyles({
  center: {
    textAlign: "center"
  },
  img: {
    margin: "50px"
  }
})

function App() {
  const classes = useStyles();
  return (
    <StateProvider>
      <div className="App">
        <Container className={classes.center}>
          <img className={classes.img} src="image.png" alt="hehehe image thi yha par" />
          <Cards ></Cards>
          <CountryPicker></CountryPicker>
          <Charts></Charts>
        </Container>
      </div >
    </StateProvider>
  );
}

export default App;
