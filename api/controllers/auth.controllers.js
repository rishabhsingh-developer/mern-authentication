import User from "../model/user.model.js";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  try {
    await newUser.save();
    res.json({ message: "user is created" });
  } catch (err) {
    next(err);
  }
};
export default signup;
