import mongoose from "mongoose";

async function connectDatabase(user, password) {
  await mongoose.connect(
    `mongodb+srv://${user}:${password}@cluster0.lmhyvvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  );
}

export default connectDatabase;