export default function FetchSecrets(callback){
    // Fetch secrets from API Service

    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('squarepass_access_token')}`
        }
    };

    fetch(`${process.env.API_URL}/secrets`, options)
        .then(res => res.json())
        .then(res => {
            if(res.code === 200){
                callback(res);

            } else if(res.code === 401){
                callback(res);

            }
        })
        .catch(err => console.log(err));
}