import '../App.css';
import {Button,Tabs,Group,TextInput,Select,TransferList,Table} from '@mantine/core'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'
import { useState } from 'react';

function Submit(){
    return(
        <div className="App-header">
          <div>
            <div style={{display: 'flex',gap: '30px',justifyContent: 'center',marginTop: '5%'}}>
                <motion.div whileHover={{scale: 1.2}} whileTap={{ scale: 0.9 }}>
                  <Link to="/submit"><Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} style={{width: 200}}>Sumbit Form</Button></Link>
                </motion.div>
                <motion.div whileHover={{scale: 1.2}} whileTap={{ scale: 0.9 }}>
                  <Link to="/"><Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} style={{width: 200}}>Help Tab</Button></Link>
                </motion.div>
                <motion.div whileHover={{scale: 1.2}} whileTap={{ scale: 0.9 }}>
                <Link to="/report"><Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} style={{width: 200}}>Report</Button></Link>
                </motion.div>
            </div>
          </div>
          <h1 style={{fontSize: 20,textAlign: 'center'}}>Submit</h1>
          <Main/>
        </div>
    )
}

const initialValues = [
  [
    { value: '1', label: 'Football Game' },
    { value: '2', label: 'Basketball Game' },
    { value: '3', label: 'Soccer Game' },
    { value: '4', label: 'Tennis Game' },
    { value: '5', label: 'Volleyball Game' },
    { value: '6', label: 'Mulch Spreading Fundraiser' },
    { value: '7', label: 'International Night' },
    { value: '8', label: 'Pi Night' },
    { value: '9', label: 'Cancer Walk' },
    { value: '10', label: 'Career Fair' }
  ],
  [
  ]
];

