export default function FetchUpdateEmail(new_email_address, callback){
    const UpdateEmailData = {
        data: { new_email_address }
    };

    const option = {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem('squarepass_access_token')}` 
        },
        body: JSON.stringify(UpdateEmailData)
    }

    fetch(`${process.env.API_URL}/updateEmail`, option).then(res => res.json())
        .then(res => {
            if(res.code === 200){
                callback({ success: true, token: res.result.token });

            } else {
                callback({ success: false });
            }
        })
}