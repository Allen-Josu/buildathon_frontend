import axios from "axios";
import { useState } from "react";
import Header from "../../components/Header/Header";

// Calendar Component remains the same...
const Calendar = ({ onDateSelect, markedDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const startOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(clickedDate);
    onDateSelect(clickedDate);
  };

  const isDateMarked = (day) => {
    const dateStr = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    )
      .toISOString()
      .split("T")[0];
    return markedDates.includes(dateStr);
  };

  const changeMonth = (offset) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
    );
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const totalDays = daysInMonth(currentDate);
  const firstDay = startOfMonth(currentDate);
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex justify-between items-center p-4 border-b">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded"
        >
          ←
        </button>
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="p-2 hover:bg-gray-100 rounded"
        >
          →
        </button>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-600"
            >
              {day}
            </div>
          ))}
          {Array(firstDay)
            .fill(null)
            .map((_, index) => (
              <div key={`empty-${index}`} />
            ))}
          {days.map((day) => (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`w-full aspect-square flex items-center justify-center rounded hover:bg-gray-100
                ${selectedDate?.getDate() === day ? "bg-blue-100" : ""}
                ${isDateMarked(day) ? "border-2 border-green-500" : ""}`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
const AttendanceRegulator = () => {
  const semesterStartDate = new Date("2024-12-31");
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendanceData, setAttendanceData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [attendancePercentage, setAttendancePercentage] = useState({
    withDutyLeave: 0,
    withoutDutyLeave: 0,
    withnoclasswithoutdl: 0,
    withnoclasswithdl: 0,
    totalnumberofclasses: 0,
  });


  const AttendanceForm = ({ onSubmit, selectedDate }) => {
    const hours = [
      "9a.m to 10a.m",
      "10a.m to 11a.m",
      "11a.m to 12p.m",
      "12p.m to 1p.m",
      "2p.m to 3p.m",
      "3p.m to 4p.m",
    ];
    const dateKey = selectedDate.toISOString().split("T")[0];

    // Initialize with existing data or defaults
    const [attendance, setAttendance] = useState(() => {
      if (attendanceData[dateKey]) {
        return attendanceData[dateKey];
      }
      return hours.reduce(
        (acc, hour) => ({
          ...acc,
          [hour]: "present",
        }),
        {}
      );
    });

    return (
      <>
       
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Mark Attendance for {selectedDate.toDateString()}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {hours.map((hour) => (
                <div key={hour} className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    {hour}
                  </label>
                  <select
                    value={attendance[hour]}
                    onChange={(e) =>
                      setAttendance((prev) => ({
                        ...prev,
                        [hour]: e.target.value,
                      }))
                    }
                    className="ml-4 block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="dutyLeave">Duty Leave</option>
                    <option value="no class">No Class</option>
                  </select>
                </div>
              ))}
            </div>
            <button
              onClick={() => onSubmit(attendance)}
              className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Attendance
            </button>
          </div>
        </div>
      </>
    );
  };

  const handleDateSelect = (date) => {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      alert("Attendance cannot be marked on holidays");
      return;
    }
    if (date > currentDate) {
      alert("You cannot mark attendance for a future date.");
      return;
    }
    setSelectedDate(date);
    setShowModal(true);
  };

  
const handleAttendanceSubmit = (updatedAttendance) => {

  const dateKey = selectedDate.toISOString().split("T")[0]; 

  // Create an object to send to the backend with the selected date and its attendance status for each hour.
  const attendanceObject = {
    date: dateKey,
    attendance: updatedAttendance, // This is the attendance data for the selected date (present/absent/dutyLeave/no class).
  };


  axios.post("YOUR_BACKEND_API_URL/attendance", attendanceObject, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {

      if (response.status === 200) {
        setAttendanceData((prevData) => ({
          ...prevData,
          [dateKey]: updatedAttendance,
        }));
        setShowModal(false); 
      } else {
        alert("Failed to submit attendance. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error submitting attendance:", error);
      alert("An error occurred while submitting the attendance.");
    });
};
  

  // Get array of dates that have attendance marked
  const markedDates = Object.keys(attendanceData);

  const calculateAttendance = (
    attendance,
    includeDutyLeave,
    startDate,
    currentDate
  ) => {
    const start = new Date(startDate);
    const current = new Date(currentDate);
    const totalDays = Math.floor((current - start) / (1000 * 3600 * 24)) + 1;

    if (totalDays <= 0)
      return { attendancePercentage: 0, attendanceWithoutDLPercentage: 0 };

    let totalHoursPresent = 0;
    let totalHoursWithoutDL = 0;
    let totalWeekdays = 0;
    let totalHoursincluNoclass = 0;

    // Create holidays array with all Saturdays and Sundays between start and current date
    const holidays = [];

    for (let i = 0; i < totalDays; i++) {
      const currentDay = new Date(start);
      currentDay.setDate(currentDay.getDate() + i);
      const dayOfWeek = currentDay.getDay(); // 0 = Sunday, 6 = Saturday
      if (dayOfWeek === 6) {
        holidays.push(currentDay.toISOString().split("T")[0]); // Add the holiday date (YYYY-MM-DD)
      }
    }

    console.log("Holidays Array:", holidays); // Debug log

    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(currentDate.getDate() + i);
      const dateString = currentDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

      // Debugging: log the current date being processed
      console.log("Processing date:", dateString);

      // Skip holidays (weekends)
      if (holidays.includes(dateString)) continue;

      const dayAttendance = attendance[dateString];

      // Increment totalWeekdays for weekdays (not holidays)
      totalWeekdays++;

      // If no attendance data is present for this day, consider it "present" for all 6 hours
      if (!dayAttendance || Object.keys(dayAttendance).length === 0) {
        totalHoursPresent += 6; // 6 hours marked as "present"
        totalHoursWithoutDL += 6; // 6 hours marked as "present" (without duty leave)
      } else {
        // Otherwise, calculate hours based on the status (present, duty leave, etc.)
        const hours = Object.values(dayAttendance).filter(
          (status) =>
            status === "present" || (includeDutyLeave && status === "dutyLeave")
        ).length;

        const hoursWithoutDL = Object.values(dayAttendance).filter(
          (status) => status === "present"
        ).length;

        const hoursincluNoclass = Object.values(dayAttendance).filter(
          (status) => status === "no class"
        ).length;

         totalHoursincluNoclass+= hoursincluNoclass;
        totalHoursPresent += hours;
        totalHoursWithoutDL += hoursWithoutDL;
      }
    }
  
    console.log("total week days", totalWeekdays);
    console.log("hours without dutyleave", totalHoursPresent);
    console.log("hrs with no class", totalHoursincluNoclass);
    const totalHolidays = holidays.length;
    console.log("holidays", totalHolidays);
    const subtrahend1 = totalHoursPresent - totalHolidays * 6 - 6;
    const subtrahend2 = totalHoursWithoutDL - totalHolidays * 6 - 6;
    const subtrahend3 = totalHoursWithoutDL - totalHolidays * 6 - 6;
    const subtrahend4 = totalHoursPresent - totalHolidays * 6 - 6;
    const minuend = (totalWeekdays - totalHolidays) * 6 - 6;
    const minuend2 =(totalWeekdays - totalHolidays) * 6 - totalHoursincluNoclass - 6;

    console.log("sub1", subtrahend1);
    console.log("sub2", subtrahend2);
    console.log("sub3", subtrahend3);
    console.log("min", minuend);
    console.log("min2", minuend2);
    // Calculate attendance percentages based on total weekdays
    const attendancePercentage = (subtrahend1 / minuend) * 100;
    const attendanceWithoutDLPercentage = (subtrahend2 / minuend) * 100;
    const attendancewithnoclass = (subtrahend3 / minuend2) * 100;
    const attendancewithnoclasswithdl = (subtrahend4 / minuend2) * 100;

    return {
      attendancePercentage,
      attendanceWithoutDLPercentage,
      attendancewithnoclass,
      attendancewithnoclasswithdl,
      minuend2,
    };
  };

  const handleCalculateAttendance = () => {
    const {
      attendancePercentage,
      attendanceWithoutDLPercentage,
      attendancewithnoclass,
      attendancewithnoclasswithdl,
      minuend2,
    } = calculateAttendance(attendanceData, true, "2024-12-31", new Date());
    setAttendancePercentage({
      withDutyLeave: attendancePercentage,
      withoutDutyLeave: attendanceWithoutDLPercentage,
      withnoclasswithoutdl: attendancewithnoclass,
      withnoclasswithdl: attendancewithnoclasswithdl,
      totalnumberofclasses:minuend2,
    });
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          📅 Attendance Regulator
        </h1>

        <div className="flex flex-row-reverse gap-8">
          {/* Right side - Calendar */}
          <div className="w-1/3">
            <Calendar
              onDateSelect={handleDateSelect}
              markedDates={markedDates}
            />
          </div>

          {/* Left side - Results and Controls */}
          <div className="w-2/3">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <button
                onClick={handleCalculateAttendance}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors mb-6"
              >
                Calculate Attendance
              </button>

              {attendancePercentage && (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Percentage
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-700">
                         Total number of working hours
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {attendancePercentage.totalnumberofclasses} Hours
                        </td>
                      </tr>
                     
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          Attendance Percentage including duty leave
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {attendancePercentage.withnoclasswithdl.toFixed(2)}%
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          Attendance Percentage excluding duty leave
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {attendancePercentage.withnoclasswithoutdl.toFixed(2)}%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {showModal && (
          <AttendanceForm
            selectedDate={selectedDate}
            onSubmit={handleAttendanceSubmit}
          />
        )}
      </div>
    </div>
    </>
  );
};

export default AttendanceRegulator;
