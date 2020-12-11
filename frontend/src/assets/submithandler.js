import axios from 'axios'

export const submit = async (data) => {
    let response = await axios.post("api/workouts/request/workout", data)
        .then(response => {
            
            return response.data})
        .catch((err) => {
            throw(err.response.data)
        })
    return response
}