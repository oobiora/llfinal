import axios from 'axios';

export const getVideos = async () => {
    axios.get('api/workouts/admin/get')
    let response = await axios.get('api/workouts/admin/all')
        .then((response) => {
            
            console.log(response.data)
            return response.data
        })
        .catch((err) => {
            throw err.response.data
        })
    // console.log(response[0])
    return response
}

export const resetVideoDB = () => {
    axios.get('api/workouts/admin/get')
    axios.get('api/workouts/admin/all')
}



export const activateVideo = async (data) => {

    console.log(data)
    let response = await axios.post('api/workouts/admin/activate', data)
        .then(response => {console.log(response)})
        .catch((err) => {console.log(err)})
}


