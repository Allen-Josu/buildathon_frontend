import React from "react";
import Header from '../../components/Header/header';
import "../../css/homePage.css"

export default function Home() {

  return (
    <>
      <Header/>

      <div class="outer">
        <div class="outer1">
            <h1>Edubuddy</h1>
            <p id='details'>Unlock your full academic potential with Edubuddy, a one-stop platform designed to make studying smarter, not harder. Whether you're gearing up for exams or looking to stay on top of your coursework, Edubuddy has you covered.</p>
        </div>
        <div class="outer2">
            <img src='https://www.21kschool.com/us/wp-content/uploads/sites/37/2022/09/How-Online-Education-is-Better-Than-Classroom-Education.jpg'></img>
        </div>
    </div>
    </>
  )
}
