const addFriend = async (id: string, friendId: string) => {
    console.log("Adding friend with ID:", friendId);
    const response = await fetch(import.meta.env.VITE_ADD_FRIEND_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${id}`,
        },
        body: JSON.stringify({ id: id, friendId: friendId }),
    });

    return response;
};

export default addFriend;
