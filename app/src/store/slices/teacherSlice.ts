"use client";
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface Qualification {
  id: string;
  name: string;
  rate: string;
  type: "private" | "group";
}

export interface Address {
  id: string;
  type: string;
  street: string;
  city: string;
  state: string;
  country: string;
}

export interface ScheduleSlot {
  id: string;
  date: string; // DD-MM-YYYY format (e.g., "13-07-2025")
  startTime: string;
  endTime: string;
  subject?: string;
  type?: "class" | "meeting" | "break";
  location?: string;
  notes?: string;
}

export interface TeacherDetails {
  id: string;
  name: string;
  role: string;
  birthDate: string; // DD-MM-YYYY format
  email: string;
  workEmail: string;
  phone: string;
  homePhone: string;
}

export interface TeacherState {
  details: TeacherDetails;
  qualifications: Qualification[];
  addresses: Address[];
  schedule: ScheduleSlot[];
  loading: boolean;
  error: string | null;
  isEditing: boolean;
  detailsLoading: boolean;
}
import { mockTeacherData } from "@/app/src/store/mockdata";
//Helper function to format date to DD-MM-YYYY
export const formatDateToDDMMYYYY = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}-${month}-${year}`;
};

// // Helper function to parse DD-MM-YYYY to Date object
export const parseDDMMYYYYToDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}; //Enhanced async thunk with better error handling
export const fetchTeacherData = createAsyncThunk(
  "teacher/fetchTeacherData",
  async (teacherId: string, { rejectWithValue }) => {
    const apiUrl = process.env.NEXT_PUBLIC_TEACHER_API_URL;

    if (apiUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch(`${apiUrl}/${teacherId}`, {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.warn("API fetch failed, using mock data:", error);
        // Return mock data as fallback
        return mockTeacherData;
      }
    } else {
      console.log("No API URL provided, using mock data");
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockTeacherData;
    }
  }
);

export const fetchTeacherDetails = createAsyncThunk(
  "teacher/fetchTeacherDetails",
  async (teacherId: string, { rejectWithValue }) => {
    const apiUrl = process.env.NEXT_PUBLIC_TEACHER_API_URL;

    if (apiUrl) {
      try {
        const response = await fetch(`${apiUrl}/${teacherId}/details`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.warn("API fetch failed, using mock data:", error);
        return mockTeacherData.details;
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockTeacherData.details;
    }
  }
);

export const updateTeacherData = createAsyncThunk(
  "teacher/updateTeacherData",
  async (updatedData: Partial<TeacherDetails>, { rejectWithValue }) => {
    const apiUrl = process.env.NEXT_PUBLIC_TEACHER_API_URL;

    if (apiUrl) {
      try {
        const response = await fetch(`${apiUrl}/${updatedData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.warn("API update failed, updating local store only:", error);
        return updatedData;
      }
    } else {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      return updatedData;
    }
  }
);

// Helper function to compare DD-MM-YYYY dates
export const compareDDMMYYYYDates = (date1: string, date2: string): number => {
  const d1 = parseDDMMYYYYToDate(date1);
  const d2 = parseDDMMYYYYToDate(date2);
  return d1.getTime() - d2.getTime();
};

// Helper function to check if date is in range
export const isDateInRange = (
  date: string,
  startDate: string,
  endDate: string
): boolean => {
  const dateObj = parseDDMMYYYYToDate(date);
  const startObj = parseDDMMYYYYToDate(startDate);
  const endObj = parseDDMMYYYYToDate(endDate);
  return dateObj >= startObj && dateObj <= endObj;
};

const initialState: TeacherState = {
  details: {
    id: "",
    name: "",
    role: "",
    birthDate: "",
    email: "",
    workEmail: "",
    phone: "",
    homePhone: "",
  },
  qualifications: [],
  addresses: [],
  schedule: [],
  loading: false,
  error: null,
  isEditing: false,
  detailsLoading: false,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    updateTeacherDetails: (
      state,
      action: PayloadAction<Partial<TeacherDetails>>
    ) => {
      state.details = { ...state.details, ...action.payload };
    },
    addQualification: (state, action: PayloadAction<Qualification>) => {
      state.qualifications.push(action.payload);
    },
    updateQualification: (state, action: PayloadAction<Qualification>) => {
      const index = state.qualifications.findIndex(
        (q) => q.id === action.payload.id
      );
      if (index !== -1) {
        state.qualifications[index] = action.payload;
      }
    },
    removeQualification: (state, action: PayloadAction<string>) => {
      state.qualifications = state.qualifications.filter(
        (q) => q.id !== action.payload
      );
    },

    // New reducer to filter schedule by date range (DD-MM-YYYY format)
    filterScheduleByDateRange: (
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>
    ) => {
      const { startDate, endDate } = action.payload;
      state.schedule = state.schedule.filter((slot) =>
        isDateInRange(slot.date, startDate, endDate)
      );
    },

    // New reducer to sort schedule by date
    sortScheduleByDate: (state) => {
      state.schedule.sort((a, b) => compareDDMMYYYYDates(a.date, b.date));
    },
    // Clear error state
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch teacher data
      .addCase(fetchTeacherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeacherData.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload.details;
        state.qualifications = action.payload.qualifications;
        state.addresses = action.payload.addresses;
        state.schedule = action.payload.schedule;
        // Sort schedule by date and time
        state.schedule.sort((a, b) => {
          const dateComparison = compareDDMMYYYYDates(a.date, b.date);
          if (dateComparison !== 0) return dateComparison;
          return a.startTime.localeCompare(b.startTime);
        });
      })
      .addCase(fetchTeacherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch teacher data";
      })
      // Fetch teacher details
      .addCase(fetchTeacherDetails.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })
      .addCase(fetchTeacherDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.details = action.payload;
      })
      .addCase(fetchTeacherDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.error.message || "Failed to fetch teacher details";
      })
      // Update teacher data
      .addCase(updateTeacherData.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })
      .addCase(updateTeacherData.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.details = { ...state.details, ...action.payload };
        state.isEditing = false;
      })
      .addCase(updateTeacherData.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.error.message || "Failed to update teacher data";
      });
  },
});

export const {
  setEditing,
  updateTeacherDetails,
  addQualification,
  updateQualification,
  removeQualification,
  filterScheduleByDateRange,
  sortScheduleByDate,

  clearError,
} = teacherSlice.actions;

export default teacherSlice.reducer;
