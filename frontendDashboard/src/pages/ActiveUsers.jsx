import UserTable from "../components/UserTable.jsx";
import Data from "../store/data.js";

const ActiveUsers = ()=>{

    return(
        <div className="dark:bg-neutral-600 font-bold">
            <UserTable users={()=>Data.filter(user=>user.status==="active")}/>
        </div>
    )
}
export default ActiveUsers;