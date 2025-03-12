import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  taskId: { type: Number, required: true, unique: true },
  taskName: { type: String, required: true },
  description: { type: String },
  llmPrompt: { type: String },
  actions: [
    {
      actionName: { type: String, required: true },
      actionDescription: { type: String },
      parameters: { type: mongoose.Schema.Types.Mixed }
    }
  ]
}, { timestamps: true });

export const Task = mongoose.model('Task', TaskSchema);
