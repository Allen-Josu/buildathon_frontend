import { useEffect, useState, useCallback, useMemo } from "react";
import Header from "../../components/Header";
import axios from "axios";
import AttendanceModal from "../../modals/attendance";
import { useUserStore } from "../../store/userStore";
import dayjs from "dayjs";
import Calendar from "../../components/ui/calender";

const BASE_URL = import.meta.env.VITE_URL;

const useAttendanceData = (studentId, refreshTrigger) => {
  const [data, setData] = useState(null);
  const [markedDates, setMarkedDates] = useState([]);
  const [successfullyMarkedDates, setSuccessfullyMarkedDates] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/attendance?entityType=all&studentId=${studentId}`
        );
        setData(response.data.results);

        const dates = response.data.results || [];
        const allMarkedDates = dates.map((d) => d.leaveDate);
        const successDates = dates
          .filter((d) => d.leavePerDay?.some((l) => l.reason !== "No Class"))
          .map((d) => d.leaveDate);

        setMarkedDates(allMarkedDates);
        setSuccessfullyMarkedDates(successDates);
      } catch (err) {
        setError(err);
        console.error("Error fetching attendance data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [studentId, refreshTrigger]);

  return { data, markedDates, successfullyMarkedDates, error, isLoading };
};

const useAttendanceCalculations = (attendanceData) => {
  const calculateAttendance = useCallback(() => {
    if (!attendanceData) return null;

    const startDate = dayjs("2025-01-01");
    const currentDate = dayjs();
    let totalDays = currentDate.diff(startDate, "day") + 1;

    const countWeekends = (start, end) => {
      let count = 0;
      for (
        let date = start;
        date.isBefore(end) || date.isSame(end, "day");
        date = date.add(1, "day")
      ) {
        const dayOfWeek = date.day();
        if (dayOfWeek === 0 || dayOfWeek === 6) count++;
      }
      return count;
    };

    const weekendCount = countWeekends(startDate, currentDate);
    totalDays -= weekendCount;

    let no_class = 0;
    let duty_leave = 0;
    let count = 0;

    attendanceData?.forEach((item) => {
      item.leavePerDay.forEach((leave) => {
        if (leave.reason === "No Class") no_class++;
        else if (leave.reason === "Duty Leave") duty_leave++;
        else count++;
      });
    });

    const totalHours = totalDays * 6 - no_class;
    const attendanceWithDuty = totalHours - (count + duty_leave);
    const attendanceWithoutDuty = totalHours - count;

    return {
      totalPercent: ((attendanceWithDuty / totalHours) * 100).toFixed(2),
      totalPercentExcludeDuty: ((attendanceWithoutDuty / totalHours) * 100).toFixed(2),
    };
  }, [attendanceData]);

  return useMemo(() => calculateAttendance(), [calculateAttendance]);
};

const AttendanceRegulator = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const user = useUserStore((state) => state.user);

  const {
    data: attendanceData,
    markedDates,
    successfullyMarkedDates,
    error,
    isLoading,
  } = useAttendanceData(user.studentId, refreshTrigger);
  const attendanceStats = useAttendanceCalculations(attendanceData);

  const handleDateSelect = useCallback((date) => {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      alert("Attendance cannot be marked on holidays");
      return;
    }
    if (date > new Date()) {
      alert("You cannot mark attendance for a future date.");
      return;
    }
    setSelectedDate(date);
    setShowModal(true);
  }, []);

  const handleOperationSuccess = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
    setShowModal(false);
  }, []);

  if (error) {
    return <div className="text-red-500">Error loading attendance data</div>;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#c1c3c8] mb-4 sm:mb-6 lg:mb-8">
            📅 Attendance Regulator
          </h1>

          <div className="flex flex-col lg:flex-row-reverse gap-4 sm:gap-6 lg:gap-8">
            <div className="w-full lg:w-1/3">
              <Calendar
                onDateSelect={handleDateSelect}
                markedDates={markedDates}
                successfullyMarkedDates={successfullyMarkedDates}
              />
            </div>

            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                {isLoading ? (
                  <div className="text-center py-4">Loading attendance data...</div>
                ) : attendanceStats && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">
                            Type
                          </th>
                          <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">
                            Percentage
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-700">
                            Attendance Percentage (with duty leave)
                          </td>
                          <td className="px-4 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-700">
                            {attendanceStats.totalPercent}%
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-700">
                            Attendance Percentage (without duty leave)
                          </td>
                          <td className="px-4 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-700">
                            {attendanceStats.totalPercentExcludeDuty}%
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          <AttendanceModal
            showModal={showModal}
            setShowModal={setShowModal}
            selectedDate={selectedDate}
            onSuccess={handleOperationSuccess}
          />
        </div>
      </div>
    </>
  );
};

export default AttendanceRegulator;
