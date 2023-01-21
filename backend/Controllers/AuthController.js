import UserModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });

    if (user) {
      const validity = password === user.password;

      if(validity) {
        const token = jwt.sign({
          userName: user.userName, userId: user._id
        }, process.env.JWT_KEY, {expiresIn: '1h'});
        res.status(200).json(token);
      } else {
        res.status(400).json("Wrong Password");
      }
    } else {
      res.status(404).json("User does not exists");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
