import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu, Badge } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined,LogoutOutlined, ShoppingCartOutlined, } from '@ant-design/icons';
import { Link } from "react-router-dom";



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
    let {user, cart } = useSelector( (state) => ({...state}) );

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

            <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}> 
            Cart
           </Badge>
        </Link>
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
         
                {user && user.role === "subscriber" && (

                        <Item>

                            <Link to ="/user/history">Dashboard</Link>
                            
                        </Item>
                        
                )}

                {user && user.role === "admin" && (

                    <Item>

                        <Link to ="/admin/dashboard">Dashboard</Link>
                        
                    </Item>
                    
            )}


                <Item icon={<LogoutOutlined/>} onClick={logout} >Logout</Item>
             
             
            </SubMenu>

      )}
       
      </Menu>

    )


}

export default Header;