import Cookies from 'js-cookie';

export const isLogged = () => {
    let token = Cookies.get('token');
    return (token) ? true : false;
}
// Login
export const doLogin = (token, rememberPassword = false) => {
    if(rememberPassword) {
        Cookies.set('token', token, {expired:999})// demora 999 dias para expirar
    }else {
        Cookies.set('token', token)
    }
}

//Logout - remove o cookie
export const doLogout = () => {
    Cookies.remove('token');
}
