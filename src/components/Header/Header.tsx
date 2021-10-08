import React, { useEffect, useState } from 'react'
import logo from '../../assets/generatedtext (2).png'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuIcon from '@mui/icons-material/Menu';
import FormInput from '../FormInput/FormInput';
import Backdrop from '@mui/material/Backdrop';

const Header = () => {

    // const wrapperRef = useRef(null);
    // useOutsideAlerter(wrapperRef);

    const [open, setOpen] = React.useState(false);
    const [signIn, setSignIn] = useState(false);

    const close = () => {
        setOpen(false);
    }
    const handleToggle = () => {
      setOpen(!open);
    };


    return (
        <div className="header" >
            <div>
                <img 
                    className="header_logo"
                    src={logo} 
                    alt="logo"
                />
            </div>
            <div>
                <AddCircleIcon 
                    className="hearder_addIcon" 
                    fontSize="large" 
                    onClick={handleToggle}
                />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    // onClick={(e) => {handleClose}
                >
                    <FormInput handleClose={close}/>
                </Backdrop>
            </div>
            <div>
                <MenuIcon 
                    className="hearder_menuIcon" 
                    fontSize="large"
                    onClick={() => setSignIn((s) => !s)}
                />
                {signIn ? (
                <div className="header_signIn">
                    <p>Coming soon</p>
                </div>
                ) : null}
                
            </div>
        </div>
    )
}

export default Header
