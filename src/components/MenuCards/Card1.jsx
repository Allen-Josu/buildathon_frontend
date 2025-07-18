import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import {
  Book,
  BookCheckIcon,
  Calculator,
  NotebookIcon,
  Paperclip,
} from "lucide-react";

export default function Card1() {
  const cardMenu = [
    {
      title: "Notes",
      icon: NotebookIcon,
      path: "/notes",
    },
    {
      title: "Grade Calculator",
      icon: Calculator,
      path: "/grade-calculator",
    },
    {
      title: "Model Questions",
      icon: Book,
      path: "/model-question-paper",
    },
    {
      title: "PYQ",
      icon: Paperclip,
      path: "/pyq"
    },
    {
      title: "Attendance",
      icon: BookCheckIcon,
      path: "/attendance-calculator",
    },
  ];

  return (
    <div className="card-container">
      <style>
        {`
          .card-container {
            position: relative;
            width: 100%;
          }
          
          .box {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            min-height: 50px;
            width: 100%;
            color: black;
          }

          .card {
            background-color: rgb(39 39 42 / var(--tw-bg-opacity, 1));
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            height: 100%;
            transform-origin: center;
            transition: all 0.3s ease;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }

          .card:hover {
            transform: scale(0.98);
            border: 2px solid rgba(255, 255, 255, 0.1);
            background-color: #6d28d9;
            box-shadow: 0 2px 8px rgba(109, 40, 217, 0.2);
          }

          /* For small devices (Mobile screens) */
          @media (max-width: 480px) {
            .box {
              min-height: 40px;
              padding: 15px;
            }

            .card h6 {
              font-size: 0.7rem;
            }
          }

          /* For medium devices */
          @media (min-width: 480px) and (max-width: 768px) {
            .box {
              min-height: 50px;
            }

            .card h6 {
              font-size: 1rem;
            }
          }

          /* For large devices */
          @media (min-width: 768px) {
            .box {
              min-height: 80px;
            }

            .card h6 {
              font-size: 1.2rem;
            }
          }
        `}
      </style>

      <Row gutter={[16, 16]}>
        {cardMenu.map((item, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Link to={item.path} style={{ textDecoration: 'none' }}>
              <Card className="card text-white">
                <div className="box">
                  <item.icon style={{ color: "white" }} size={28} />
                  <h6 style={{ color: 'white', margin: 0 }}>{item.title}</h6>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}