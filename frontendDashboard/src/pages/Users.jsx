import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";
import Data from "../store/data.js";

const Users = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim() === "") {
            setFilteredUsers([]);
            return;
        }

        const filtered = Data.filter((user) =>
            user.email.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    return (
        <div>


        <div className="p-4 flex justify-between items-center">
            <div className="relative flex">
                <input
                    type="text"
                    placeholder="Search by email..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="md:w-[350px] border p-2 rounded-2xl w-[150px] "
                />

                {searchTerm && filteredUsers.length > 0 && (
                    <div className="absolute left-0 mt-10 w-full bg-white border shadow-lg rounded-xl p-2 max-h-40 overflow-auto">
                        {filteredUsers.map((user) => (
                            <div key={user.id} className="p-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={() => navigate(`/edit-user/${user.id}`)
                                }>
                                {user.email}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={()=>navigate("/add-user")}
            >
                Add New User
            </button>
        </div>
            <UserTable users={Data} />
        </div>
    );
};

export default Users;
