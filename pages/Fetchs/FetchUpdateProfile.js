export default function FetchUpdateProfile({ new_full_name, new_avatar }, callback){
    const formdata = new FormData();
    formdata.append("new_full_name", new_full_name);
    formdata.append("new_avatar", new_avatar);

    fetch(`${process.env.API_URL}/updateProfile`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('squarepass_access_token')}`
        },
        body: formdata
    })
        .then(res => res.json())
        .then(res => {
            if(res.code === 200){
                callback({ success: true, token: res.result.token });
            } else {
                callback({ success: false });
            }
        })
}