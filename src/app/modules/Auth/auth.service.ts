
const loginUser = async(payload : {email : string, password : string}) =>{
    console.log("Login User", payload)
};


export const AuthService = {
    loginUser
};