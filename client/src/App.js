import React, { useState, useEffect, useCallback } from 'react';
import MyRadar from './MyRadar';

// Create an empty object to store the violators and a map to store the timers
const violators = {};
const timers = new Map();

// Fetch the user information from the server
async function getUserInfo(serialNumber) {
  try {
    const response = await fetch(`/pilots?serialNumber=${serialNumber}`);
    const data = await response.json(); // parse the JSON payload
    return data;
  } catch (error) {
    console.error(error);
  }  
}

// Update the data by fetching the user information and updating the datapoint
async function updateData(SN, distance, x, y, timeNow) {
  const result = await getUserInfo(SN);  // wait for the getUserInfo function to resolve
  updateDataPoint(SN, distance, result.firstName + " " + result.lastName, result.email, result.phoneNumber, x, y, timeNow);
}

function updateDataPoint(sn, distance, name, email, phone, x, y, timeNow) {
  if (violators[sn]) {
    violators[sn].timeNow = timeNow;
    violators[sn].x = x;
    violators[sn].y = y;  
  }
  else {
    violators[sn] = {distance, name, email, phone, x, y, timeNow};
  }
  if (violators[sn].distance > distance) {
    violators[sn].distance = distance;
  }
  if (timers.has(sn)) {
    clearTimeout(timers.get(sn));
  }
  const timer = setTimeout(() => {
    delete violators[sn];
    timers.delete(sn);
  }, 600000);  // 600000ms = 10 minutes
  timers.set(sn, timer);
}


function App() {

  const [xmlData, setXmlData] = useState(null);

  useEffect(() => {
    fetchData();
    handleDroneData(xmlData);
  }, [xmlData]);

  const fetchData = useCallback(() => {
    fetch('/drones')
      .then(response => response.text())
      .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then(data => setXmlData(data))
      .catch(err => console.log(err));
  }, []);

  const handleDroneData = (xmlData) => {
    // Only execute this code if xmlData has been fetched
    if (xmlData !== null) {

      // Get all the <drone> elements in the XML document
      var drones = xmlData.getElementsByTagName("drone");

      // Loop through the <drone> elements
      for (const drone of drones) {

        // Get the current <drone> element's serial number and position
        var [SN, positionXElement, positionYElement] = [(drone.querySelector("serialNumber")).textContent, (drone.querySelector("positionX")).textContent, (drone.querySelector("positionY")).textContent];
        
        // Calculate the distance between the <drone> element and the center of the restricted area
        var distance = Math.sqrt(Math.pow((positionXElement - 250000), 2) + Math.pow((positionYElement - 250000), 2));
        
        // Check if the <drone> element is within the restricted circle
        if (distance < 100000) {
          // If yes, update the data including the current time
          var today = new Date();
          var timeNow = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          updateData(SN, distance, positionXElement, positionYElement, timeNow);
        }
      }
    }
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MyRadar violators={violators} />
    </div>
  );
}


export default App;


  //safekeeping
  //const [serverSideDroneData, setServerSideDroneData] = useState([{}]);
  //const [serverSideUserData, setServerSideUserData] = useState([{}]);

  //in the useEffect, we get both users and drones from the server
  //useEffect(() => {
  //  fetchDrones();
  //  fetchUsers();
  //}, []);

  //const fetchDrones = () => {
  //  fetch('/drones')
  //  .then(res => res.json())
  //  .then(data => setServerSideDroneData(data));
  //}

  //const fetchUsers = () => {
  //  fetch('/users')
  //  .then(res => res.json())
  //  .then(data => setServerSideUserData(data));
  //}

  //return (
  //  <div>
  //    {(typeof serverSideDroneData.drones === 'undefined') ? (
  //      <p>Loading...</p>
  //    ) : (
  //      serverSideDroneData.drones.map((drone, i) => (
  //        <p key={i}>{drone}</p>
  //      ))
  //    )}
  //    {(typeof serverSideUserData.users === 'undefined') ? (
  //      <p>Loading...</p>
  //    ) : (
  //      serverSideUserData.users.map((user, i) => (
  //        <p key={i}>{user}</p>
  //      ))
  //    )}
  //  </div>
  //);
//}