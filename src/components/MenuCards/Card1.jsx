import React from "react";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import {
  Book,
  BookCheckIcon,
  Calculator,
  NotebookIcon,
  Paperclip,
} from "lucide-react";

function Card1() {
  const cardMenu = [
    {
      title: "Notes",
      icon: NotebookIcon,
      path: "/notes",
    },
    {
      title: "PYQ",
      icon: Paperclip,
      path: "/pyq"
    },
    {
      title: "Attendance",
      icon: BookCheckIcon,
      path:"/attendance",
    },
    {
      title: "Model Questions",
      icon: Book,
      path:"/model-question-generator",
    },
    {
      title: "Grade Calculator",
      icon: Calculator,
      path:"/grade",
    },
  ];

  return (
    <div>
      {/* Inline CSS for responsiveness */}
      <style>
        {`
         
          .box {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            height: 50px;
            width: fit-content;
            color:black;
          }

          .card:hover {
            transform: scale(0.95, 0.95); 
            border: 2px solid rgb(85, 85, 247); 
            background-color: #6d28d9; /* Force background color change on hover */
            transition: transform 0.3s ease, border 0.3s ease, background-color 0.3s ease; 
            cursor: pointer; 
          }
            .card{
            background-color: rgb(39 39 42 / var(--tw-bg-opacity, 1))
            border:solid 2px red;
            }

       
          /* For small devices (Mobile screens) */
          @media (max-width: 480px) {
            .box {
              height: 40px; /* Smaller height for mobile */
              
            }

            .card h5 {
              font-size: 0.7rem; /* Smaller text on mobile */
            }

            .card svg {
              font-size: 30px; /* Smaller icons for mobile */
            }

            .card .box {
              padding: 15px;
            }
          }

          /* For medium devices (Tablets in portrait mode and small laptops) */
          @media (min-width: 480px) and (max-width: 768px) {
           
            .box {
              height: 50px; /* Standard height for medium screens */
            }

            .card h5 {
              font-size: 1.3rem; /* Slightly smaller text on medium screens */
            }

            .card svg {
              font-size: 35px; /* Normal icons for medium screens */
            }

            /* Column adjustments for medium screens */
            .ant-col {
              span: 12; /* Each card takes half the width on medium screens */
            }
          }

          /* For large devices (Desktops and large tablets) */
          @media (min-width: 768px) {
            .box {
              height: 80px; /* Increased height on larger screens */
            }

            .card h5 {
              font-size: 1.5rem; /* Larger text for better readability */
            }

            .card svg {
              font-size: 40px; /* Larger icons on larger screens */
            }

            /* Column adjustments for larger screens */
            .ant-col {
              span: 8; /* Each card takes 1/3 of the width on larger screens */
            }
          }
        `}
      </style>

      <Row gutter={[16, 16]}>
        {/* Render the first row with 3 cards */}
        {cardMenu.slice(0, 3).map((item, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Link to={item.path} style={{ textDecoration: 'none' }}>
            {/* Using responsive grid system for flexibility */}
            <Card className="card text-white border-white">
              <div className="box">
                <item.icon style={{ color: "white" }} size={28} />
                <h6 style={{ color: 'white' }}>{item.title}</h6>
              </div>
            </Card>
            </Link>
          </Col>

        ))}


        {/* Render the second row with 2 cards */}
        {cardMenu.slice(3).map((item, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Link to={item.path} style={{ textDecoration: 'none' }}>
            {/* Using responsive grid system for flexibility */}
            <Card className="card bg-[#27272a] text-white border-white ">
              <div className="box">
              <item.icon style={{ color: "white" }} size={28} />
                <h6 style={{ color: 'white' }}>{item.title}</h6>
              </div>
            </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Card1;
