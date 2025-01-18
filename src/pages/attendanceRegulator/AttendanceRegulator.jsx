/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_URL;

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
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return markedDates.includes(dateStr);
  };
  ;

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

export default function AttendanceRegulator() {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendanceData, setAttendanceData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [attendancePercentage, setAttendancePercentage] = useState(null);
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/attendance?entityType=all&studentId=24030482`
        );
        const attendanceResults = response.data.results;
        console.log(attendanceResults);

        const fetchedData = {};
        attendanceResults.forEach((item) => {
          const dateKey = item.leaveDate.split("T")[0];
          fetchedData[dateKey] = {};
          item.leavePerDay.forEach((leave) => {
            fetchedData[dateKey][leave.time] = leave.reason;
          });
        });

        setAttendanceData(fetchedData);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        alert("Failed to load attendance data.");
      }
    };

    fetchAttendanceData();
  }, []);

  useEffect(() => {
    if (attendanceData && Object.keys(attendanceData).length > 0) {
      handleCalculateAttendance();
    }
  }, [attendanceData]);


  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/attendance?entityType=all&studentId=24030482`
        );
        const attendanceResults = response.data.results;
        const fetchedData = {};
        attendanceResults.forEach((item) => {
          const dateKey = item.leaveDate.split("T")[0];
          fetchedData[dateKey] = {};
          item.leavePerDay.forEach((leave) => {
            fetchedData[dateKey][leave.time] = leave.reason;
          });
        });

        setAttendanceData(fetchedData);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        alert("Failed to load attendance data.");
      }
    };

    fetchAttendanceData();
  }, []);

  const AttendanceForm = ({ onSubmit, selectedDate }) => {
    const timeSlots = [
      "9 to 10",
      "10 to 11",
      "11 to 12",
      "12 to 1",
      "2 to 3",
      "3 to 4",
    ];
    console.log(selectedDate);

    const dateKey = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

    console.log(dateKey);

    const [attendance, setAttendance] = useState(() => {
      if (attendanceData[selectedDate]) {
        return attendanceData[selectedDate];
      }

      return timeSlots.reduce(
        (acc, slot) => ({
          ...acc,
          [slot]: "present",
        }),
        {}
      );
    });

    console.log(attendance);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Mark Attendance for {`${selectedDate.getFullYear()}-${String(
                selectedDate.getMonth() + 1
              ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`}

            </h2>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>
          <div className="space-y-4">
            {timeSlots.map((slot) => (
              <div key={slot} className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  {slot}
                </label>
                <select
                  value={attendance[slot] || "present"}
                  onChange={(e) =>
                    setAttendance((prev) => ({
                      ...prev,
                      [slot]: e.target.value,
                    }))
                  }
                  className="ml-4 block w-48 rounded-md border-gray-300 shadow-sm focus:border-[#6d28d9] focus:ring-[#6d28d9]"
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="Duty Leave">Duty Leave</option>
                  <option value="No Class">No Class</option>
                </select>
              </div>
            ))}
          </div>
          <button
            onClick={() => onSubmit(attendance)}
            className="mt-6 w-full bg-[#6d28d9] text-white px-4 py-2 rounded-md hover:bg-[#6d28d9] transition-colors"
          >
            Submit Attendance
          </button>
        </div>
      </div>
    );
  };

  const handleAttendanceSubmit = async (updatedAttendance) => {
    const dateKey = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
    console.log(dateKey);

    const leavePerDay = Object.entries(updatedAttendance)
      .filter(([_, status]) => status !== "present")
      .map(([time, reason]) => ({
        time,
        reason,
      }));

    const attendancePayload = {
      entity: "attendance",
      entityId: "123432", // Replace this with the appropriate entityId
      leaveDate: dateKey,
      attributesToUpdate: {
        leavePerDay: leavePerDay,
      },
    };
    console.log(attendancePayload)
    try {
      const patchResponse = await axios.patch(
        `${BASE_URL}/update-entity`,
        attendancePayload
      );

      if (patchResponse.status !== 200) {
        throw new Error("Failed to update attendance");
      }

      setAttendanceData((prevData) => ({
        ...prevData,
        [dateKey]: updatedAttendance,
      }));

      setShowModal(false);
      alert("Attendance successfully updated!");
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert("Failed to update attendance. Please try again.");
    }
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
    loadModalData();
  };

  const loadModalData = async () => {
    const dateKey = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

    try {
      // const response = await axios.get(
      //   `${BASE_URL}/attendance?studentId=24030482&leaveDate=2024-12-10`
      // );
    } catch (error) {
      console.log(error);
    }
    setShowModal(true);
  };

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

    if (totalDays <= 0) {
      return {
        attendancePercentage: 0,
        attendanceWithoutDLPercentage: 0,
        attendancewithnoclass: 0,
        attendancewithnoclasswithdl: 0
      };
    }

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
        holidays.push(currentDay.toISOString().split("T")[0]);
      }
    }

    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(currentDate.getDate() + i);
      const dateString = currentDate.toISOString().split("T")[0];

      if (holidays.includes(dateString)) continue;

      totalWeekdays++;

      // If no attendance data, consider all 6 hours as present
      if (!attendance || !attendance[dateString]) {
        totalHoursPresent += 6;
        totalHoursWithoutDL += 6;
        continue;
      }

      // Process each time slot for the day
      const dayAttendance = attendance[dateString];
      Object.keys(dayAttendance).forEach(timeSlot => {
        const status = dayAttendance[timeSlot].toLowerCase();

        if (status === "present") {
          totalHoursPresent++;
          totalHoursWithoutDL++;
        } else if (status === "duty leave") {
          // Only count duty leave if includeDutyLeave is true
          if (includeDutyLeave) {
            totalHoursPresent++;
          }
        } else if (status === "no class") {
          totalHoursincluNoclass++;
        }
        // 'absent' case doesn't increment any counters
      });
    }

    const totalHolidays = holidays.length;

    // Calculate total working hours excluding holidays
    const subtrahend1 = totalHoursPresent - totalHolidays * 6 - 6;
    const subtrahend2 = totalHoursWithoutDL - totalHolidays * 6 - 6;
    const subtrahend3 = totalHoursWithoutDL - totalHolidays * 6 - 6;
    const subtrahend4 = totalHoursPresent - totalHolidays * 6 - 6;

    // Total possible hours (excluding holidays)
    const minuend = (totalWeekdays - totalHolidays) * 6 - 6;
    // Total possible hours excluding no-class hours
    const minuend2 = (totalWeekdays - totalHolidays) * 6 - totalHoursincluNoclass - 6;

    // Calculate percentages
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
      totalnumberofclasses: minuend2,
    });
  };

  return (
    <>
      <Header />
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

