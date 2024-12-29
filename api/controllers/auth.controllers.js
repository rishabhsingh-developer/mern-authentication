import User from "../model/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.json({ message: "user is created" });
  } catch (err) {
    next(err);
  }
};
export default signup;

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });

    if (!validUser)
      return next(errorHandler(500, "something is wrong try again"));
    const validPass = bcryptjs.compareSync(password, validUser.password);

    if (!validPass)
      return next(errorHandler(500, "something is wrong try again"));
    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET || "rishabh singh",
      { expiresIn: "1h" }
    );
    const { password: hashedPassword, ...rest } = validUser._doc;

    res.cookie("access_token", token).json(rest);
  } catch (err) {
    next(err);
  }
};
