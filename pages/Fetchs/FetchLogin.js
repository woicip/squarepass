export default function FetchLogin({ email, password }, callback){

    const LoginData = {
        data: {
            email_address: email,
            password: password
        }
    };
    
    const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(LoginData)
    };

    fetch(`${process.env.API_URL}/login`, options).then(res => res.json())
        .then(res => {
            if(res.code === 200){
                const { result } = res;
                callback({ success: true, token: result.token });

            } else {
                callback({success: false});
            }
        })
        .catch(err => console.log(err))
}