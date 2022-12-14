export default function FetchSurvey(callback){

    const options = { 
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem('squarepass_access_token')}` 
        } 
    };

    fetch(`${process.env.API_URL}/survey`, options).then(res => res.json())
        .then(res => {
            if(res.code === 200) callback({ authorized: true, message: "AUTHORIZED" });
            else if(res.code === 401) callback({ authorized: false, message: "UNAUTHORIZED" });
        });
}