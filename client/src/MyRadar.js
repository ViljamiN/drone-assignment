import React from 'react';
import p5 from 'p5';

class MyRadar extends React.Component {

  sketch(p) {
    let canvasSize = 500;
    let radarWindow = 500;
    let centerX = radarWindow/2;
    let centerY = radarWindow/2;
    var closestDistance = 100000;
    var closestFlyer = null;
    
    p.setup = function() {
      p.createCanvas(canvasSize, canvasSize);
      p.background(0);
      p.smooth();
    }

    p.draw = function() {
      p.background(0, 0, 0, 255);
      let speed = p.frameCount/30;
      let px = 100 * p.cos(speed);
      let py = 100 * p.sin(speed);  
      p.strokeWeight(3);
      p.stroke(0, 255, 0);
      p.noFill();
      p.ellipse(centerX, centerY, 5);
      p.ellipse(centerX, centerY, radarWindow/2.5);
      p.ellipse(centerX, centerY, radarWindow/4);
      p.ellipse(centerX, centerY, radarWindow/10);
      p.square(0, 0, radarWindow)
      var radarline = [{x: centerX-px, y: centerY-py}, {x: centerX+px, y: centerY+py}];
      p.line(radarline[0].x, radarline[0].y, radarline[1].x,radarline[1].y);
      
      // Loop through violators, draw them on the radar and update their information on screen
      for (const sn in this.violators) {

        // Draw the violator on the radar
        p.fill(255, 0, 0);
        p.strokeWeight(2);
        p.ellipse(this.violators[sn].x/1000, this.violators[sn].y/1000, 10);

        // Check if there is a div for the violator's sn already
        let snHasDiv = document.getElementById(sn);
        if (!snHasDiv) {
          // Create a new div element if one doesn't exist
          let newDiv = document.createElement("div");
          newDiv.id = sn;
          newDiv.className = "single-user";
          newDiv.innerHTML = this.violators[sn].name + "<br/>" + this.violators[sn].email + "<br/>" + this.violators[sn].phone + "<br/> Last seen: " + this.violators[sn].timeNow + "<br/> Closest distance to nest: " + Math.round(this.violators[sn].distance/1000) + "m";
          // Get a reference to the information panel element
          let infoPanel = document.getElementById("info-panel");
          // Append the new div to the said element
          infoPanel.appendChild(newDiv);
        }
        else {
          //If the div already exists, update its information
          snHasDiv.innerHTML = this.violators[sn].name + "<br/>" + this.violators[sn].email + "<br/>" + this.violators[sn].phone + "<br/> Last seen: " + this.violators[sn].timeNow + "<br/> Closest distance to nest: " + Math.round(this.violators[sn].distance/1000) + "m";
        }
      }

      // Remove the divs for violators that are no longer in the system and update the closest distance
      let divElements = document.getElementsByClassName("single-user");
      for (let i = 0; i < divElements.length; i++) {
        if (!this.violators[divElements[i].id]) {
          divElements[i].parentNode.removeChild(divElements[i]);
          // If the closest flyer is no longer in the system, reset the closest distance
          if (this.violators[divElements[i].id] === closestFlyer) {
            closestDistance = 100000;
            closestFlyer = null;
          }
        }
        else {
          // Keep track of the shortest distance between a violator and the center of the radar
          closestDistance = Math.min(this.violators[divElements[i].id].distance, closestDistance);
          if (closestDistance === this.violators[divElements[i].id].distance) {
            closestFlyer = this.violators[divElements[i].id];
          }
        }
      }
      // Display the closest distance to the nest
      if (closestDistance !== 100000) {
        var closestDistanceP = document.getElementById("closest-distance-p");
        closestDistanceP.innerHTML = "Closest distance to the nest in the last 10 minutes: " + Math.round(closestDistance/1000) + "m";
      }
    }
  }

  componentDidMount() {
    var myp5sketch = new p5(this.sketch, this.container);
    myp5sketch.violators = this.props.violators;
  }

  render() {
    return (
      <div className="system-container">
        <div className="left">
          <div className="system-information">
            <h1>System Information</h1>
            <p>System Name: GUARDB1RD</p>
            <p>Total violations in the last 10 minutes: {document.getElementsByClassName("single-user").length}</p>
            <p id="closest-distance-p">Closest distance to the nest in the last 10 minutes: NaN</p>
          </div>
          <div ref={ref => this.container = ref} className="canvas-container"></div>
        </div>
        <div className="right">
          <div id="info-panel" className="info-panel"></div>
        </div>
      </div>
    );
  }
}

export default MyRadar;