import { Router } from "express";
import { decrypt, encrypt } from "@repo/utils/aes";
import user from "../schema/user";

const authRouter: Router = Router();

/*login route */
authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const customer = await user
            .findOne({ email: email })
            .populate({ path: "friends", select: "_id name email avatar" })
            .populate({ path: "requests", select: "_id name email avatar" });

        if (customer) {
            if (password === decrypt(customer.password)) {
                res.status(200).send({
                    id: customer._id,
                    name: customer.name,
                    email: customer.email,
                    avatar: customer.avatar,
                    friends: customer.friends,
                    requests: customer.requests,
                });
            } else {
                res.status(400).send("Email or Password incorrect");
            }
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        res.status(400).send("Server error");
    }
});

/*register route */
authRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const encryptedPassword = encrypt(password);
        const avatar = `https://ui-avatars.com/api/?name=${name.split(" ").join("+")}&background=random&rounded=true`;
        if (await user.findOne({ email: email })) {
            res.status(400).send("Email already exists");
        } else {
            user.create({ name, email, password: encryptedPassword, avatar })
                .then(() => {
                    res.send("user registered");
                })
                .catch(err => {
                    res.status(400).send("server error");
                    console.log(err);
                });
        }
    } catch (err) {
        res.status(400).send("Server error");
    }
});

export default authRouter;
