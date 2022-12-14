export default function FetchGetDetail(xyzsec_id, callback){

    const DetailData = {
        data: { xyzsec_id }
    }

    fetch(`${process.env.API_URL}/detail`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('squarepass_access_token')}`
        },
        body: JSON.stringify(DetailData)
    })
        .then(res => res.json())
        .then(res => {
            if(res.code === 200){
                callback(res);
            } else {
                alert("Failed to fetch secret");
            }
        })
        .catch(err => console.log(err));
}
