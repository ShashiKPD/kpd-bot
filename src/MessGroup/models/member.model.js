import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    memberId: { 
      type: String, 
      required: true, 
      unique: true 
    },
    fullName: { 
      type: String, 
      required: true,
      trim: true,
    },
    phone: { 
      type: String, 
      required: true,
      unique: true
    },
    email: { 
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
    }
});

export const Member = mongoose.model("Member", MemberSchema);
