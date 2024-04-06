const mongoose = require("mongoose");
const Login = require("./userlogin.js")
// Function to initialize the database with initial data
async function initDB() {
    // Connect to the MongoDB database
    const MONGO_URL = "mongodb://localhost:27017/lecturescheduling"
    // const MONGO_URL = "mongodb://localhost:27017/lecturescheduling"
    await mongoose.connect(MONGO_URL);

    // Check if there are any existing records
    const existingRecords = await Login.find();
    
    // If no records exist, add initial data
    if (existingRecords.length === 0) {
        // Initial data to be added
        const initialData = [
            { username: "ideamagix", password: "idemagix", role: "admin" },
            { username: "ideamagixInstructor", password: "ideamagixInstructor", role: "instructor" }
        ];

        // Insert the initial data into the database
        await Login.insertMany(initialData);
        console.log("Initial data added to the database.");
    } else {
        console.log("Database already contains data. Skipping initialization.");
    }

    
    // Disconnect from the database
    // await mongoose.disconnect();
}

// Call the initDB function to initialize the database
// initDB().catch(error => console.error(error));
module.exports = initDB;