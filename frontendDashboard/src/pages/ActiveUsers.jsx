import UserTable from "../components/UserTable.jsx";
import Data from "../store/data.js";

const ActiveUsers = ()=>{

    return(
        <>
            <UserTable users={()=>Data.filter(user=>user.status==="active")}/>
        </>
    )
}
export default ActiveUsers;