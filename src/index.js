import { initializeWhatsappClient } from "./whatsappClient/whatsappClient.js";
import { connectDB } from "./db/index.js"
import { Group } from "./models/group.model.js";
import { Task } from "./models/task.model.js";

export const client = initializeWhatsappClient();

import LocalStore from "./db/local.store.js";

export const groupStore = new LocalStore(600000, Group);
export const taskStore = new LocalStore(600000, Task); // 10 minutes


connectDB();