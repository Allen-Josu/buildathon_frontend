import { Card, Col, Row } from "antd";
import {
  Book,
  BookCheckIcon,
  Calculator,
  NotebookIcon,
  Paperclip,
} from "lucide-react";
import "./Card1.css";

function Card1() {
  const cardMenu = [
    {
      title: "Notes",
      icon: NotebookIcon,
    },

    {
      title: "PYQ",
      icon: Paperclip,
    },
    {
      title: "Attendance",
      icon: BookCheckIcon,
    },
    {
      title: "Model Questions",
      icon: Book,
    },

    {
      title: "Grade Predictor",
      icon: Calculator,
    },
  ];
  return (
    <Row gutter={[16,16]}>
      {/* Render the first row with 3 cards */}
      {cardMenu.slice(0, 3).map((item, index) => (
         <Col span={7} key={index}>
         {" "}
         {/* span={12} means each column takes up 1/2 of the row */}
         <Card className="bg-[#27272a] text-white">
           <div className="box">
             <item.icon  />
             <h5>{item.title}</h5>
           </div>
         </Card>
       </Col>
      ))}

      {/* Render the second row with 2 cards */}
      {cardMenu.slice(3).map((item, index) => (
        <Col span={7} key={index}>
          {" "}
          {/* span={12} means each column takes up 1/2 of the row */}
          <Card className="bg-[#27272a] text-white">
            <div className="box">
              <item.icon style={{ color: "white" }} size={35} /> 
              <h5>{item.title}</h5>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Card1;
