import mongoose from "mongoose";

interface ICourse {
  name: string;
  author?: string;
  tags: string[];
  date: Date;
  isPublished: boolean;
  price?: number;
  category: "web" | "mobile" | "network";
}

mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema<ICourse>({
  name: { type: String, minlength: 5, required: true },
  author: String,
  tags: {
    type: [String],
    validate: {
      validator: function (v: any) {
        return v && v.length > 0; 
      },
      message: "A course should have at least one tag.", //custom validator
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  price: {
    type: Number,
    required: function () {
      return this.isPublished; // require only if isPublished is true
    },
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    // tags: ["angular", "frontend"],
    category: 'web',
    isPublished: true,
    // price: 12
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (error: any) {
    console.log(error.message);
  }
}
createCourse();

async function getCourses() {
  const courses = await Course
    // .find({ author: "Mosh", isPublished: true })
    .find({ price: { $gte: 10, $lte: 20 } })
    .find({ price: { $in: [10, 20, 30] } })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
// getCourses();

async function updateCourse(id: string) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jack",
        isPublished: true,
      },
    },
    { new: true }
  );
  console.log(course);
}
// updateCourse("661719eca0b711d9a811a0cd");

async function remove(id: string) {
  const course = await Course.findByIdAndDelete({ _id: id });
  console.log(course);
}
// remove("661719eca0b711d9a811a0cd");
