import { Button } from "antd";
import Page from "../../../../components/pageWrapper/Page";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/appHooks";
import { logout } from "../../../../redux/features/auth/authSlice";

export default function UserProfile() {
  const {name,email} = useAppSelector(state=>state.auth);
const dispatch = useAppDispatch();
  console.log('hello')
  return (
    <Page heading="My Profile" content="Wellome to Trade Analysis">
      <div className="h-full">
           <div className="flex items-center gap-4 py-4 px-6 bg-white shadow w-fit">
           <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
              alt="userImage"
              className="w-20 h-24 rounded"
            />
          <div className="space-y-1">
          <p>User Name : {name}</p>
            <p>User Email : {email}</p>
            <Button onClick={()=>dispatch(logout())} className="mt-2">
              Logout
            </Button>
          </div>
           </div>
      </div>
    </Page>
  )
}
