export default function FetchRegister(callback){
    fetch(`${process.env.API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(RegisterData)
    })
        .then(res => res.json())
        .then(res => {
            if(res.code === 200){
                callback()
            } else {
                return;
            }
        })
        .catch(err => console.log(err))
}