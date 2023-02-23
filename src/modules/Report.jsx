import '../App.css';
import {Button,Modal,Table,Tabs} from '@mantine/core'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'

import {useState} from 'react'


function Report(){
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
          <div style={{display: 'flex',gap: '30px',justifyContent: 'center'}}>
            <ShowReport/>
            <GetTopPoints/>
            </div>
            <h1>Winners</h1>
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
                <ShowWinner quarter={1}/>
            </Tabs.Panel>

            <Tabs.Panel value="Quarter 2" pt="xs">
                Quarter 2
                <ShowWinner quarter={2}/>
            </Tabs.Panel>

            <Tabs.Panel value="Quarter 3" pt="xs">
                Quarter 3
                <ShowWinner quarter={3}/>
            </Tabs.Panel>

            <Tabs.Panel value="Quarter 4" pt="xs">
                Quarter 4
                <ShowWinner quarter={4}/>
            </Tabs.Panel>

            </Tabs>

            </div>
            
        </div>
    );
}

function GetTopPoints(){

    const [show , setShow] = useState(true)

    const [data,setData] = useState({
        id: 0,
        name : '',
        grade: 0,
        points: 0,
        prize: ''
    })

    //function to get data from database
    function Data(){
        return (
            <>
                <tr>
                    <th style={{fontSize: 15}}>Name</th>
                    <th style={{fontSize: 15}}>Grade</th>
                    <th style={{fontSize: 15}}>Points</th>
                    <th style={{fontSize: 15}}>Prize</th>
                </tr>
                <tr>
                    <td style={{fontSize: 15}}>{data.name}</td>
                    <td style={{fontSize: 15}}>{data.grade}</td>
                    <td style={{fontSize: 15}}>{data.points}</td>
                    <td style={{fontSize: 15}}>{data.prize}</td>
                </tr>
            </>
        )
    }

    function GetData(){
        window.electron.notificationApi.receiveSQL('SELECT * FROM final WHERE points = (SELECT MAX (points)FROM final)').then((mydata)=>{
            console.log(mydata)
            let prize
            if (mydata[0].points >= 3&&mydata[0].points < 6){
                prize = "Stuffed Animal"
            }else if (mydata[0].points >= 6&&mydata[0].points < 9){
                prize = "Pizza Party"
            }else if (mydata[0].points >= 9){
                prize = "Movie Night"
            }else {
                prize = "No Prize"
            }
            
            setData({
                id: mydata[0].id,
                name : mydata[0].name,
                grade: mydata[0].grade,
                points: mydata[0].points,
                prize: prize
            })
        }
        )
        setShow(false)
    }

    return (
        <div>
            <h1 style={{fontSize: 20}}>Final Winner</h1>
            <motion.div style={{display: 'inline-block'}} whileHover={{scale: 1.2}} whileTap={{ scale: 0.9 }}>
                <Button onClick={()=> {GetData();setShow(!show)}}>{show ? "Get Winner": "Hide Winner"}</Button>
            </motion.div>
                <Modal
                title="The Top Points Winner"
                opened={!show}
                onClose={() => setShow(!show)}
                size="xl"
                >
                    <Table horizontalSpacing="xl" highlightOnHover withColumnBorders>
                        <tbody>
                        {show ? "": <Data/>}
                        </tbody>
                    </Table>
                </Modal>
        </div>
    )
}

