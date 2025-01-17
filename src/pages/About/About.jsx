
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import { Card } from "react-bootstrap";
import "./About.css";
import sid from "../../assets/sid.jpg" 
import pavi from "../../assets/pavi.jpg"
import roshin from "../../assets/roshin.jpg"
import allen from "../../assets/allen.jpg"
import Header from "../../components/Header/header";

const content = {
  title: "EduBuddy",
  introduction: `Welcome to EduBuddy, your ultimate companion in academic success! 
  Our platform is designed to empower students by providing innovative tools and 
  resources that make learning more accessible, efficient, and engaging.

  At EduBuddy, we understand the challenges students face in managing their academic journey. 
  That’s why we’ve built a platform that combines essential features to streamline your study 
  routine, improve productivity, and ensure you’re always on track.`,
  features: [
      {
          title: "A Repository of User-Uploaded Notes",
          details: `Access a vast collection of notes uploaded by fellow students.
          Notes are ranked by community votes for credibility and quality, ensuring you get 
          the best study materials. Share your own notes and contribute to the learning community!`
      },
      {
          title: "Grade Predictor",
          details: `Worried about your academic performance? Our grade predictor uses your 
          inputs to estimate your potential grades. Identify areas of improvement and stay ahead in your studies.`
      },
      {
          title: "Model Question Paper Generator",
          details: `Create tailored question papers from your syllabus and previous year questions (PYQ).
          Perfect for exam preparation and practice.`
      },
      {
          title: "Attendance Calculator",
          details: `Keep track of your attendance effortlessly. Calculate your total attendance and ensure 
          you maintain the required minimum to stay compliant with your institution’s policies.`
      },
      {
          title: "Access to Previous Year Question Papers",
          details: `Browse a collection of past question papers to understand exam patterns and frequently 
          asked questions. Use these as a guide to prepare effectively for your exams.`
      }
  ],
  benefits: [
      "Student-Centric Design: Every feature is built with students’ needs in mind.",
      "Community-Driven: Contribute, collaborate, and learn from a thriving community of students.",
      "Efficiency at Its Best: From predicting grades to managing attendance, EduBuddy saves you time and helps you focus on what truly matters—learning.",
      "Reliable Resources: All content is vetted by community voting to ensure quality and relevance."
  ],
  callToAction: `Whether you’re looking to ace your exams, stay on top of your attendance, or share 
  and discover valuable notes, EduBuddy is here to support your academic journey. Together, let’s 
  make learning more effective and enjoyable!`,
  slogan: "Your education, your buddy—EduBuddy"
};

