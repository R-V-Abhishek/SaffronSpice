const validateSignupFields = (req, res, next) => {
    const { fname, lname, email, dob, phone, username, password } = req.body;
    if (!fname || !lname || !email || !dob || !phone || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    next();
  };
  
  const validateLoginFields = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    next();
  };
  
  module.exports = { validateSignupFields, validateLoginFields };
  