export default function FetchDeleteAccount(reason, callback){
    const Data = { data: { reason } };

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('squarepass_access_token')}`
        }, 
        body: JSON.stringify(Data)
    }

    fetch(`${process.env.API_URL}/deleteAccount`, options).then(res => res.json())
        .then(res => res.code === 200 ? callback({ success: true, message: res.result.message }) : callback({ success: false }));
};