function ShowWinner(props){

    const [data,setData] = useState({
        id: [],
        name : [],
        grade: [],
        points: [],
        prize: []
    })

    const [show,setShow] = useState({
        val1: true,
        val2: true,
        val3: true,
        val4: true
    })

    //function to get data from database
    function Data(){
        return (
            <>
                <tr>
                    <th style={{fontSize: 15}}>Id</th>
                    <th style={{fontSize: 15}}>Name</th>
                    <th style={{fontSize: 15}}>Grade</th>
                    <th style={{fontSize: 15}}>Points</th>
                    <th style={{fontSize: 15}}>Prize</th>
                </tr>{data.id.map((item,index) => (
                    <tr key={index}>
                        <td style={{fontSize: 15}}>{item}</td>
                        <td style={{fontSize: 15}}>{data.name[index]}</td>
                        <td style={{fontSize: 15}}>{data.grade[index]}</td>
                        <td style={{fontSize: 15}}>{data.points[index]}</td>
                        <td style={{fontSize: 15}}>{data.prize[index]}</td>
                    </tr>
                ))}
            </>
        )
    }

    function dataFilter(grade){
        try{
            window.electron.notificationApi.receiveSQL(`Select * from "quarter${props.quarter}" where grade=${grade}`).then((mydata)=>{
                let myid = []
                let myname = []
                let mygrade = []
                let mypoints = []
                let myprize = []
                //Get data from database and push it to array to be displayed in table
                //Also check if the user has enough points to get a prize
                for (var i = 0; i < mydata.length; i++) {
                    if (data.id.length == 0){
                        console.log("1") 
                        myid.push(mydata[i].id)
                        myname.push(mydata[i].name)
                        mygrade.push(mydata[i].grade)
                        mypoints.push(mydata[i].points)
                        if (mydata[i].points >= 3&&mydata[i].points < 6){
                            myprize.push("Stuffed Animal")
                        }if (mydata[i].points >= 6&&mydata[i].points < 9){
                            myprize.push("Pizza Party")
                        }if (mydata[i].points >= 9){
                            myprize.push("Movie Night")
                        }else {
                            myprize.push("No Prize")
                        }
                    }else if (data.id.length != 0){
                        console.log("2")
                        setData({
                            id : [],
                            name : [],
                            grade: [],
                            points: [],
                            prize: []
                        })
                    }
                }
                setData({
                    id : myid,
                    name : myname,
                    grade: mygrade,
                    points: mypoints,
                    prize: myprize
                })
            })
        }
        catch (error) {
            console.log('error')
        }
    }

    return(
        <div>
            <Random quarter={props.quarter}/>
            <hr style={{border: '1px dashed aqua'}}></hr>
            <h1 style={{fontSize: 20}}>Quarter {props.quarter} Report For Each Grade</h1>
            <div style={{display: 'flex',gap: '30px',justifyContent: 'center',marginTop: '2%'}}>
            {/*9th Grade*/}
            <h1 style={{fontSize: 20}}>9th Grade</h1>
            <motion.div style={{display: 'inline-block'}} whileHover={{scale: 1.2}} whileTap={{ scale: 0.9 }}>
                <Button onClick={()=> {dataFilter(9);setShow({val1: !show.val1,val2: show.val2, val3: show.val3, val4: show.val4})}}
                    >{show.val1 ? "Get Report": "Hide Report"}</Button>
            </motion.div>
            <Modal
        opened={!show.val1}
        onClose={() => {setShow({val1: !show.val1, val2: show.val2, val3: show.val3, val4: show.val4});dataFilter()}}
        title={"9th Grade Report Quarter "+props.quarter}
        size="xl"
            >
            <Table horizontalSpacing="xl" highlightOnHover withColumnBorders>
                <tbody>
                {show.val1 ? "": <Data/>}
                </tbody>
            </Table>
        </Modal>
        {/*10th Grade*/}
        <h1 style={{fontSize: 20}}>10th Grade</h1>
            <motion.div style={{display: 'inline-block'}} whileHover={{scale: 1.2}} whileTap={{ scale: 0.9 }}>
                <Button onClick={()=> {dataFilter(10);setShow({val1: show.val1,val2: !show.val2, val3: show.val3, val4: show.val4})}}
                    >{show.val2 ? "Get Report": "Hide Report"}</Button>
            </motion.div>
            <Modal
        opened={!show.val2}
        onClose={() => {setShow({val1: show.val1,val2: !show.val2, val3: show.val3, val4: show.val4});dataFilter()}}
        title={"10th Grade Report Quarter "+props.quarter}
        size="xl"
            >
            <Table horizontalSpacing="xl" highlightOnHover withColumnBorders>
                <tbody>
                {show.val2 ? "": <Data/>}
                </tbody>
            </Table>
        </Modal>
        </div>
        <div style={{display: 'flex',gap: '30px',justifyContent: 'center',marginTop: '5%'}} >
        {/*11th Grade*/}
        <h1 style={{fontSize: 20}}>11th Grade</h1>
            <motion.div style={{display: 'inline-block'}} whileHover={{scale: 1.2}} whileTap={{ scale: 0.9 }}>
                <Button onClick={()=> {dataFilter(11);setShow({val1: show.val1,val2: show.val2,val3: !show.val3, val4: show.val4})}}
                    >{show.val3 ? "Get Report": "Hide Report"}</Button>
            </motion.div>
            <Modal
        opened={!show.val3}
        onClose={() => {setShow({val1: show.val1,val2: show.val2,val3: !show.val3, val4: show.val4});dataFilter()}}
        title={"11th Grade Report Quarter "+props.quarter}
        size="xl"
            >
            <Table horizontalSpacing="xl" highlightOnHover withColumnBorders>
                <tbody>
                {show.val3 ? "": <Data/>}
                </tbody>
            </Table>
        </Modal>
        {/*12th Grade*/}
        <h1 style={{fontSize: 20}}>12th Grade</h1>
            <motion.div style={{display: 'inline-block'}} whileHover={{scale: 1.2}} whileTap={{ scale: 0.9 }}>
                <Button onClick={()=> {dataFilter(12);setShow({val1: show.val1,val2: show.val2,val3: show.val3, val4: !show.val4})}}
                    >{show.val4 ? "Get Report": "Hide Report"}</Button>
            </motion.div>
            <Modal
        opened={!show.val4}
        onClose={() => {setShow({val1: show.val1,val2: show.val2,val3: show.val3, val4: !show.val4});dataFilter()}}
        title={"12th Grade Report Quarter "+props.quarter}
        size="xl"
            >
            <Table horizontalSpacing="xl" highlightOnHover withColumnBorders>
                <tbody>
                {show.val4 ? "": <Data/>}
                </tbody>
            </Table>
        </Modal>
        </div>
        <div style={{marginBottom: '5%'}}></div>
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
        <motion.div style={{display: 'inline-block'}} whileHover={{scale: 1.2}} whileTap={{scale: 0.8}}>
            <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} style={{width: 200,marginBottom: '10%'}} onClick={()=>setRandomPerson(getRandomPerson(props.quarter))}>Get Random Winner</Button>
        </motion.div>
      </div>
    )
  }
  