export default function About() {
  const teamMembers = [
    {
      name: "Allen Joseph Joy",
      role: "Developer", // Corrected spelling from "Devoloper" to "Developer"
      image: allen,
      email: "allenalackaparambil@gmail.com",
      linkedin: "http://www.linkedin.com/in/allen-joseph-joy",
      github:"https://github.com/Allen-Josu",
    },
    {
      name: "Roshin Sleeba C",
      role: "Developer",
      image: roshin,
      email:"roshinsleebac2002@gmail.com",
      linkedin:"https://www.linkedin.com/in/roshin-sleeba-c-112466320",
      github:"https://github.com/Roshinsleeba",
    },
    {
      name: "Sidharth P R",
      role: "Developer", // Corrected spelling from "Devoloper" to "Developer"
      image: sid,
      email: "sidharthprsidhu@gmail.com",
      linkedin: "https://www.linkedin.com/in/sidharth-p-r-8088a0327",
      github: "https://github.com/Sidharthpr",
    },
    {
      name: "Pavi Sankar N P",
      role: "Developer", // Corrected spelling from "Devoloper" to "Developer"
      image: pavi,
      email:"pavisankarneelamana@gmail.com",
      linkedin:"https://www.linkedin.com/in/pavi-sankar-n-p-492518290",
      github:"https://github.com/pavi-sankar",
    },
  ];

  return (

    <div style={{backgroundColor: "#27272a", minHeight: "100vh" }}>
      <Header />
      <div className="container mt-5">
    <h3 className="mb-4 text-white">Core Team</h3>
    <hr className="text-secondary style mb-5" />
    <div className="row row-cols-1 row-cols-md-4 g-4">
        {teamMembers.map((member, index) => (
            <div className="col" key={index}>
                <Card
                    className="h-100 d-flex flex-column text-center card-custom"
                    style={{
                        height: "250px",
                        width: "270px",
                        borderRadius: "10px",
                        overflow: "hidden", // Ensures no overflow from internal elements
                        backgroundColor: "#27272a", // Default background color
                        transition: "background 5s cubic-bezier(0.4,0,1,1)", // Smooth transition for background change
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "linear-gradient(135deg, #6a11cb 0%, rgb(45, 21, 81) 100%)"; // Gradient on hover
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#27272a"; // Revert to default color
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
                            backgroundColor: "transparent", // Inherits the card's background color
                            flexGrow: 1, // Ensures it fills available space
                        }}
                    >
                        <Card.Title className="text-white">{member.name}</Card.Title>
                        <Card.Subtitle className="mb-4 text-white">{member.role}</Card.Subtitle>
                        <div className="mt-auto d-flex justify-content-center gap-5 m-3">
                            <a href={`mailto:${member.email}`} target="_blank" rel="noopener noreferrer">
                                <i className="fas fa-envelope text-white" style={{ fontSize: "24px" }}></i>
                            </a>
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin text-white" style={{ fontSize: "24px" }}></i>
                            </a>
                            <a href={member.github} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-github text-white" style={{ fontSize: "24px" }}></i>
                            </a>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        ))}
    </div>
    
          
        <div className="mt-5 w-96 text-white" style={{ padding: "20px", borderRadius: "10px", background: "linear-gradient(135deg, #3a3a3a, #27272a)", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", minWidth:"1200px",
    margin: "0 auto"  }}>
          <h2 style={{ 
              marginBottom: "2rem", 
              fontSize: "2.5rem", 
              textAlign: "center", 
              fontWeight: "bold", 
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)", 
              animation: "fadeIn 1s ease-in-out" 
          }}>{content.title}</h2>
          
          <p style={{ 
              lineHeight: "1.8", 
              marginBottom: "1.5rem", 
              fontSize: "1.2rem", 
              textAlign: "center", 
              animation: "fadeIn 1.5s ease-in-out" 
          }}>{content.introduction}</p>

          <h2 style={{ 
              marginBottom: "1.5rem", 
              fontSize: "2rem",  
              textAlign: "center", 
              color: "white", 
              animation: "fadeIn 2s ease-in-out" 
          }}>What We Offer</h2>
          
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "20px", listStyleType: "none" }}>
            {content.features.map((feature, index) => (
              <li key={index} style={{ 
                  marginBottom: "1rem", 
                  fontSize: "1.1rem", 
                  transition: "transform 0.2s, color 0.2s", 
                  cursor: "pointer", 
                  animation: "fadeIn 2.5s ease-in-out" 
              }} 
              onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.color = "white";
              }} 
              onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.color = "white";
              }}>
                <strong style={{ color: "white" }}>{feature.title}:</strong> {feature.details}
              </li>
            ))}
          </ul>

          <h2 style={{ 
              marginBottom: "1.5rem", 
              fontSize: "2rem", 
              textAlign: "center", 
              color: "white", 
              animation: "fadeIn 3s ease-in-out" 
          }}>Why Choose EduBuddy?</h2>
          
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "20px", listStyleType: "none" }}>
            {content.benefits.map((benefit, index) => (
              <li key={index} style={{ 
                  marginBottom: "1rem", 
                  fontSize: "1.1rem", 
                  transition: "transform 0.2s, color 0.2s", 
                  cursor: "pointer", 
                  animation: "fadeIn 3.5s ease-in-out" 
              }} 
              onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.color = "rwhite";
              }} 
              onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.color = "white";
              }}>
                <strong style={{ color: "white" }}>{benefit}</strong>
              </li>
            ))}
          </ul>

          <h2 style={{ 
              marginBottom: "1.5rem", 
              fontSize: "2rem", 
              textAlign: "center", 
              animation: "fadeIn 4s ease-in-out" 
          }}>Join Us Today!</h2>
          
          <p style={{ 
              lineHeight: "1.8", 
              marginBottom: "1.5rem", 
              fontSize: "1.2rem", 
              textAlign: "center", 
              animation: "fadeIn 4.5s ease-in-out" 
          }}>{content.callToAction}</p>
          
          <p style={{ 
              fontStyle: "italic", 
              fontSize: "1.2rem", 
              textAlign: "center", 
              animation: "fadeIn 5s ease-in-out" 
          }}><em>{content.slogan}</em></p>
          
          <div className="footer" style={{ 
              marginTop: "2rem", 
              textAlign: "center", 
              fontSize: "1rem", 
              color: "#ccc", 
              animation: "fadeIn 5.5s ease-in-out" 
          }}>
              &copy; 2025 EduBuddy. All rights reserved.
          </div>
        </div>
        </div>
    </div>
  );
}