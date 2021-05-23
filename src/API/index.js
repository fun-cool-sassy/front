import axios from 'axios'

export async function searchAddress (keyword){
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyword}&key=AIzaSyDP5khM0bM6hxMmn1nkIO6d4I1bnHy6kdw`)
    return response;
}

const EndPoint = 'http://production.ap-northeast-2.elasticbeanstalk.com'

export async function postSignIn(payload) {//로그인
    await axios.post(`${EndPoint}/token`, payload)
    .then(({data})=>{
        localStorage.setItem('token',data.access_token);
        }
    )
    .catch((e)=>alert('Login Failed!'));
   
    
}

export async function postSignUp(payload) {//로그아웃
    console.log(payload)
    const { data } = await axios.post(`${EndPoint}/users`, payload)
    console.log(data);
    return data
}

export async function postArticle(payload, headers) {
    console.log(payload)
    const { data } = await axios.post(`${EndPoint}/articles`, payload, {headers})
    console.log(data);
    return data
}
export async function getArticleList(payload,headers) {
    const { data } = await axios.get(`${EndPoint}/articles?${payload}`, {headers})
    return data
}

export async function getRankList() {
    const { data } = await axios.get(`${EndPoint}/user-ranks`, {

    })
    return data
}
