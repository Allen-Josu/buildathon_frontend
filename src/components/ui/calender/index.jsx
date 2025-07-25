/* eslint-disable react/prop-types */
import { useCallback, useMemo, useState } from "react";

export default function Calendar({ onDateSelect, markedDates, startDate }) {
    const [currentDate, setCurrentDate] = useState(new Date());


    const isDateMarked = useCallback((day) => {
        const dateStr = `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
        ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        return markedDates.includes(dateStr);
    }, [currentDate, markedDates]);

    const daysInMonth = useMemo(() =>
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(),
        [currentDate]
    );

    const startOfMonth = useMemo(() =>
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(),
        [currentDate]
    );

    const today = useMemo(() => new Date(), []);

    const handleDateClick = useCallback((day) => {
        const clickedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );

        // Prevent selecting future dates
        if (clickedDate > today) return;

        onDateSelect(clickedDate);



    }, [currentDate, onDateSelect, today]);

    const isToday = useCallback((day) => {
        return (
            today.getDate() === day &&
            today.getMonth() === currentDate.getMonth() &&
            today.getFullYear() === currentDate.getFullYear()
        );
    }, [today, currentDate]);

    const isWeekend = useCallback((day) => {
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );
        const dayOfWeek = date.getDay();
        return dayOfWeek === 0 || dayOfWeek === 6;
    }, [currentDate]);

    const isFutureDate = useCallback((day) => {
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );
        return date > today;
    }, [currentDate, today]);

    const changeMonth = useCallback((offset) => {
        setCurrentDate((prevDate) =>
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

    const isDateInRange = useCallback((day) => {
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );

        // Convert startDate string to Date object if it's a string
        const start = typeof startDate === 'string' ? new Date(startDate) : startDate;

        // Return true if date is between start date and today
        return date >= start && date <= today;
    }, [currentDate, today, startDate]);

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
                    {weekDays.map((day, index) => (
                        <div
                            key={day}
                            className={`text-center text-sm font-medium ${index === 0 || index === 6 ? "text-red-500" : "text-gray-600"
                                }`}
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
                            disabled={isFutureDate(day)}
                            className={`w-full aspect-square flex items-center justify-center rounded
                                ${isWeekend(day) ? "text-red-500" : ""}
                                ${isToday(day) ? "bg-blue-500 text-white" : "bg-white-50 hover:bg-blue-100"}
                                ${isFutureDate(day) ? "cursor-not-allowed opacity-50" : ""}
                                ${isDateMarked(day) ? "border-2 border-red-500" : ""}
                                ${isDateInRange(day) && !isWeekend(day) ? "border-2 border-green-300" : ""}
                            `}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
