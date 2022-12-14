export default function FetchPlatforms(callback){

    const options = { headers: { 'Content-Type': 'application/json' }};

    fetch(`${process.env.API_URL}/getPlatforms`, options).then(res => res.json())
        .then(res => {
            if(res.code === 200){
                callback({ success: true, message: "GOT THE PLATFORMS", platforms: res.result.platforms });
            }
        });
}