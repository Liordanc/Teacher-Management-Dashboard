import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import type { RootState } from "@/app/src/store/store";
import { formatDateToDDMMYYYY } from "@/app/src/store/slices/teacherSlice";

const timeSlots = [
  "7:30am",
  "8am",
  "8:30am",
  "9am",
  "9:30am",
  "10am",
  "10:30am",
  "11am",
  "11:30am",
  "12pm",
  "12:30pm",
  "1pm",
  "1:30pm",
  "2pm",
  "2:30pm",
  "3pm",
  "3:30pm",
  "4pm",
  "4:30pm",
  "5pm",
  "5:30pm",
  "6pm",
];

const shortDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type ViewMode = "week" | "month";

export default function ScheduleGrid() {
  const { schedule } = useSelector((state: RootState) => state.teacher);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("week");

  // Get start of week (Sunday)
  const getStartOfWeek = (date: Date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    start.setHours(0, 0, 0, 0);
    return start;
  };

  // Get start of month
  const getStartOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  // Generate week dates
  const weekDates = useMemo(() => {
    const startOfWeek = getStartOfWeek(currentDate);
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  }, [currentDate]);

  // Generate month dates
  const monthDates = useMemo(() => {
    const startOfMonth = getStartOfMonth(currentDate);
    const startOfCalendar = getStartOfWeek(startOfMonth);

    return Array.from({ length: 42 }, (_, i) => {
      const date = new Date(startOfCalendar);
      date.setDate(startOfCalendar.getDate() + i);
      return date;
    });
  }, [currentDate]);

  // Navigation functions
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "week") {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setMonth(currentDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "week") {
      newDate.setDate(currentDate.getDate() + 7);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Helper functions - Updated to work with DD-MM-YYYY dates
  const getTimeSlotIndex = (time: string) => timeSlots.indexOf(time);

  const isScheduled = (date: Date, timeIndex: number) => {
    const dateString = formatDateToDDMMYYYY(date);
    return schedule.some((cls) => {
      const startIndex = getTimeSlotIndex(cls.startTime);
      const endIndex = getTimeSlotIndex(cls.endTime);
      return (
        cls.date === dateString &&
        timeIndex >= startIndex &&
        timeIndex < endIndex
      );
    });
  };

  const getScheduledClass = (date: Date, timeIndex: number) => {
    const dateString = formatDateToDDMMYYYY(date);
    return schedule.find((cls) => {
      const startIndex = getTimeSlotIndex(cls.startTime);
      const endIndex = getTimeSlotIndex(cls.endTime);
      return (
        cls.date === dateString &&
        timeIndex >= startIndex &&
        timeIndex < endIndex
      );
    });
  };

  const getScheduledClassesForDate = (date: Date) => {
    const dateString = formatDateToDDMMYYYY(date);
    return schedule.filter((cls) => cls.date === dateString);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  // Format date range for header
  const getDateRangeText = () => {
    if (viewMode === "week") {
      const start = weekDates[0];
      const end = weekDates[6];
      if (start.getMonth() === end.getMonth()) {
        return `${
          monthNames[start.getMonth()]
        } ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`;
      } else {
        return `${monthNames[start.getMonth()]} ${start.getDate()} - ${
          monthNames[end.getMonth()]
        } ${end.getDate()}, ${start.getFullYear()}`;
      }
    } else {
      return `${
        monthNames[currentDate.getMonth()]
      } ${currentDate.getFullYear()}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Schedule Calendar
            </h3>
            <p className="text-sm text-gray-500">{getDateRangeText()}</p>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
          >
            Today
          </button>

          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("week")}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                viewMode === "week"
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode("month")}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                viewMode === "month"
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Month
            </button>
          </div>

          <div className="flex items-center">
            <button
              onClick={goToPrevious}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Debug Info - Shows current schedule dates */}
      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>Debug:</strong> Schedule contains {schedule.length} items with
          dates:{" "}
          {schedule
            .slice(0, 5)
            .map((s) => s.date)
            .join(", ")}
          {schedule.length > 5 && "..."}
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-400 rounded"></div>
          <span className="text-sm text-gray-600">Classes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-400 rounded"></div>
          <span className="text-sm text-gray-600">Meetings</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-100 border-2 border-blue-400 rounded"></div>
          <span className="text-sm text-gray-600">Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
          <span className="text-sm text-gray-600">Available Time</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {viewMode === "week" ? (
          // Week View
          <div className="overflow-x-auto scrollbar-thin">
            <div className="min-w-[800px]">
              {/* Week Header */}
              <div className="grid grid-cols-8 border-b border-gray-200">
                <div className="p-4 bg-gray-50 border-r border-gray-200"></div>
                {weekDates.map((date, index) => (
                  <div
                    key={date.toISOString()}
                    className={`p-4 text-center border-r border-gray-200 last:border-r-0 ${
                      isToday(date) ? "bg-blue-50" : "bg-gray-50"
                    }`}
                  >
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {shortDayNames[date.getDay()]}
                    </div>
                    <div
                      className={`text-lg font-semibold mt-1 ${
                        isToday(date) ? "text-blue-600" : "text-gray-900"
                      }`}
                    >
                      {date.getDate()}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {monthNames[date.getMonth()].slice(0, 3)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatDateToDDMMYYYY(date)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              <div className="divide-y divide-gray-100">
                {timeSlots.map((time, timeIndex) => (
                  <div key={time} className="grid grid-cols-8 min-h-[60px]">
                    <div className="p-3 text-xs text-gray-500 text-right font-medium bg-gray-50 border-r border-gray-200 flex items-start justify-end">
                      {time}
                    </div>
                    {weekDates.map((date) => {
                      const scheduledClass = getScheduledClass(date, timeIndex);
                      const isClassScheduled = isScheduled(date, timeIndex);
                      const isClassStart =
                        scheduledClass &&
                        timeIndex ===
                          getTimeSlotIndex(scheduledClass.startTime);

                      return (
                        <div
                          key={`${date.toISOString()}-${time}`}
                          className={`relative border-r border-gray-200 last:border-r-0 transition-colors cursor-pointer ${
                            isToday(date) ? "bg-blue-50/30" : ""
                          } ${
                            isClassScheduled
                              ? "bg-green-100 hover:bg-green-200"
                              : "hover:bg-gray-50"
                          }`}
                          title={
                            scheduledClass
                              ? `${scheduledClass.subject} (${
                                  scheduledClass.startTime
                                } - ${scheduledClass.endTime})${
                                  scheduledClass.location
                                    ? ` - ${scheduledClass.location}`
                                    : ""
                                } - Date: ${scheduledClass.date}`
                              : `${time} - Available - Date: ${formatDateToDDMMYYYY(
                                  date
                                )}`
                          }
                        >
                          {isClassStart && scheduledClass && (
                            <div
                              className={`absolute inset-1 rounded shadow-sm ${
                                scheduledClass.type === "meeting"
                                  ? "bg-blue-400"
                                  : "bg-green-400"
                              }`}
                            ></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Month View
          <div>
            {/* Month Header */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {shortDayNames.map((day) => (
                <div
                  key={day}
                  className="p-4 text-center text-sm font-semibold text-gray-700 bg-gray-50 border-r border-gray-200 last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Month Grid */}
            <div className="grid grid-cols-7">
              {Array.from({ length: 6 }, (_, weekIndex) =>
                monthDates
                  .slice(weekIndex * 7, (weekIndex + 1) * 7)
                  .map((date, dayIndex) => {
                    const daySchedule = getScheduledClassesForDate(date);

                    return (
                      <div
                        key={date.toISOString()}
                        className={`min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0 ${
                          isToday(date) ? "bg-blue-50" : ""
                        } ${
                          !isCurrentMonth(date)
                            ? "bg-gray-50 text-gray-400"
                            : "bg-white"
                        }`}
                        title={`${formatDateToDDMMYYYY(date)} - ${
                          daySchedule.length
                        } events`}
                      >
                        <div
                          className={`text-sm font-medium mb-2 ${
                            isToday(date)
                              ? "text-blue-600"
                              : isCurrentMonth(date)
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {date.getDate()}
                        </div>

                        <div className="space-y-1">
                          {daySchedule.slice(0, 4).map((cls, index) => (
                            <div
                              key={cls.id}
                              className={`h-2 rounded ${
                                cls.type === "meeting"
                                  ? "bg-blue-400"
                                  : "bg-green-400"
                              }`}
                              title={`${cls.subject} (${cls.startTime} - ${
                                cls.endTime
                              })${
                                cls.location ? ` - ${cls.location}` : ""
                              } - Date: ${cls.date}`}
                            />
                          ))}
                          {daySchedule.length > 4 && (
                            <div
                              className="h-2 bg-gray-300 rounded opacity-60"
                              title={`+${daySchedule.length - 4} more events`}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Schedule Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-700">
            {schedule.filter((cls) => cls.type === "class" || !cls.type).length}
          </div>
          <div className="text-sm text-green-600">Scheduled Classes</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-700">
            {schedule.filter((cls) => cls.type === "meeting").length}
          </div>
          <div className="text-sm text-blue-600">Meetings</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-700">
            {schedule.reduce((total, cls) => {
              const start = getTimeSlotIndex(cls.startTime);
              const end = getTimeSlotIndex(cls.endTime);
              return total + (end - start) * 0.5;
            }, 0)}
            h
          </div>
          <div className="text-sm text-purple-600">Total Hours</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-700">
            {new Set(schedule.map((cls) => cls.date)).size}
          </div>
          <div className="text-sm text-orange-600">Active Days</div>
        </div>
      </div>
    </div>
  );
}
