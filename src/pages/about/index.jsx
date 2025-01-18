// Import Font Awesome CSS - make sure this path matches your project structure
import "@fortawesome/fontawesome-free/css/all.min.css";
// Import team member images
import sid from "../../assets/sid.jpg" 
import pavi from "../../assets/pavi.jpg"
import roshin from "../../assets/roshin.jpg"
import allen from "../../assets/allen.jpg"
import Header from '../../components/Header/Header';

// Content object containing all the text content
const content = {
  title: "EduBuddy",
  introduction: `Welcome to EduBuddy, your ultimate companion in academic success! 
  Our platform is designed to empower students by providing innovative tools and 
  resources that make learning more accessible, efficient, and engaging.

  At EduBuddy, we understand the challenges students face in managing their academic journey. 
  That's why we've built a platform that combines essential features to streamline your study 
  routine, improve productivity, and ensure you're always on track.`,
  features: [
      {
          title: "A Repository of User-Uploaded Notes",
          details: `Access a vast collection of notes uploaded by fellow students.
          Notes are ranked by community votes for credibility and quality, ensuring you get 
          the best study materials. Share your own notes and contribute to the learning community!`
      },
      {
          title: "Grade Calculator",
          details: `Worried about your academic performance? Our grade calculator uses your 
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
          you maintain the required minimum to stay compliant with your institution's policies.`
      },
      {
          title: "Access to Previous Year Question Papers",
          details: `Browse a collection of past question papers to understand exam patterns and frequently 
          asked questions. Use these as a guide to prepare effectively for your exams.`
      }
  ],
  benefits: [
      "Student-Centric Design: Every feature is built with students' needs in mind.",
      "Community-Driven: Contribute, collaborate, and learn from a thriving community of students.",
      "Efficiency at Its Best: From predicting grades to managing attendance, EduBuddy saves you time and helps you focus on what truly matters—learning.",
      "Reliable Resources: All content is vetted by community voting to ensure quality and relevance."
  ],
  callToAction: `Whether you're looking to ace your exams, stay on top of your attendance, or share 
  and discover valuable notes, EduBuddy is here to support your academic journey. Together, let's 
  make learning more effective and enjoyable!`,
  slogan: "Your education, your buddy—EduBuddy"
};

export default function About() {
  // Team members data array
  const teamMembers = [
    {
      name: "Allen Joseph Joy",
      role: "Developer",
      image: allen,
      email: "allenalackaparambil@gmail.com",
      linkedin: "http://www.linkedin.com/in/allen-joseph-joy",
      github: "https://github.com/Allen-Josu",
    },
    {
      name: "Roshin Sleeba C",
      role: "Developer",
      image: roshin,
      email: "roshinsleebac2002@gmail.com",
      linkedin: "https://www.linkedin.com/in/roshin-sleeba-c-112466320",
      github: "https://github.com/Roshinsleeba",
    },
    {
      name: "Sidharth P R",
      role: "Developer",
      image: sid,
      email: "sidharthprsidhu@gmail.com",
      linkedin: "https://www.linkedin.com/in/sidharth-p-r-8088a0327",
      github: "https://github.com/Sidharthpr",
    },
    {
      name: "Pavi Sankar N P",
      role: "Developer",
      image: pavi,
      email: "pavisankarneelamana@gmail.com",
      linkedin: "https://www.linkedin.com/in/pavi-sankar-n-p-492518290",
      github: "https://github.com/pavi-sankar",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-800 font-montserrat">
      <Header />
      {/* Main container */}
      <div className="container mx-auto px-4 mt-5">
        {/* Team section */}
        <h3 className="mb-4 text-white text-2xl">Core Team</h3>
        <hr className="border-gray-600 mb-5" />
        
{/* Team members grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {teamMembers.map((member, index) => (
    <div key={index} className="flex justify-center">
      {/* Team member card */}
      <div 
        className="w-[17rem] h-[17.5rem] rounded-lg bg-zinc-800 
        transition-all duration-500 hover:bg-gradient-to-br hover:from-purple-700 
        hover:to-purple-900 flex flex-col items-center p-3 transform hover:scale-105"
      >
        <div className="w-[10rem] h-[10rem] rounded-full overflow-hidden border-3 border-white shadow-lg mb-3">
  <img
    src={member.image}
    alt={`${member.name}'s profile`}
    className="w-full h-full object-cover"
  />
</div>
        {/* Member details */}
        <div className="flex flex-col items-center flex-grow">
          <h5 className="text-white text-lg font-semibold">{member.name}</h5>
          <p className="text-white text-sm mb-2">{member.role}</p>
          {/* Social links */}
          <div className="flex justify-center gap-5 mt-auto">
            <a 
              href={`mailto:${member.email}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              <i className="fas fa-envelope text-2xl"></i>
            </a>
            <a 
              href={member.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a 
              href={member.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              <i className="fab fa-github text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>




        {/* About content section */}
        <div className="mt-20 mx-auto max-w-6xl bg-gradient-to-br from-neutral-700 
        to-zinc-800 rounded-lg shadow-2xl p-8 text-white">
          {/* Title */}
          <h2 className="mb-8 text-4xl text-center font-bold animate-fade-in">
            {content.title}
          </h2>
          
          {/* Introduction */}
          <p className="leading-relaxed mb-6 text-lg text-center animate-fade-in 
          whitespace-pre-line">
            {content.introduction}
          </p>

          {/* Features section */}
          <h2 className="mb-6 text-3xl text-center text-white animate-fade-in">
            What We Offer
          </h2>
          
          {/* Features list */}
          <ul className="mb-6 space-y-4">
            {content.features.map((feature, index) => (
              <li 
                key={index}
                className="text-lg transition-transform duration-200 hover:scale-102 
                cursor-pointer animate-fade-in"
              >
                <strong className="text-white">{feature.title}:</strong>{' '}
                <span className="whitespace-pre-line">{feature.details}</span>
              </li>
            ))}
          </ul>

          {/* Benefits section */}
          <h2 className="mb-6 text-3xl text-center text-white animate-fade-in">
            Why Choose EduBuddy?
          </h2>
          
          {/* Benefits list */}
          <ul className="mb-6 space-y-4">
            {content.benefits.map((benefit, index) => (
              <li
                key={index}
                className="text-lg transition-transform duration-200 hover:scale-102 
                cursor-pointer animate-fade-in"
              >
                <strong className="text-white">{benefit}</strong>
              </li>
            ))}
          </ul>

          {/* Call to action section */}
          <h2 className="mb-6 text-3xl text-center animate-fade-in">
            Join Us Today!
          </h2>
          
          <p className="leading-relaxed mb-6 text-lg text-center animate-fade-in 
          whitespace-pre-line">
            {content.callToAction}
          </p>
          
          {/* Slogan */}
          <p className="italic text-lg text-center animate-fade-in">
            <em>{content.slogan}</em>
          </p>
          
          {/* Footer */}
          <div className="mt-8 text-center text-gray-400 text-sm animate-fade-in">
            &copy; 2025 EduBuddy. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}