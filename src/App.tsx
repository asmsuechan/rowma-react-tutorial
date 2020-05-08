import React, { useEffect, useState } from 'react';
import './App.css';
import Rowma from 'rowma_js';

function App() {
  const [rowma, setRowma] = useState<any>(null);
  const [socket, setSocket] = useState<any>(null);
  const [robotUuids, setRobotUuids] = useState<Array<string>>([]);
  const [selectedRobotUuid, setSelectedRobotUuid] = useState<string>('');

  const [robot, setRobot] = useState<any>(null);

  useEffect(() => {
    const _rowma = new Rowma();
    setRowma(_rowma);

    _rowma.currentConnectionList().then((connList: any) => {
      setRobotUuids(connList.data.map((robot: any) => robot.uuid));
    })
  }, [])

  const handleConnectionListChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRobotUuid(event.target.value)
  }

  const handleConnectClicked = () => {
    rowma.connect(selectedRobotUuid).then((sock: any) => {
      setSocket(sock)
    }).catch((e: any) => {
      console.log(e)
    })

    rowma.getRobotStatus(selectedRobotUuid).then((res: any) => {
      setRobot(res.data)
    })
  }

  const handleRostopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event)
  }

  return (
    <div className="App">
      <select onChange={handleConnectionListChange}>
        <option value=''>{''}</option>
        {robotUuids.length > 0 && (
          robotUuids.map((uuid: string) => {
            return(
              <option key={uuid} value={uuid}>{uuid}</option>
            )
          })
        )}
      </select>
      <button
        disabled={selectedRobotUuid === ''}
        onClick={handleConnectClicked}
      >
        Connect
      </button>
      <div>
        {robot && robot.rostopics.length > 0 && (
      	  <select onChange={handleRostopicChange}>
      	    <option value=''>{''}</option>
            {robot.rostopics.map((topic: string) => {
      	      return(
      	        <option key={topic} value={topic}>{topic}</option>
      	      )
      	    })}
      	  </select>
        )}
      </div>
    </div>
  );
}

export default App;
