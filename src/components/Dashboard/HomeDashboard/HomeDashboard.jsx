import React from 'react';
import './HomeDashboard.css'; // Ensure your styles are imported
import project_pic from "../../../assets/projectpic.png"; // Path to your image
import Card1 from '../../MenuCards/Card1';

const HomeDashboard = () => {
  const handleMouseMove = (event) => {
    const image = document.querySelector('.project-image'); // Get the image element
    const { clientX: mouseX, clientY: mouseY } = event;
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

    // Calculate mouse position relative to the window
    const moveX = (mouseX / windowWidth) * 30 - 20; // Adjust for more/less movement
    const moveY = (mouseY / windowHeight) * 50 - 10; // Adjust for more/less movement

    // Apply the transformation to the image
    image.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  return (
    <div className="outer">
      <div className="outer1">
        <h1>Edubuddy</h1>
        <p id="details">
          Unlock your full academic potential with Edubuddy, a one-stop platform designed to make studying smarter, not harder. 
          Whether you are gearing up for exams or looking to stay on top of your coursework, Edubuddy has you covered.
        </p>
        <div className="boxes">
          <Card1 />
        </div>
      </div>
      <div className="outer2">
        <img
          src={project_pic}
          height={200}
          className="project-image"
          alt="Project"
          onMouseEnter={() => document.querySelector('.project-image').style.transition = "transform 0.1s ease-out"}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => document.querySelector('.project-image').style.transform = "translate(0, 0)"} // Reset position when mouse leaves
        />
      </div>
    </div>
  );
};

export default HomeDashboard;
