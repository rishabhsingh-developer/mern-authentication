import User from "../model/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
export const test = (req, res) => {
  res.json({
    message: "API is working!",
  });
};
// update user

export const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      return (req.body.password = bcryptjs.hashSync(req.body.password, 10));
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id: _id } = req.params;
  console.log(_id);
  try {
    await User.findByIdAndDelete(_id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(err);
  }
};
