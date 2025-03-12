import mongoose from 'mongoose';

class LocalStore {
  constructor(ttlMs = 60000, dbModel) {
    if(dbModel && !dbModel.findOne) {
      throw new Error('Invalid MongoDB model provided!');
    }
    this.store = {};
    this.ttlMs = ttlMs; // Time-to-live in milliseconds
    this.dbModel = dbModel; // MongoDB model for fallback
  }

  set(key, value) {
    this.store[key] = { value, expiry: Date.now() + this.ttlMs };
  }

  async get(key) {
    const item = this.store[key];
    if (item) {
      if (Date.now() < item.expiry) {
        return item.value;
      } else {
        delete this.store[key]; // Remove expired entry
      }
    }

    // Fallback to MongoDB if not found or expired
    if (this.dbModel) {
      console.log(`Fetching ${key} from MongoDB...`);
      const dbResult = await this.dbModel.findOne({ groupId: key });
      
      if (dbResult) {
        if(dbResult.creationStatus && dbResult.creationStatus.isComplete === true){
          this.set(key, dbResult); // Cache the fetched data
        }
        return dbResult;
      }      
    }
    
    return null; // Return null if not found anywhere
  }
}

export default LocalStore;
// Example usage (with MongoDB model):
// const store = new LocalStore(30000, YourMongoModel);

// Want me to add encryption or logging? Let me know! 🚀
