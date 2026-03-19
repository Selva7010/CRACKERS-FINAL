import jwt from "jsonwebtoken";

 const auth = (role) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    try {
      const decoded = jwt.verify(token, "SECRET_KEY");
      req.user = decoded;

      if (role && decoded.role !== role)
        return res.status(403).json({ message: "Access denied" });

      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

export default auth;