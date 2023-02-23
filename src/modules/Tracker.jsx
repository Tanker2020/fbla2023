import '../App.css';
import {Button,Accordion,Group} from '@mantine/core'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'

function Tracker(){
    return (
        <div className="App-header">
          <div style={{display: 'flex',gap: '30px',justifyContent: 'center',marginTop: '5%'}}>
              <motion.div whileHover={{scale: 1.2}} whileTap={{ scale: 0.9 }}>
                <Link to="/submit"><Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} style={{width: 200}}>Input Student Data</Button></Link>
              </motion.div>
              <motion.div whileHover={{scale: 1.2}} whileTap={{ scale: 0.9 }}>
                <Link to="/"><Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} style={{width: 200}}>Help Tab</Button></Link>
              </motion.div>
              <motion.div whileHover={{scale: 1.2}} whileTap={{ scale: 0.9 }}>
              <Link to="/report"><Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} style={{width: 200}}>Report</Button></Link>
              </motion.div>
          </div>
          <h1 style={{fontSize: 20}}>Help Tab</h1>
          <div style={{display: 'inline-block',minWidth: '1700px'}}>
            <iframe width="800" height="415" src="https://www.youtube.com/embed/duuggM8em5I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            <QA/>
          </div>
        </div>
    );
}

function QA(){
  return (
    <Accordion transitionDuration={500} radius="md" defaultValue="customization">
      <Accordion.Item value="customization">
        <Accordion.Control>Question: How do I add a student in the database?</Accordion.Control>
        <Accordion.Panel>Answer: By going to the "Input Student Data" tab, you can enter the name, grade, and point/events a student has done. Right after that, you can click the "Add Student" button which will directly enter the student into the database</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="flexibility">
        <Accordion.Control>Question: How are the random winners chosen and from where are they chosen?</Accordion.Control>
        <Accordion.Panel>Answer: Using a random generator, a name is chosen from each grade for each quarter. Meaning that each quarter will have 4 winners giving a total of 16 random winners for the year.</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="focus-ring">
        <Accordion.Control>Question: How can I see the final results of all student participation in the school?</Accordion.Control>
        <Accordion.Panel>Answer: To see the total point and event accumulation of the students, you can ask for the final report underneath the "Report" tab. Click “final report” which will give you the total points for every student in the school at the end of the year.</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}

export default Tracker;