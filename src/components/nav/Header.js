import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined,LogoutOutlined } from '@ant-design/icons';
import { Link, Navigate } from "react-router-dom";



import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/database'
 require('firebase/auth')



const { SubMenu, Item } = Menu;


const Header = () => {

    const [current, setCurrent] = useState("home")
    let dispatch = useDispatch()
    const navigate = useNavigate()
    let {user} = useSelector( (state) => ({...state}) );

    const handleClick = (e) => {
        setCurrent(e.key);
    }

    const logout = () => {
        firebase.auth().signOut()
        dispatch({

            type: "LOGOUT",
            payload: null

        });

        navigate('/login')

    };

    return (

        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<AppstoreOutlined />}>
         <Link to="/" > Home </Link>
            </Item>
            
            {!user && (
                

                <Item key="register" icon={<UserAddOutlined />} className="navbar-right" >
                <Link to="/register" >Register</Link>
                </Item>

)}


            {!user && (
                
                <Item key="login" icon={<UserOutlined />} className="navbar-right" >
                <Link to="/login" >Login</Link>
                </Item>
                
     )}

             
       
            {user && (
                
                <SubMenu
                    key="SubMenu"
                    icon={<SettingOutlined />}
                    title={user.email && user.email.split('@')[0] }
                    className="navbar-right">
         
                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
                <Item icon={<LogoutOutlined/>} onClick={logout} >Logout</Item>
             
             
            </SubMenu>

      )}
       
      </Menu>

    )


}

export default Header;