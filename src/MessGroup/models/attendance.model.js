import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  attendanceId: 
  { 
    type: String, 
    required: true, 
    unique: true 
  },
  memberId: 
  { 
    type: String, 
    required: true, 
    ref: "Member" 
  },
  month: { // Store the first day of the month
    type: Date, 
    required: true 
  }, 
  attendance: { // 2D array
    type: [[Number]], 
    required: true 
  } 
});

export const Attendance = mongoose.model("Attendance", AttendanceSchema);
