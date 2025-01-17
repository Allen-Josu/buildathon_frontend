import { Modal } from "antd";

export default function AttendanceModal({ selectedDate }) {
  const timeSlots = [
    "9 to 10",
    "10 to 11",
    "11 to 12",
    "12 to 1",
    "2 to 3",
    "3 to 4",
  ];

  const dateKey = selectedDate.toISOString().split("T")[0];

  const [attendance, setAttendance] = useState(() => {
    if (attendanceData[dateKey]) {
      return attendanceData[dateKey];
    }
    return timeSlots.reduce(
      (acc, slot) => ({
        ...acc,
        [slot]: "present",
      }),
      {}
    );
  });
  return (
    <>
      <Modal title="MArk Attendance" open={true}>
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
      </Modal>
    </>
  );
}
