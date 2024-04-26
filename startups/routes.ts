import express from "express";
import auth from "../routes/auth";
import customers from "../routes/customers";
import genres from "../routes/genres";
import movies from "../routes/movies";
import users from "../routes/users";


export default function (app: any) {
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
}
