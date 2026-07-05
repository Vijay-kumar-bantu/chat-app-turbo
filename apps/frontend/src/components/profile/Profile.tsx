import { useAuth } from '../../context/AuthContext';

function Profile() {
    const { user } = useAuth();

    if (!user) return;

    return (
        <div className="h-screen bg-white dark:bg-gray-900 p-5 text-gray-900 dark:text-white">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Profile settings </h1>

            <div className="flex flex-col justify-center items-center gap-7">
                <img className="h-[13%] w-[13%]" src={user.avatar} alt="user avatar" />
                <div className="flex gap-3">
                    <h2>Name</h2>
                    <h1>{user.name}</h1>
                </div>
            </div>
        </div>
    );
}

export default Profile;
