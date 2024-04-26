const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// // author
// const authorSchema = new mongoose.Schema({
//   name: String,
//   bio: String,
//   website: String,
// });
// const Author = mongoose.model("Author", authorSchema);

// // course
// const courseSchema = new mongoose.Schema({
//   name: String,
//   author: {
//     type: authorSchema,
//     required: true,
//   },
// });
// const Course = mongoose.model("Course", courseSchema);

// // setter

// // create course
// async function createCourse(name, author) {
//   const course = new Course({
//     name,
//     author,
//   });

//   const result = await course.save();
//   console.log(result);
// }
// // createCourse("Node Course", new Author({ name: "Mosh" }));

// // update author
// async function updateAuthor(courseId) {
//   const course = await Course.findByIdAndUpdate(
//     { _id: courseId },
//     { "author.name": "Sawsan Danna" }
//   );
// }
// updateAuthor("661cc6ca057c56b18dbb244d");

// // list course
// async function listCourses() {
//   const courses = await Course.find();
//   console.log(courses);
// }

// using array
// author
const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});
const Author = mongoose.model("Author", authorSchema);

// course
const courseSchema = new mongoose.Schema({
  name: String,
  authors: [authorSchema],
});
const Course = mongoose.model("Course", courseSchema);

// setter

// create course
async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}
// createCourse("Node Course", [new Author({ name: "Mosh" }),new Author({ name: "John" })]);

// add author
async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}
addAuthor("661ccc10a48913371d620994", new Author({ name: "Amy" }));


// update author
async function updateAuthor(courseId) {
  const course = await Course.findByIdAndUpdate(
    { _id: courseId },
    { "author.name": "Sawsan Danna" }
  );
}
// updateAuthor("661cc6ca057c56b18dbb244d");

// list course
async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}
