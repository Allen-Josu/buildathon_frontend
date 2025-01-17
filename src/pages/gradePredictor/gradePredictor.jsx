import  { useState } from 'react';
import Header from '../../components/Header/header';

export default function GradePredictor() {
  const [internalMarks1, setInternalMarks1] = useState('');
  const [internalMarks2, setInternalMarks2] = useState('');
  const [assignment, setAssignment] = useState('');
  const [gradePrediction, setGradePrediction] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateTotalInternalMarks = () => {
    return parseInt(internalMarks1) + parseInt(internalMarks2) + parseInt(assignment);
  };

  const calculateRequiredExternalMarks = (totalInternalMarks) => {
    const requiredMarks = {
      O: 90 - totalInternalMarks, 
      A: 80 - totalInternalMarks,
      B: 70 - totalInternalMarks, 
      C: 60 - totalInternalMarks,
      D: 50 - totalInternalMarks
      
    };

    // Check if it's possible to achieve each grade
    const prediction = {};
    Object.keys(requiredMarks).forEach((grade) => {
      const required = requiredMarks[grade];
      if (required <= 50 && required >= 0) {
        prediction[grade] = `${required} `;
      } else {
        
        prediction[grade] = (
          <span className="text-red-500">Grade not achievable</span>

        )
      }
    });
    return prediction;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setGradePrediction(null);

    if (!internalMarks1 || !internalMarks2 || !assignment) {
      setErrorMessage("All fields are required!");
      return;
    }

    if (internalMarks1 < 0 || internalMarks1 > 20 || internalMarks2 < 0 || internalMarks2 > 20 || assignment < 0 || assignment > 10) {
      setErrorMessage("Please enter valid marks within the specified ranges.");
      return;
    }

    const totalInternalMarks = calculateTotalInternalMarks();
    if(totalInternalMarks<23){
      setErrorMessage("You've failed in internals");
      return;
    }
    if (totalInternalMarks > 50) {
      setErrorMessage("Total internal marks cannot exceed 50.");
      return;
    }

    const predictions = calculateRequiredExternalMarks(totalInternalMarks);
    setGradePrediction(predictions);
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#27272a]">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-4" >
          <h2 className="text-2xl font-bold mb-4 text-center">Grade Predictor</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="internalMarks1" className="block text-gray-700">Internal Marks 1 (out of 20)</label>
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
              <label htmlFor="internalMarks2" className="block text-gray-700">Internal Marks 2 (out of 20)</label>
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
              <label htmlFor="assignment" className="block text-gray-700">Assignment Marks (out of 10)</label>
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

          {errorMessage && (
            <div className="mt-4 text-red-600 text-center">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>

       
      </div>

      {/* Modal for Grade Prediction */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#27272a] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-black mt-44 text-white p-6 rounded-lg shadow-lg w-full max-w-md h-85">
            <h3 className="text-xl font-semibol d text-center">Grade Prediction</h3>
            <table className="min-w-full table-auto">
            
              <thead>
                <tr>
                  <th className="px-6 py-2 text-left">Grade</th>
                  <th className="px-6 py-2 text-left">Minimum marks</th>
                  
                </tr>
              </thead>
              <tbody>
                {Object.keys(gradePrediction).map((grade) => (
                  <tr key={grade}> 
                    <td className="px-6 py-2 text-left">{grade}</td>
                    <td className="text-center mb-2">{gradePrediction[grade]}</td>
                  </tr>
                ))}
              </tbody>


            </table>    
            <div className='flex justify-center mt-4 text-red-600'>
              <p>Note:Student should receive minimum 23 marks in external </p>
            </div>
            <div className="flex justify-end mt-2">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
