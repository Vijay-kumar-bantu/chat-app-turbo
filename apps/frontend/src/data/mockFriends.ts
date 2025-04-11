export const mockFriendRequests = [
    {
        id: "1",
        senderId: "2",
        senderName: "Alice Johnson",
        senderAvatar: "https://ui-avatars.com/api/?name=Alice+Johnson",
        status: "pending",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
        id: "2",
        senderId: "3",
        senderName: "Bob Wilson",
        senderAvatar: "https://ui-avatars.com/api/?name=Bob+Wilson",
        status: "pending",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
    {
        id: "3",
        senderId: "4",
        senderName: "Carol Smith",
        senderAvatar: "https://ui-avatars.com/api/?name=Carol+Smith",
        status: "pending",
        timestamp: new Date(Date.now() - 10800000).toISOString(),
    },
] as const;

export const mockSearchResults = [
    {
        id: "5",
        name: "David Brown",
        avatar: "https://ui-avatars.com/api/?name=David+Brown",
        status: "online",
    },
    {
        id: "6",
        name: "Emma Davis",
        avatar: "https://ui-avatars.com/api/?name=Emma+Davis",
        status: "offline",
        lastSeen: "2 hours ago",
    },
    {
        id: "7",
        name: "Frank Miller",
        avatar: "https://ui-avatars.com/api/?name=Frank+Miller",
        status: "online",
    },
] as const;
