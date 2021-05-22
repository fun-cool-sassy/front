import axios from 'axios'

export async function searchAddress (keyword){
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyword}&key=AIzaSyDP5khM0bM6hxMmn1nkIO6d4I1bnHy6kdw`)
    return response;
    
}