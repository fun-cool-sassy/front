import axios from 'axios'

export async function searchAddress (keyword){
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyword}&key=AIzaSyDP5khM0bM6hxMmn1nkIO6d4I1bnHy6kdw`)
    return response;
}

const EndPoint = ''

export async function postSignIn(payload) {
    const { data } = await axios.post(`${EndPoint}/sigin-in`, {

    })
    return data
}

export async function postSignUp(payload) {
    const { data } = await axios.post(`${EndPoint}/sigin-up`, {

    })
    return data
}

export async function getRankList() {
    const { data } = await axios.get(`${EndPoint}/rank`, {

    })
    return data
}
