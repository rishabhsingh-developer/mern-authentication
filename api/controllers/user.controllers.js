import User from "../model/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import bcryptjs from "bcryptjs";
import Listing from "../model/listing.model.js";
dotenv.config();

export const test = (req, res) => {
  res.json({
    message: "API is working!",
  });
};

// export const updateUser = async (req, res, next) => {};

export const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // const result = await new Promise((resolve, reject) => {
    //   cloudinary.uploader.upload(filePath, (error, result) => {
    //     if (error) {
    //       reject(new Error("Upload to Cloudinary failed."));
    //     } else {
    //       resolve(result);
    //     }
    //   });
    //   imgUrl = result.secure_url;
    //   console.log(result.secure_url);
    // });
    // console.log(result);

    // fs.unlinkSync(filePath);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePic: req.body.profilePic,
        },
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    next();
  }
};

// export const updateUser = async (req, res, next) => {
//   try {
//     if (req.body.password) {
//       return (req.body.password = bcryptjs.hashSync(req.body.password, 10));
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           username: req.body.username,
//           email: req.body.email,
//           password: req.body.password,
//         },
//       },
//       { new: true }
//     );
//     const { password, ...rest } = updatedUser._doc;
//     res.status(200).json(rest);
//   } catch (err) {
//     next(err);
//   }
// };

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

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, "User not found!"));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
