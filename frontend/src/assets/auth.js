import axios from 'axios';



export const Register = async (email, username, password) => {
    let response = await axios.post(
        "/users/api/signup", {email: email, password: password, username: username}, { withCredentials:true }
        )
        .catch(err => {
             throw(err.response.data)
             
        }) 
        .then(response => {
            return response.data
        })
    return response
    

    
}
export const LoginUser = async(method, password) => {
    console.log(`sending ${method}, ${password}`)
    let response = await axios.get(
            "/users/api/login", {params:{method: method, password: password}, withCredentials:true}
        )
        .catch(err => {
            throw(err.response.data)
        })
        .then(response => {
            return response.data
        })

    return response
}
// export const Logout
export const AuthenticateUserPage = async () => {
    console.log("Breakpoint")
    let response = await axios.get('/users/api/authenticate/user', { withCredentials: true })
        .catch(err => {
            console.log(err.response.data)
            throw(err.response.data)
        })
        .then(response => {
            console.log(response.data.permission)
            return response.data.permission
        })
    return response
}

export const AuthenticateAdminPage = async () => {
    console.log("Breakpoint")
    let response = await axios.get('/users/api/authenticate/admin', { withCredentials: true })
        .catch(err => {
            console.log(err.response.data)
            throw(err.response.data)
        })
        .then(response => {
            console.log(response.data.permission)
            return response.data.permission
        })
    return response
}