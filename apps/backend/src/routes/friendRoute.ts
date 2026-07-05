import { Router } from 'express';
import user from '../schema/user';

const friendRouter: Router = Router();

friendRouter.post('/all-users', async (req, res) => {
    try {
        const { id } = req.body;
        const currentUser = await user.findById(id);
        const users = await user.find({
            _id: {
                $ne: id,
                $nin: [...(currentUser?.friends || []), ...(currentUser?.requests || [])],
            },
        });

        res.status(200).json({
            users: users.map(user => ({
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            })),
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

/* Sending requests */
friendRouter.post('/send-request', async (req, res) => {
    const { id, friendId } = req.body;
    const friend = await user.findById(friendId);

    try {
        if (!friend) {
            res.status(404).send('User not found');
            return;
        }

        friend.requests.push(id);
        await friend.save();
        res.status(200).send('Friend request sent');
    } catch (err) {
        res.status(500).send('Server error');
    }
});

/*Accepting the requests */
friendRouter.post('/add-friend', async (req, res) => {
    const { id, friendId } = req.body;
    const customer = await user.findById(id);
    const friend = await user.findById(friendId);

    try {
        if (!customer || !friend) {
            res.status(404).send('User not found');
            return;
        }

        customer.friends.push(friendId);
        friend.friends.push(id);
        customer.requests = customer.requests.filter(d => d.toString() !== friendId);
        await Promise.all([customer.save(), friend.save()]);

        res.status(200).send({
            _id: friend._id,
            name: friend.name,
            email: friend.email,
            avatar: friend.avatar,
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

export default friendRouter;
