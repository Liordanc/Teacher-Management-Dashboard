"use client";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Bell,
  BookOpen,
  Calendar,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Settings,
  Users,
  UserCheck,
  FileText,
  X,
  ChevronDown,
} from "lucide-react";
import type { RootState, AppDispatch } from "@/app/src/store/store";
import { fetchTeacherData } from "@/app/src/store/slices/teacherSlice";
import TeacherDetailsForm from "@/app/src/components/teacher-details-form";
import QualificationsSection from "@/app/src/components/qualifications-section";
import ScheduleGrid from "@/app/src/components/schedule-grid";
import LoadingSpinner from "@/app/src/components/loading-spinner";
import ErrorMessage from "@/app/src/components/error-message";

const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    active: false,
    href: "/dashboard",
  },
  { icon: Users, label: "Teachers", active: true, href: "/teachers" },
  { icon: GraduationCap, label: "Students", active: false, href: "/students" },
  { icon: BookOpen, label: "Classes", active: false, href: "/classes" },
  { icon: Calendar, label: "Schedule", active: false, href: "/schedule" },
  { icon: UserCheck, label: "Attendance", active: false, href: "/attendance" },
  { icon: FileText, label: "Reports", active: false, href: "/reports" },
  { icon: Settings, label: "Settings", active: false, href: "/settings" },
];

const tabs = [
  { id: "availability", label: "Availability", visible: true },
  { id: "unavailabilities", label: "Unavailable", visible: true },
  { id: "students", label: "Students", visible: true },
  { id: "schedule", label: "Schedule", visible: true },
  {
    id: "invoiced-lessons",
    label: "Invoiced",
    visible: false,
    hiddenClass: "hidden sm:block",
  },
  {
    id: "uninvoiced-lessons",
    label: "Uninvoiced",
    visible: false,
    hiddenClass: "hidden sm:block",
  },
  {
    id: "one-voucher",
    label: "Voucher",
    visible: false,
    hiddenClass: "hidden sm:block",
  },
  {
    id: "comments",
    label: "Comments",
    visible: false,
    hiddenClass: "hidden sm:block",
  },
  {
    id: "history",
    label: "History",
    visible: false,
    hiddenClass: "hidden sm:block",
  },
];

export default function TeacherProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const { details, loading, error } = useSelector(
    (state: RootState) => state.teacher
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("availability");

  useEffect(() => {
    dispatch(fetchTeacherData("1"));
  }, [dispatch]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex lg:flex-shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col w-64">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
            <h2 className="text-xl font-bold text-white">School Hub</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                  item.active
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${
                    item.active ? "text-white" : "text-slate-400"
                  }`}
                />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                {getInitials(details.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {details.name}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {details.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>

              {/* School Selector */}
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors cursor-pointer">
                  <option value="school-hill">School Hill Academy</option>
                  <option value="riverside">Riverside Elementary</option>
                  <option value="oakwood">Oakwood High School</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-red-700">
                    {getInitials(details.name)}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {details.name}
                  </p>
                  <p className="text-xs text-gray-500">{details.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="p-4 lg:p-8 space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {getInitials(details.name)}
              </div>
              <div className="flex-1 min-w-0">
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>Teachers</span>
                  <span>/</span>
                  <span className="text-gray-900 font-medium">
                    {details.name}
                  </span>
                </nav>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 break-words">
                  {details.name}
                </h1>
                <p className="text-gray-600 mt-1">{details.role}</p>
              </div>
            </div>

            {/* Teacher Details Form */}
            <TeacherDetailsForm />

            {/* Qualifications Section */}
            <QualificationsSection />

            {/* Schedule Section */}
            <div className="card">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="overflow-x-auto scrollbar-thin">
                  <nav className="flex min-w-max px-6">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-all duration-200 ${
                          tab.hiddenClass || ""
                        } ${
                          activeTab === tab.id
                            ? "border-red-500 text-red-600 bg-red-50/50"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Tab Content */}
              <div className="card-content">
                {activeTab === "availability" && <ScheduleGrid />}
                {activeTab !== "availability" && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {tabs.find((tab) => tab.id === activeTab)?.label} Content
                    </h3>
                    <p className="text-gray-500">
                      This section is under development. Content for{" "}
                      {tabs
                        .find((tab) => tab.id === activeTab)
                        ?.label.toLowerCase()}{" "}
                      will be available soon.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
