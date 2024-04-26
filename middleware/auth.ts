import jwt from "jsonwebtoken";

export default function auth(req: any, res: any, next: () => void) {
  console.log("Authenticating...");

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, "jwtSecret");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
}
