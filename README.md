
# 🎓 Teacher Management Dashboard

This is a frontend application built with **React**, **Redux Toolkit**, and **TypeScript**, focused on managing teacher profiles, qualifications, addresses, and class schedules. The state is managed using `teacherSlice`, which interacts with an optional backend API and supports mock data fallback.

---

## 📦 Setup & Installation Instructions

### 1. Clone the Repository

```bash
git clone 
cd teacher-dashboard
```

### 2. Install Dependencies

Make sure you have Node.js (>= 16) and npm/yarn installed.

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root and add:

```env
NEXT_PUBLIC_TEACHER_API_URL=https://your-api-url.com/api/teachers
```

This is used to fetch real teacher data. If not defined or fails, mock data is automatically used.

### 4. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## ✨ Features

### 🧑‍🏫 Teacher Management

- View and edit teacher details (name, contact info, date of birth)
- Toggle editing mode with `isEditing` state

### 🎓 Qualification Management

- Add, update, and remove teacher qualifications
- Differentiate between `private` and `group` teaching types

### 🏠 Address Book

- Maintain multiple addresses per teacher (home, office, etc.)

### 📅 Schedule Management

- List all scheduled classes, breaks, and meetings
- Filter schedules by date range

### 🔃 Async Actions (Thunk)

- Fetch teacher data from API or fallback to mock data
- Update teacher information with PUT requests
- Smart error handling with fallback logging

### 🧰 Utilities

- Format and parse dates in `DD-MM-YYYY` format
- Compare dates and check date ranges
- Simulated API latency in absence of real endpoints

---

## 🧠 Design Decisions & Rationale

### ✅ Redux Toolkit

- Chosen for simplified state management and boilerplate reduction.
- `createAsyncThunk` enables clean handling of loading, success, and failure states.

### ✅ Client-Side Rendering (`"use client"`)

- Ensures the slice operates in SSR-friendly and client-first environments like Next.js.

### ✅ Mock Data Fallback

- Enables full app functionality without requiring backend API during local development.

### ✅ Consistent Date Format

- `DD-MM-YYYY` was chosen for easy human readability and uniformity across views.

### ✅ Separation of Concerns

- `fetchTeacherData` loads all data
- `fetchTeacherDetails` loads only profile, useful for lightweight updates
- Reducers and async actions are modular and easily testable

---

## 🤔 Assumptions Made

- The backend (if provided) follows a REST API structure like:
  - `GET /api/teachers/:id`
  - `GET /api/teachers/:id/details`
  - `PUT /api/teachers/:id`
- Schedule entries follow consistent time formatting (`HH:mm`) for sorting
- Network failures or undefined APIs gracefully fallback to mock data (`mockTeacherData`)
- Each entity (qualification, address, schedule slot) has a unique `id`
- The app is run in a modern React + Next.js setup, but logic is portable

---

## 📂 File Structure

```bash
src/
├── store/
│   ├── teacherSlice.ts       # Redux slice with all logic
│   └── mockdata.ts           # Fallback mock data
├── components/
│   └── (your React UI files)
├── pages/ or app/
│   └── (Next.js routes)
.env.local                    # Environment variables
README.md                    # Project documentation
```

---

## 📄 License

MIT License

---

## 🙌 Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