function Main(){

  const [Eventdata1, setEventData1] = useState(initialValues);
  const [Eventdata2, setEventData2] = useState(initialValues);
  const [Eventdata3, setEventData3] = useState(initialValues);
  const [Eventdata4, setEventData4] = useState(initialValues);

  const [gradeVal1, setGradeVal1] = useState('');
  const [gradeVal2, setGradeVal2] = useState('');
  const [gradeVal3, setGradeVal3] = useState('');
  const [gradeVal4, setGradeVal4] = useState('');

  const [nameData1, setNameData1] = useState('');
  const [nameData2, setNameData2] = useState('');
  const [nameData3, setNameData3] = useState('');
  const [nameData4, setNameData4] = useState('');

  const [formValue, setFormValue] = useState(
    {
      Quarter1: {
        Name: '',
        Grade: '',
        Points: 0,
      },
      Quarter2: {
        Name: '',
        Grade: '',
        Points: 0,
      },
      Quarter3: {
        Name: '',
        Grade: '',
        Points: 0,
      },
      Quarter4: {
        Name: '',
        Grade: '',
        Points: 0,
      },
    }
  );

  function FilterData(quarter){


    // Filters the Data based on the quarter and then sets data to the formValue and calls the IPCSend function to send the data to the main process
    // will call the IPCError function if there is an error to notify the user
    if (quarter == 1){
      if (gradeVal1 == 9 || gradeVal1 == 10 || gradeVal1 == 11 || gradeVal1 == 12){
        if (nameData1 != ''){
          formValue.Quarter1.Name = nameData1
          formValue.Quarter1.Grade = gradeVal1
          IPCSend(Eventdata1,formValue.Quarter1,quarter)
        }else {
          window.electron.notificationApi.sendError('Please enter a valid name')
          console.log("Error")
        }
      }else {
        window.electron.notificationApi.sendError('Please enter a valid grade')
        console.log("Error")
      }
    }else if (quarter == 2){
      if (gradeVal2 == 9 || gradeVal2 == 10 || gradeVal2 == 11 || gradeVal2 == 12){
        if (nameData2 != ''){
          formValue.Quarter2.Name = nameData2
          formValue.Quarter2.Grade = gradeVal2
          IPCSend(Eventdata2,formValue.Quarter2,quarter)
        } else {
          window.electron.notificationApi.sendError('Please enter a valid name')
          console.log("Error")
        }
      }else {
        window.electron.notificationApi.sendError('Please enter a valid grade')
        console.log("Error")
      }
    }else if (quarter == 3){
      if (gradeVal3 == 9 || gradeVal3 == 10 || gradeVal3 == 11 || gradeVal3 == 12){
        if (nameData3 != ''){
          formValue.Quarter3.Name = nameData3
          formValue.Quarter3.Grade = gradeVal3
          IPCSend(Eventdata3,formValue.Quarter3,quarter)
        }else {
          window.electron.notificationApi.sendError('Please enter a valid name')
          console.log("Error")
        }
      }else {
        window.electron.notificationApi.sendError('Please enter a valid grade')
        console.log("Error")
      }
    }else if (quarter == 4){
      if (gradeVal4 == 9 || gradeVal4 == 10 || gradeVal4 == 11 || gradeVal4 == 12){
        if (nameData4 != ''){
          formValue.Quarter4.Name = nameData4
          formValue.Quarter4.Grade = gradeVal4
          IPCSend(Eventdata4,formValue.Quarter4,quarter)
        }else {
          window.electron.notificationApi.sendError('Please enter a valid name')
          console.log("Error")
        }
      }else {
        window.electron.notificationApi.sendError('Please enter a valid grade')
        console.log("Error")
      }
    }

    function IPCSend(Event,Form,Quarter){
      // Calls the Success IPC function to send the user a notification that the data was sent
      window.electron.notificationApi.sendSuccess('Data Being Sent')
      // Loops through the event array and adds the points to the form object
        Form.Points = Event[1].length 
        // Uses IPC to send to the backend server the sql query to insert the data into the database
        window.electron.notificationApi.receiveSQL(`Select * from quarter${Quarter} where name = '${Form.Name}' and grade = ${Form.Grade}`).then(quarterdata => {
          console.log(quarterdata)
          if (quarterdata.length == 0){
            window.electron.notificationApi.sendSQL(`Insert into quarter${Quarter}(name,grade,points) values ('${Form.Name}',${Form.Grade},${Form.Points})`)
            window.electron.notificationApi.receiveSQL(`Select * from final where name = '${Form.Name}' and grade = ${Form.Grade}`).then(finaldata => {
              if (finaldata.length == 0){
                window.electron.notificationApi.sendSQL(`Insert into final(name,grade,points) values ('${Form.Name}',${Form.Grade},${Form.Points})`)
              }else {
                window.electron.notificationApi.sendSQL(`Update final set grade = ${Form.Grade}, points = ${finaldata[0].points+Form.Points} where id = ${quarterdata[0].id}`)
              }
            })
          }else {
            window.electron.notificationApi.sendSQL(`Update quarter${Quarter} set grade = ${Form.Grade}, points = ${Form.Points+quarterdata[0].points} where id = ${quarterdata[0].id}`)
            window.electron.notificationApi.receiveSQL(`Select * from final where name = '${Form.Name}' and grade = ${Form.Grade}`).then(finaldata => {
              if (finaldata.length == 0){
                window.electron.notificationApi.sendSQL(`Insert into final(name,grade,points) values ('${Form.Name}',${Form.Grade},${Form.Points})`)
              }else {
                window.electron.notificationApi.sendSQL(`Update final set grade = ${Form.Grade}, points = ${finaldata[0].points+Form.Points} where id = ${quarterdata[0].id}`)
              }
            })
          }
        })
    }
  }

    return (

    <div style={{justifyContent: 'center'}}>
      <Tabs defaultValue="Quarter 1" color="orange" radius="md">
      <Tabs.List grow>
        <Tabs.Tab value="Quarter 1" style={{color: "aqua"}}>Quarter 1</Tabs.Tab>
        <Tabs.Tab value="Quarter 2" style={{color: "aqua"}}>Quarter 2</Tabs.Tab>
        <Tabs.Tab value="Quarter 3" style={{color: "aqua"}}>Quarter 3</Tabs.Tab>
        <Tabs.Tab value="Quarter 4" style={{color: "aqua"}}>Quarter 4</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Quarter 1" pt="xs">
        Quarter 1
        <Quarter quarter={1} SendData={()=>FilterData(1)} nameData={nameData1} setNameData={setNameData1} gradeVal={gradeVal1} setGradeVal={setGradeVal1} Eventdata={Eventdata1} setEventData={setEventData1} formValue={formValue} setFormValue={setFormValue} />
      </Tabs.Panel>

      <Tabs.Panel value="Quarter 2" pt="xs">
        Quarter 2
        <Quarter quarter={2} SendData={()=>FilterData(2)} nameData={nameData2} setNameData={setNameData2} gradeVal={gradeVal2} setGradeVal={setGradeVal2} Eventdata={Eventdata2} setEventData={setEventData2} formValue={formValue} setFormValue={setFormValue} />
      </Tabs.Panel>

      <Tabs.Panel value="Quarter 3" pt="xs">
        Quarter 3
        <Quarter quarter={3} SendData={()=>FilterData(3)} nameData={nameData3} setNameData={setNameData3} gradeVal={gradeVal3} setGradeVal={setGradeVal3} Eventdata={Eventdata3} setEventData={setEventData3} formValue={formValue} setFormValue={setFormValue} />
      </Tabs.Panel>

      <Tabs.Panel value="Quarter 4" pt="xs">
        Quarter 4
        <Quarter quarter={4} SendData={()=>FilterData(4)} nameData={nameData4} setNameData={setNameData4} gradeVal={gradeVal4} setGradeVal={setGradeVal4} Eventdata={Eventdata4} setEventData={setEventData4} formValue={formValue} setFormValue={setFormValue} />
      </Tabs.Panel>

    </Tabs>

    </div>
    )
}