function ShowReport(){

    const [data,setData] = useState({
        id : [],
        name : [],
        grade: [],
        points: [],
        prize: []
    })

    const [show,setShow] = useState(true)

    //function to get data from database
    function Data(){
        return (
            <>
                <tr>
                    <th style={{fontSize: 15}}>Id</th>
                    <th style={{fontSize: 15}}>Name</th>
                    <th style={{fontSize: 15}}>Grade</th>
                    <th style={{fontSize: 15}}>Points</th>
                    <th style={{fontSize: 15}}>Prize</th>
                </tr>{data.id.map((item,index) => (
                    <tr key={index}>
                        <td style={{fontSize: 15}}>{item}</td>
                        <td style={{fontSize: 15}}>{data.name[index]}</td>
                        <td style={{fontSize: 15}}>{data.grade[index]}</td>
                        <td style={{fontSize: 15}}>{data.points[index]}</td>
                        <td style={{fontSize: 15}}>{data.prize[index]}</td>
                    </tr>
                ))}
            </>
        )
    }

    function dataFilter(){
        window.electron.notificationApi.receiveSQL('Select * from "final"').then((mydata)=>{
            let myid = []
            let myname = []
            let mygrade = []
            let mypoints = []
            let myprize = []
            //Get data from database and push it to array to be displayed in table
            //Also check if the user has enough points to get a prize
            for (var i = 0; i < mydata.length; i++) {
                if (data.id.length == 0){
                    console.log("1") 
                    myid.push(mydata[i].id)
                    myname.push(mydata[i].name)
                    mygrade.push(mydata[i].grade)
                    mypoints.push(mydata[i].points)
                    if (mydata[i].points >= 3&&mydata[i].points < 6){
                        myprize.push("Stuffed Animal")
                    }else if (mydata[i].points >= 6&&mydata[i].points < 9){
                        myprize.push("Pizza Party")
                    }else if (mydata[i].points >= 9){
                        myprize.push("Movie Night")
                    }else {
                        myprize.push("No Prize")
                    }
                }else if (data.id.length != 0){
                    console.log("2")
                    setData({
                        id : [],
                        name : [],
                        grade: [],
                        points: [],
                        prize: []
                    })
                }
            }
            setData({
                id : myid,
                name : myname,
                grade: mygrade,
                points: mypoints,
                prize: myprize
            })
        })
    }

    return(
        <div>
            <h1 style={{fontSize: 20}}>Final Report</h1>
            <motion.div style={{display: 'inline-block'}} whileHover={{scale: 1.2}} whileTap={{ scale: 0.9 }}>
                <Button onClick={()=> {dataFilter();setShow(!show)}}
                    >{show ? "Get Final Report": "Hide Report"}</Button>
            </motion.div>
            <Modal
        opened={!show}
        onClose={() => {setShow(!show);dataFilter()}}
        title="Report Of Students Data"
        size="xl"
            >
            <Table horizontalSpacing="xl" highlightOnHover withColumnBorders>
                <tbody>
                {show ? "": <Data/>}
                </tbody>
            </Table>
        </Modal>
        </div>
    )
}

export default Report;