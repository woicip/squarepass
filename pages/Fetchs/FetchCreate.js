export default function FetchCreate({ platform_name, platform_thumbnail, platform_icon, name, phrase }, callback){

    const CreateData = {
        data: {
            platform_name,
            platform_thumbnail, 
            platform_icon,
            name,
            phrase
        }
    };

    const options = {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem('squarepass_access_token')}` 
        },
        body: JSON.stringify(CreateData)
    };

    fetch(`${process.env.API_URL}/create`, options)
        .then(res => res.json())
        .then(res => {
            if(res.code === 200){
                callback();
            } else {
                alert("Failed to upload Create");
            }
        })
        .catch(err => console.log(err))
}