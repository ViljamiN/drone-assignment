const path = require("path")
const express = require("express")

// Importing the routes
const droneRoute = require("./routes/drones.js")
const pilotRoute = require("./routes/pilots.js")


const PORT = process.env.PORT || 3001;

// Creating express server
const app = express()

// Handling routes request
app.use("/drones", droneRoute)
app.use("/pilots", pilotRoute)

app.listen(PORT, () => { console.log(`Server listening on ${PORT}`) })

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});