/* eslint-disable react/prop-types */
import { useCallback, useMemo, useState } from "react";

export default function Calendar({ onDateSelect, markedDates }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    // Memoize these calculations
    const daysInMonth = useMemo(() =>
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(),
        [currentDate]
    );

    const startOfMonth = useMemo(() =>
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(),
        [currentDate]
    );

    const handleDateClick = useCallback((day) => {
        const clickedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );
        setSelectedDate(clickedDate);
        onDateSelect(clickedDate);
    }, [currentDate, onDateSelect]);

    const isDateMarked = useCallback((day) => {
        const dateStr = `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
        ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        return markedDates.includes(dateStr);
    }, [currentDate, markedDates]);

    const changeMonth = useCallback((offset) => {
        setCurrentDate(prevDate =>
            new Date(prevDate.getFullYear(), prevDate.getMonth() + offset, 1)
        );
    }, []);

    const weekDays = useMemo(() => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], []);
    const days = useMemo(() =>
        Array.from({ length: daysInMonth }, (_, i) => i + 1),
        [daysInMonth]
    );

    const monthYearString = useMemo(() =>
        currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
        }),
        [currentDate]
    );

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="flex justify-between items-center p-4 border-b">
                <button
                    onClick={() => changeMonth(-1)}
                    className="p-2 hover:bg-gray-100 rounded"
                >
                    ←
                </button>
                <h2 className="text-lg font-semibold">{monthYearString}</h2>
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
                    {Array(startOfMonth)
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
                ${isDateMarked(day) ? "border-2 border-red-500" : ""}`}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};