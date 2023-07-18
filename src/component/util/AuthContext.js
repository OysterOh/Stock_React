
import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false, 
    userEmail: '',
    userImage: '',
    onLogout: () => {}, 
    onLogin: (email, password) => {},
    setUserInfo: () => {}
});


export const AuthContextProvider = props => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState(''); 
    const [userImage, setUserImage] = useState('');


   
    useEffect(() => {
        if(localStorage.getItem('isLoggedIn') === '1') {
            setIsLoggedIn(true);
            setUserEmail(localStorage.getItem('LOGIN_USEREMAIL'));
            setUserImage(localStorage.getItem('Login_USERIMAGE'))
        } 
    }, []);


    //로그아웃 핸들러
    const logoutHandler = () => {
        localStorage.clear();
        setIsLoggedIn(false);
    };

    //로그인 핸들러
    const loginHandler = (token, email, image) => {
        localStorage.setItem('isLoggedIn', '1');
        localStorage.setItem('LOGIN_ACCESS_TOKEN', token);
        localStorage.setItem('LOGIN_USEREMAIL', email);
        localStorage.setItem('LOGIN_USERIMAGE', image);
        setIsLoggedIn(true);
        setUserEmail(email);
        setUserImage(image);
    };

    //카카오 로그인 핸들러
    const kLoginHandler = (token, email, image) => {
        localStorage.setItem('isLoggedIn', '1');
        localStorage.setItem('LOGIN_ACCESS_TOKEN', token);
        localStorage.setItem('LOGIN_USEREMAIL', email);
        localStorage.setItem('LOGIN_USERIMAGE', image);
        setIsLoggedIn(true);
        setUserEmail(email);
    };

    //토큰 및 로그인 유저 데이터를 브라우저에 저장하는 함수
    const setLoginUserInfo = ({ token, email, image }) => {
        localStorage.setItem('LOGIN_ACCESS_TOKEN', token);
        localStorage.setItem('LOGIN_USEREMAIL', email);
        localStorage.setItem('LOGIN_USERIMAGE', image);
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            userEmail,
            userImage,
            onLogout: logoutHandler,
            onLogin: loginHandler, kLoginHandler,
            setUserInfo: setLoginUserInfo
        }}>
            {props.children}
        </AuthContext.Provider>
    );

};

export default AuthContext;


