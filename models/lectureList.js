// LectureList schema
const mongoose = require("mongoose");

const lectureListSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  batches: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("LectureList", lectureListSchema);