function Quarter(props){
  return (
    <div>
      <Group style={{justifyContent: 'center'}}>
            <TextInput value={props.nameData} onChange={(event) => props.setNameData(event.currentTarget.value)} label="Name" placeholder="Student Name" style={{width: 200}} withAsterisk/>
            <Select withAsterisk
              label="Grade"
              placeholder="Pick one"
              data={[
                { value: 9, label: '9' },
                { value: 10, label: '10' },
                { value: 11, label: '11' },
                { value: 12, label: '12' },
              ]}
              value = {props.gradeVal}
              onChange={props.setGradeVal}
            />
        </Group>
        <Group style={{justifyContent: 'center',margin: '2%'}}>
            <TransferList
              value={props.Eventdata}
              onChange={props.setEventData}
              searchPlaceholder="Search..."
              nothingFound="Nothing here"
              titles={['Events Available', 'Events Student Has Done']}
              breakpoint="sm"
            />
        </Group>
        <motion.div style={{margin: '5%'}}>
          <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} style={{width: 200}} onClick={props.SendData}>Add Student</Button>
        </motion.div>
        <Random quarter={props.quarter} />
    </div>
  )
}

function Random(props){

  const [show , setShow] = useState(false)

  const [randomPerson, setRandomPerson] = useState({
    name: '',
    grade: 0,
    points: 0
  }
  )

  function getRandomPerson(quarter){
    window.electron.notificationApi.receiveSQL('Select * from quarter'+quarter+" ORDER BY RANDOM() LIMIT 1").then((data)=>{
      if (data.length != 0){
        setRandomPerson({
          name: data[0].name,
          grade: data[0].grade,
          points: data[0].points
        })
        setShow(true)
      }else {
        window.electron.notificationApi.sendError('The Database is Empty for this Quarter')
      }
    })
  }

  return (
    <div>
      <h1>Get Random Winner From Quarter {props.quarter}</h1>
      <div style={{minWidth: '20%',width: '50%',margin: 'auto',marginBottom: '5%'}}>
        <Table horizontalSpacing="xl" highlightOnHover withColumnBorders>
          <tr>
            <th >Name</th>
            <th >Grade</th>
            <th >Points</th>
          </tr>
          <tbody>
            <tr>
              <td>{show ? randomPerson?.name:''}</td>
              <td>{show ? randomPerson?.grade:''}</td>
              <td>{show ? randomPerson?.points:''}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} style={{width: 200,marginBottom: '10%'}} onClick={()=>setRandomPerson(getRandomPerson(props.quarter))}>Get Random Winner</Button>
    </div>
  )
}

export default Submit