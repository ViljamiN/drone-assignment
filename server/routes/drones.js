const { default: axios } = require("axios")
const express = require("express")

const router = express.Router()

// Handling drone-request
router.get("/", (req, res, next) => {

  axios.get("http://assignments.reaktor.com/birdnest/drones")
    .then(response => {
      // send response to client in xml format
      res.send(response.data)
    })
    .catch(error => {
      console.log(error);
    })

})

module.exports = router