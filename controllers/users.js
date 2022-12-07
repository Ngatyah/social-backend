import User from "../models/User.js";

/*Read */

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }

};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const friends = await Promise.all(
            user.friends.map(async (id) => User.findById({ _id: id }))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            });

        res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


/*Update User*/

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;

        const user = await User.findById({ _id: id });
        const friend = await User.findById({ _id: friendId });
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter(id => id !== friendId);
            friend.friends = friend.friends.filter(id => id !== id); //TODO: will check if it worked Correct

        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map(async (id) => User.findById({ _id: id }))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            });

        res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(404).json({ message: err.message });

    }
}

