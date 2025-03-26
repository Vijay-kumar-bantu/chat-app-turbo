import { Router } from "express";
import user from "../schema/user";

const friendRouter: Router = Router();

friendRouter.post("/all-users", async (req, res) => {
	try {
		const { id } = req.body;
		const currentUser = await user.findById(id);
		const users = await user.find({
			_id: {
				$ne: id,
				$nin: [
					...(currentUser?.friends || []),
					...(currentUser?.requests || []),
				],
			},
		});
		res.status(200).json({
			users: users.map((user) => ({
				id: user._id,
				name: user.name,
				email: user.email,
				avatar: user.avatar,
			})),
		});
	} catch (err) {
		res.status(400).send("Server error");
	}
});

/* Sending requests */
friendRouter.post("/send-request", async (req, res) => {
	const { id, friendId } = req.body;
	const friend = await user.findById(friendId);

	try {
		if (friend) {
			friend.requests.push(id);
			await friend.save();
			res.status(200).send("Friend request sent");
		} else {
			res.status(404).send("User not found");
		}
	} catch (err) {
		res.status(400).send("Server error");
	}
});

/*Accepting the requests */
friendRouter.post("/add-friend", async (req, res) => {
	const { id, friendId } = req.body;
	const customer = await user.findById(id);
	const friend = await user.findById(friendId);
	try {
		if (customer && friend) {
			customer.friends.push(friendId);
			friend.friends.push(id);
			customer.requests = customer.requests.filter(
				(data) => data.toString() !== friendId
			);
			await customer.save();
			await friend.save();
			res.status(200).send("Friend request accepted");
		} else {
			res.status(400).send("Server error");
		}
	} catch (err) {
		res.status(400).send("Server error");
	}
});

export default friendRouter;
