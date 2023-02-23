import './App.css';
import Help from './modules/Tracker'
import Submit from './modules/Submit'
import Report from './modules/Report'
import {HashRouter,Routes, Route} from 'react-router-dom'
import { MantineProvider } from '@mantine/core';

function App() {
  return(
    <MantineProvider theme={{colorScheme: 'dark'}} withGlobalStyles withNormalizeCSS>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Help/>}/>
        <Route path="/submit" element={<Submit/>}/>
        <Route path="/report" element={<Report/>}/>
      </Routes>
    </HashRouter>  
    </MantineProvider>
    
  )
}

export default App;
