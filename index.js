const express = require("express");

const mongoose = require("mongoose");
const UserLogin = require("./models/userlogin.js");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const initDB = require("./models/initDB.js");
const userlogin = require("./models/userlogin.js");
const Course = require("./models/course.js");
const LectureList = require("./models/lectureList.js");
// const lectureList = require("./models/lectureList.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});

initDB();

app.get("/", (req, res) => {
  res.send("root");
});

app.get("/login", async (req, res) => {
  res.render("login");
});
app.get("/admindashboard", (req, res) => {
  res.render("admindashboard");
});

app.post("/login", async (req, res) => {
  let { username, password, role } = req.body;
  console.log(username, password, role);

  try {
    const user = await UserLogin.findOne({ username, password });
    if (!user) {
      res.send("user does not exist");
    }
    if (user.role == "admin" && role == "instructor") {
      return res.send("you can't login as instructor");
    } else if (user.role == "admin" && role == "admin") {
      res.redirect("/admindashboard");
    } else if (user.role == "instructor" && role == "admin") {
      return res.send("you can't login as admin");
    } else if (user.role == "instructor" && role == "instructor") {
      res.redirect("/instructordashboard");
    }

    console.log(user);
  } catch (e) {}
});

app.get("/instructordashboard", async (req, res) => {
  try {
    // Fetch all lecture lists from the database
    const lectureLists = await LectureList.find();
    console.log(lectureLists);
    // Render the instructor dashboard template with all lecture lists

    res.render("instructordashboard", { assignedCourses: lectureLists });
  } catch (error) {
    console.error("Error fetching lecture lists:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/addInstructor", (req, res) => {
  res.render("addInstructor");
});
app.get("/addCourse", (req, res) => {
  res.render("addCourse");
});
// app.get("/showCourse", (req, res) => {
//   res.render("showCourse");
// });

app.post("/addInstructor", async (req, res) => {
  const { username, password } = req.body;
  const role = "instructor";

  try {
    const existingInstructor = await UserLogin.findOne({ username });
    if (existingInstructor) {
      res.send("Instructor with this username already exists  ");
    }
    const newInstructor = new userlogin({
      username: username,
      password: password,
      role: role,
    });

    await newInstructor
      .save()
      .then((r) => {
        res.send("instructor added succesfully");
      })
      .catch((e) => res.send(e));
  } catch (e) {
    console.log(e);
  }
});

app.post("/addCourse", async (req, res) => {
  const { name, level, description, imageUrl } = req.body;

  try {
    const newCourse = new Course({
      name,
      level,
      description,
      image: imageUrl,
    });

    await newCourse.save();
    console.log("course added");
    // Respond with a success message
    res.status(201).json({ message: "Course added successfully" });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ error: "Failed to add course" });
  }
});

app.get("/showCourse", async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await Course.find();
    console.log(courses);

    // Fetch instructors whose role is assigned as 'instructor'
    const instructors = await UserLogin.find({ role: "instructor" });

    // Render the 'showCourse' EJS template with the fetched course and instructor data
    res.render("showCourse", { courses, instructors });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// app.post("/assignCourse", async (req, res) => {
//   try {
//     // Extract data from the form submission
//     const { instructor, date, batch, course } = req.body;

//     // Save the assignment details to the database
//     const assignedCourse = await LectureList.create({
//       instructor: instructor,
//       date: new Date(date), // Convert date string to Date object
//       course: course,
//       batches: [batch],
//     });

//     // Handle success or error
//     res.status(200).send("Course assigned successfully");
//   } catch (error) {
//     console.error("Error assigning course:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.post("/assignCourse", async (req, res) => {
  try {
    // Extract data from the form submission
    const { instructor, date, batch, courseName } = req.body;

    function formatDate(inputDate) {
      const dateParts = inputDate.split("-");
      const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
      return formattedDate;
    }
    let formattedDate = formatDate(date);

    // Check if the instructor already has a course assigned on the same date
    const existingCourse = await LectureList.findOne({
      instructor: instructor,
      date: formattedDate,
    });
    if (existingCourse) {
      // If there's an existing course, send an alert
      return res.status(400).send("Course already assigned on this date.");
    }
    // Save the assignment details to the database
    const assignedCourse = await LectureList.create({
      instructor: instructor,
      date: formattedDate, // Convert date string to Date object
      course: courseName, // Using the courseName instead of course
      batches: [batch],
    });

    // Handle success or error
    res.status(200).send("Course assigned successfully");
  } catch (error) {
    console.error("Error assigning course:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/logout", (req, res) => {
  res.render("logout")
});
