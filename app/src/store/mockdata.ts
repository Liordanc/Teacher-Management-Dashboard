// Helper function to format date to DD-MM-YYYY
export const formatDateToDDMMYYYY = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}-${month}-${year}`;
};

// Helper function to parse DD-MM-YYYY to Date object
export const parseDDMMYYYYToDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

// Helper function to get dates for current week in DD-MM-YYYY format
//
export const mockTeacherData = {
  details: {
    id: "1",
    name: "Alynia Allan",
    role: "Senior Music Teacher",
    birthDate: "15-06-1985", // DD-MM-YYYY format
    email: "alyniah.allan@schoolhill.edu",
    workEmail: "alynia.allan@schoolhill.edu",
    phone: "+1 (416) 555-0001",
    homePhone: "+1 (416) 555-0002",
  },
  qualifications: [
    {
      id: "1",
      name: "Vocal Contemporary",
      rate: "£35.00",
      type: "private",
    },
    {
      id: "2",
      name: "Vocal Classical",
      rate: "£40.00",
      type: "private",
    },
    { id: "3", name: "Vocal Jazz", rate: "£38.00", type: "private" },
    {
      id: "4",
      name: "Piano Fundamentals",
      rate: "£32.00",
      type: "private",
    },
    { id: "5", name: "Music Theory", rate: "£30.00", type: "private" },
    { id: "6", name: "Choir Group", rate: "£25.00", type: "group" },
    {
      id: "7",
      name: "Ensemble Practice",
      rate: "£28.00",
      type: "group",
    },
  ],
  addresses: [
    {
      id: "1",
      type: "Home",
      street: "123 Maple Street, Apartment 4B",
      city: "North York",
      state: "Ontario",
      country: "Canada",
    },
    {
      id: "2",
      type: "Work",
      street: "456 Education Boulevard",
      city: "Toronto",
      state: "Ontario",
      country: "Canada",
    },
  ],
  schedule: [
    // Current week schedule
    {
      id: "1",
      date: "08-07-2025", // Monday
      startTime: "9am",
      endTime: "10:30am",
      subject: "Music Theory",
      type: "class",
      location: "Room 101",
      notes: "Bring music sheets",
    },
    {
      id: "2",
      date: "07-07-2025", // Tuesday
      startTime: "2pm",
      endTime: "3pm",
      subject: "Vocal Jazz",
      type: "class",
      location: "Studio A",
      notes: "Practice scales",
    },
    {
      id: "3",
      date: "09-07-2025", // Tuesday
      startTime: "4pm",
      endTime: "5pm",
      subject: "Piano Fundamentals",
      type: "class",
      location: "Piano Room",
    },
    {
      id: "4",
      date: "06-07-2025", // Wednesday
      startTime: "10am",
      endTime: "12pm",
      subject: "Choir Group",
      type: "class",
      location: "Main Hall",
      notes: "Rehearsal for concert",
    },
    {
      id: "5",
      date: "01-07-2025", // Wednesday
      startTime: "3:30pm",
      endTime: "5pm",
      subject: "Vocal Contemporary",
      type: "class",
      location: "Studio B",
    },
    {
      id: "6",
      date: "07-07-2025", // Thursday
      startTime: "1pm",
      endTime: "2:30pm",
      subject: "Ensemble Practice",
      type: "class",
      location: "Rehearsal Room",
    },
    {
      id: "7",
      date: "09-07-2025", // Friday
      startTime: "9am",
      endTime: "10am",
      subject: "Vocal Classical",
      type: "class",
      location: "Studio A",
    },
    // Next week schedule
    // {
    //   id: "8",
    //   date: nextWeekDates[1], // Next Monday
    //   startTime: "10am",
    //   endTime: "11:30am",
    //   subject: "Advanced Piano",
    //   type: "class",
    //   location: "Piano Room",
    //   notes: "Advanced techniques",
    // },
    // {
    //   id: "9",
    //   date: nextWeekDates[3], // Next Wednesday
    //   startTime: "2pm",
    //   endTime: "3:30pm",
    //   subject: "Music Composition",
    //   type: "class",
    //   location: "Studio C",
    // },
    // {
    //   id: "10",
    //   date: nextWeekDates[5], // Next Friday
    //   startTime: "11am",
    //   endTime: "12pm",
    //   subject: "Faculty Meeting",
    //   type: "meeting",
    //   location: "Conference Room",
    //   notes: "Monthly department meeting",
    // },
    // // Future dates for testing
    {
      id: "11",
      date: "09-07-2025", // 2 weeks from now
      startTime: "2pm",
      endTime: "3pm",
      subject: "Voice Lesson",
      type: "class",
      location: "Studio A",
    },
    {
      id: "12",
      date: "11-07-2025", // 3 weeks from now
      startTime: "3pm",
      endTime: "4:30pm",
      subject: "Piano Recital",
      type: "class",
      location: "Concert Hall",
      notes: "Student performance",
    },
    {
      id: "13",
      date: "10-07-2025", // 4 weeks from now
      startTime: "10am",
      endTime: "11am",
      subject: "Staff Training",
      type: "meeting",
      location: "Training Room",
    },
    // Some specific test dates
    {
      id: "14",
      date: "13-07-2025", // Specific test date
      startTime: "1pm",
      endTime: "2pm",
      subject: "Guitar Lesson",
      type: "class",
      location: "Music Room 3",
    },
    {
      id: "15",
      date: "20-07-2025", // Another test date
      startTime: "4pm",
      endTime: "5:30pm",
      subject: "Orchestra Practice",
      type: "class",
      location: "Main Hall",
      notes: "Full orchestra rehearsal",
    },
  ],
};
