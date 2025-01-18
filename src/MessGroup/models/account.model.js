import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  accountId: { 
    type: String, 
    required: true, 
    unique: true 

  },
  memberId: { 
    type: String, 
    required: true, 
    ref: "Member" 

  },
  balance: { 
    type: Number, 
    required: true 

  },
  transactions: [
      {
          date: { 
            type: Date, 
            required: true 
          },
          amount: { 
            type: Number, 
            required: true 
          },
          type: { 
            type: String, 
            enum: ["credit", "debit"], 
            required: true 
          }
      }
  ]
});

export const Account = mongoose.model("Account", AccountSchema);
