import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  groupId: { type: String, required: true, unique: true },
  groupName: { type: String, required: true },
  admin: { type: String },
  members: [{ type: String }],
  taskId: { type: Number, required: true },
  taskName: { type: String, required: true },
  configuration: {
    shouldBotBeTagged: { type: Boolean, default: false, required: true },
    languagePreference: { type: String, default: 'en', required: true },
    translateTo: { type: String },
    customKeywords: [{ type: String }]
  },
  creationStatus: {
    step: { type: Number, default: 1, required: true}, // Tracks the current step of the process
    isComplete: { type: Boolean, default: false, required: true } // Marks if configuration is done
  }
}, { timestamps: true });


export const Group = mongoose.model('Group', GroupSchema);
