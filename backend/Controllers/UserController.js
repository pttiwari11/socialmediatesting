import UserModel from "../Models/UserModel.js";

export const getUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (user) {
      const { userName, followers, following } = user._doc;
      res
        .status(200)
        .json(`${userName}, ${followers.length}, ${following.length}`);
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const followUser = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  
  if (userId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(userId);
      if (!followUser.followers.includes(userId)) {
        await followUser.updateOne({ $push: { followers: userId } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json(followUser.userName);
      } else {
        res
          .status(403)
          .json(followUser.userName + " is Already followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export const unfollowUser = async (req, res) => {
  const id = req.params.id;

  const { userId } = req.body;

  if (userId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const unfollowUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(userId);

      if (unfollowUser.followers.includes(userId)) {
        await unfollowUser.updateOne({ $pull: { followers: userId } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json(unfollowUser.userName + " Unfollowed!");
      } else {
        res.status(403).json(unfollowUser.userName + " is not followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
