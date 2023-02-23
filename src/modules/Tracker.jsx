import '../App.css';
import {Button} from '@mantine/core'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'

function Tracker(){
    return (
        <div className="App-header">
          <div style={{display: 'flex',gap: '30px',justifyContent: 'center',marginTop: '5%'}}>
              <motion.div whileHover={{scale: 1.2}} whileTap={{ scale: 0.9 }}>
                <Link to="/submit"><Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} style={{width: 200}}>Add Students</Button></Link>
              </motion.div>
              <motion.div whileHover={{scale: 1.2}} whileTap={{ scale: 0.9 }}>
                <Link to="/"><Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} style={{width: 200}}>Help Tab</Button></Link>
              </motion.div>
              <motion.div whileHover={{scale: 1.2}} whileTap={{ scale: 0.9 }}>
              <Link to="/report"><Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} style={{width: 200}}>Report</Button></Link>
              </motion.div>
          </div>
          <h1 style={{fontSize: 20}}>Help Tab</h1>
        </div>
    );
}

export default Tracker;