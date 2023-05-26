import { useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "../Store/Hooks"
import { selectCurrentUser, selectIsLoggedIn } from "../Store/UserSlice"
import { enqueueSnackbar } from "notistack"
import { IntegrityId } from "../Store/CompanySlice"
import { useState } from "react"
import { Menu } from "@mui/material"

export const NavPanelIds = {
  initiatives: "navPanelInitiatives",
  users: "navPanelUsers",
  integrity: "navPanelIntegrity",
  client: "navPanelClient"
}

export default function NavPanel(){
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const currentUser = useAppSelector(selectCurrentUser);
  const navButtonStyle = "text-[#21345b] h-12 w-[90%] hover:bg-[#21345b] hover:text-white";
  const location = useLocation();
  const [navbarOpen, setNavbarOpen] = useState(false);

  function NavHandler(path: string) {
    if (!isLoggedIn) {
      
      enqueueSnackbar('You must login to leave this page', {variant:'error'});
    }
    else 
    {
      navigate(path);
      setNavbarOpen(false);
    }
  }

  function IsActivePath(pathToCheck: string)
  {
    return location.pathname === pathToCheck;
  }

  function GetNavStyle(path: string) : string
  {
    return navButtonStyle + (IsActivePath(path) ? " border-b-4 border-[#fab947] rounded-t-md" : " rounded-md");
  }

  return(
    <div className="grid place-items-left p-[2%] py-3 space-y-3">
      <button onClick={() => setNavbarOpen(!navbarOpen)}>{navbarOpen ? 'close' : 'open'}</button>
      <Menu className={navbarOpen ? 'menuStyle' : 'closeMenuStyle'} open={navbarOpen}>
      <button style={{ fontSize: '20px', marginTop: '30px', marginLeft: '10px', textAlign: "left"}} id={NavPanelIds.initiatives} className={GetNavStyle("/Initiatives")}
        onClick={() => NavHandler('/Initiatives')}>
          <i className="material-icons" style={{ fontSize: '30px', marginRight: '25px'}}>info_outline</i>
          Initiative Management
      </button>
      {
        currentUser?.isAdmin && currentUser?.isActive &&
        <button style={{ fontSize: '20px', marginTop: '30px', marginLeft: '10px', textAlign: "left"}} id={NavPanelIds.users} className={GetNavStyle("/Users")}
          onClick={() => NavHandler('/Users')}>
          <i className="material-icons" style={{ fontSize: '30px', marginRight: '25px'}}>person_outline</i>
          User Management
        </button>
      }
      {
        currentUser?.isAdmin && currentUser?.isActive && currentUser?.companyId === IntegrityId &&
        <button style={{ fontSize: '20px', marginTop: '30px', marginLeft: '10px', textAlign: "left"}} id={NavPanelIds.integrity} className={GetNavStyle("/Integrity")}
          onClick={() => NavHandler('/Integrity')}>
          <i className="material-icons" style={{ fontSize: '30px', marginRight: '25px'}}>keyboard</i>
          Developer Management
        </button>
      }
      {
        currentUser?.isAdmin && currentUser?.isActive && currentUser?.companyId === IntegrityId &&
        <button style={{ fontSize: '20px', marginTop: '30px', marginLeft: '10px', textAlign: "left"}} id={NavPanelIds.client} className={GetNavStyle("/ClientPage")}
          onClick={() => NavHandler('/ClientPage')}>
          <i className="material-icons" style={{ fontSize: '40px', marginRight: '25px'}}>manage_accounts</i>
          Client Management
        </button>
      }
    </Menu>
    </div>  
  )
}