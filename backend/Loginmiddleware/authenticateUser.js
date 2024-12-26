const authenticateUser = (req, res, next) => {
    const userId = req.headers.userid; // User ID passed from frontend
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    req.userId = userId;
    next();
  };
  
  module.exports = authenticateUser;
  