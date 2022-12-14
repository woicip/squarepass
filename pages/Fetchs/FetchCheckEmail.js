export default function FetchCheckEmail({ email }, callback){

    const EmailData = { 
        data: {
            email_address: email
        }
     };

     const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(EmailData)
    }

    fetch(`${process.env.API_URL}/checkEmail`, options).then(res => res.json())
        .then(res => {
            if(res.code === 200){
                callback({ success: true });

            } else {
                callback({ success: false });
            }
        })
        .catch(err => console.log(err));
}