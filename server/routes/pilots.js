const { default: axios } = require("axios")
const express = require("express")

const router = express.Router()
  
// Handling pilots-request
router.get("/", (req, res, next) => {

  const serialNumber = req.query.serialNumber;
  //console.log("http://assignments.reaktor.com/birdnest/pilots/" + serialNumber);

  axios.get("http://assignments.reaktor.com/birdnest/pilots/" + serialNumber)
    .then(response => {
      // send response to client in xml format
      res.send(response.data)
    })
    .catch(error => {
      console.log(error);
    })

})

module.exports = router