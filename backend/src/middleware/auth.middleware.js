import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Extract token from Authorization header (Format: "Bearer <token>")
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Verify token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    
    // Attach user ID to request object for use in controllers
    req.user = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

export default authMiddleware;
