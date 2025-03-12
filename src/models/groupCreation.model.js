import mongoose from 'mongoose';

const GroupCreationSchema = new mongoose.Schema({
  groupId: { type: String, required: true, unique: true },
  groupName: { type: String, required: true },
  admin: { type: String, required: true },
  members: [{ type: String }],
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  taskName: { type: String },
  configuration: {
      shouldBotBeTagged: { type: Boolean, default: false },
      languagePreference: { type: String, default: 'en' },
      customKeywords: [{ type: String }]
  },
  creationStatus: {
      step: { type: Number, default: 1 }, // Tracks the current step of the process
      isComplete: { type: Boolean, default: false } // Marks if configuration is done
  }
}, { timestamps: true});

export const GroupCreation = mongoose.model('GroupCreation', GroupCreationSchema);
