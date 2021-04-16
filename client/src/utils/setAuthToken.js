import axios from 'axios';

const setAuthToken = jwt => {
    if(jwt) {
        axios.defaults.headers.common['x-auth-token'] = jwt
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken