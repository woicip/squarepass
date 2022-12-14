export default function FetchCheckPassword(password, callback){
    const Data = {
        data: { password }
    };

    const option = {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('squarepass_access_token')}` },
        body: JSON.stringify(Data)
    }

    fetch(`${process.env.API_URL}/checkPassword`, option)
        .then(res => res.json())
        .then(res => {
            if(res.code === 200){
                callback({ success: true, result: res });
            } else {
                callback({ success: false });
            }
        })

}