import 'tailwindcss/tailwind.css';
import { useEffect, useContext } from 'react';

// Context
import { PageContext } from './Context/Context';

// Fetch
import FetchSurvey from './Fetchs/FetchSurvey';

// * Components
import Welcome from './welcome';

export default function Index(props){

    const { setLoggedIn, state: { fetch_address } } = useContext(PageContext);

    useEffect(() => {
        const access_token = localStorage.getItem('squarepass_access_token');

        if(access_token === null){
            setLoggedIn(false);
        
        } else {
            FetchSurvey((result) => {
                if(result.authorized){
                    setLoggedIn(true);
                    location.href = "/home";
                } else {
                    setLoggedIn(false);
                    return;
                }
            });
        }
    }, [])

    return (
        <Welcome />
    )
}