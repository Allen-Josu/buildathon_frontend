import './Header.css';

export default function Header() {
  return (
    <div>
      {/* Header with Navigation Links */}
      <header className="header bg-[#27272a]">
        <div className="header-logo">
          <h1>Edubuddy</h1>
        </div>
        <nav className="header-nav">
          <ul>
            <li><a href="/notes">Notes</a></li>
            <li><a href="#grade-predictor">Grade Predictor</a></li>
            <li><a href="/model-question-generator">Model Question Paper</a></li>
            <li><a href="/pyq">PYQ</a></li>
            <li><a href="#attendance-calculator">Attendance Calculator</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
        <button className="signin-btn">Sign In</button>
      </header>

      {/* Sections that will be scrolled to */}


    </div>
  );
};

