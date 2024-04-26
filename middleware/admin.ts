export default function (req: any, res: any, next: () => void) {
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");
  next();
}
