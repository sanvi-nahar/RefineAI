import mongoose from "mongoose";

async function connectToDb(url) {
    try{
        await mongoose.connect(url);
        console.log("CONNECTED TO MONGO DB");
    }
    catch(err) {
        console.log(err.message);
        console.log("There was an issue connecting to mongo db");
    }
}

export default connectToDb;