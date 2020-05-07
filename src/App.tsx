import React, { useEffect, useState } from 'react';
import './App.css';
import Rowma from 'rowma_js';

function App() {
  const [rowma, setRowma] = useState<any>(null);
  const [socket, setSocket] = useState<any>(null);
  const [robotUuids, setRobotUuids] = useState<Array<string>>([]);
  const [selectedRobotUuid, setSelectedRobotUuid] = useState<string>('');

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
    </div>
  );
}

export default App;
