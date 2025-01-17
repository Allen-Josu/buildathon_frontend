
import Header from "../../../Header/Header";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import { Card } from "react-bootstrap";
import "./About.css";

export default function About() {
  const teamMembers = [
    {
      name: "Alice Johnson",
      role: "Team Lead",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Bob Smith",
      role: "Developer",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Charlie Brown",
      role: "Designer",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Diana Prince",
      role: "Tester",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h3 className="mb-4 text-white">Core Team</h3>
        <hr className="text-secondary style"/>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {teamMembers.map((member, index) => (
            <div className="col" key={index}>
              <Card
                className="h-100 d-flex flex-column text-center card-custom"
                style={{
                  height: "350px",
                  borderRadius: "10px",
                  overflow: "hidden", // Ensures no overflow from internal elements
                }}
              >
                <Card.Img
                  variant="top"
                  src={member.image}
                  alt={`${member.name}'s profile`}
                  className="rounded-circle mx-auto mt-3"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    border: "5px solid white",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
                  }}
                />
                <Card.Body
                  className="d-flex flex-column"
                  style={{
                    backgroundColor: "inherit", // Inherits the card's background color
                    flexGrow: 1, // Ensures it fills available space
                  }}
                >
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Subtitle className="mb-4">{member.role}</Card.Subtitle>
                  <div className="mt-auto d-flex justify-content-center gap-5 m-3">
                    <i
                      className="fas fa-envelope"
                      style={{ fontSize: "24px" }}
                    ></i>
                    <i
                      className="fab fa-linkedin"
                      style={{ fontSize: "24px" }}
                    ></i>
                    <i
                      className="fab fa-github"
                      style={{ fontSize: "24px" }}
                    ></i>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
