export default function FetchPassword(callback){
    const options = { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('squarepass_access_token')}` }, }
    fetch(`${process.env.API_URL}/updatePassword`, options).then(res => res.json())
        .then(res => callback(res.result))
}