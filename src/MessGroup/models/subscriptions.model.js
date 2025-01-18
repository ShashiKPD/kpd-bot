import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
    subscriptionId: { 
        type: String, 
        required: true, 
        unique: true // Unique identifier for the subscription
    },
    memberId: { 
        type: String, 
        required: true, 
        ref: "Member" // Reference to the Member document
    },
    month: { 
        type: Date, 
        required: true // Start date of the month, e.g., "2025-01-01"
    },
    subscriptions: [
        {
            type: { 
                type: String, 
                required: true // e.g., "water", "wifi", "laundry"
            },
            status: { 
                type: String, 
                enum: ["active", "cancelled"], 
                default: "active" // Subscription status for this type
            }
        }
    ]
});

export const Subscription = mongoose.model("Subscription", SubscriptionSchema);
