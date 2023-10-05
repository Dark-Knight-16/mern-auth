import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const Profile = () => {
    const {currentUser} = useSelector((state) => state.user);
  
    if(currentUser){
        return <div>profile</div>
    }
    
    return <Navigate to={'/sign-in'} />
}

export default Profile