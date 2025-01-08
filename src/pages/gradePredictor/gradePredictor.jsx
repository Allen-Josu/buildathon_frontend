import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Header from '../../components/Header/header';

export default function GradePredictor() {
  // State to store the form data
  const [internalMarks1, setInternalMarks1] = useState('');
  const [internalMarks2, setInternalMarks2] = useState('');
  const [assignment, setAssignment] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can process the data here (e.g., calculating grades, sending to a server)
    console.log('Form Submitted:', { internalMarks1, internalMarks2, assignment });
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen flex flex-col justify-center items-center  bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Grade Predictor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="internalMarks1" className="block text-gray-700">Internal Marks 1(out of 20)</label>
            <input
              type="number"
              id="internalMarks1"
              value={internalMarks1}
              onChange={(e) => setInternalMarks1(e.target.value)}
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter Internal Marks 1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="internalMarks2" className="block text-gray-700">Internal Marks 2(out of 20)</label>
            <input
              type="number"
              id="internalMarks2"
              value={internalMarks2}
              onChange={(e) => setInternalMarks2(e.target.value)}
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter Internal Marks 2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="assignment" className="block text-gray-700">Assignment marks(out of 10)</label>
            <input
              type="number"
              id="assignment"
              value={assignment}
              onChange={(e) => setAssignment(e.target.value)}
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter Assignment Marks"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Link to go back to the home page or any other page */}
      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
</>
  );
}
