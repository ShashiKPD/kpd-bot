import mongoose from "mongoose";

const MonthlySubscriptionPlansSchema = new mongoose.Schema({
    month: { 
        type: Date, 
        required: true, 
        unique: true // Ensures only one document per month
    },
    subscriptions: [
        {
            type: { 
                type: String, 
                required: true // e.g., "water", "wifi", "laundry"
            },
            amount: { 
                type: Number, 
                required: true // Monthly price for this subscription
            }
        }
    ]
});

export const MonthlySubscriptionPlans = mongoose.model("MonthlySubscriptionPlans", MonthlySubscriptionPlansSchema);
