import { useReducer } from 'react';
import { PageProvider } from './Context';
import pages from './State';

function reducer(state, action){
    switch(action.type){
        case "SET_CURRENT":
            return { ...state, current: action.payload };
        case "RESET_CURRENT":
            return { ...state, current: "" };
        case "SET_LOGGED_IN":
            return { ...state, isLoggedIn: action.payload };
        case "SET_SUCCESS":
            return { ...state, success: action.payload };
        case "SET_USER_FULLNAME":
            return { ...state, user: { ...state.user, full_name: action.payload } };
        case "SET_USER_EMAIL":
            return { ...state, user: { ...state.user, email_address: action.payload } };
        case "SET_USER_AVATAR":
            return { ...state, user: { ...state.user, avatar: action.payload }};
        case "SET_GRID":
            return { ...state,  }
        case "SET_PLATFORMS":
            return { ...state, platforms: action.payload };
        default:
            throw new Error();
    }
}

export default function StateReducer(props){
    const [ state, dispatch ] = useReducer(reducer, pages);

    const setCurrentPage = (value) => {
        dispatch({ type: "SET_CURRENT", payload: value });
    }

    const resetCurrentPage = () => {
        dispatch({ type: "RESET_CURRENT" });
    }

    const setLoggedIn = (payload) => {
        dispatch({ type: "SET_LOGGED_IN", payload });
    }

    const setSuccessContext = (payload) => dispatch({ type: "SET_SUCCESS", payload });

    const setUserFullname = (payload) => dispatch({ type: "SET_USER_FULLNAME", payload });
    const setUserEmail = (payload) => dispatch({ type: "SET_USER_EMAIL", payload });
    const setUserAvatar = (payload) => dispatch({ type: "SET_USER_AVATAR", payload });

    const setPlatforms = (payload) => dispatch({ type: "SET_PLATFORMS", payload });

    return (
        <>
            <PageProvider value={{ state, setCurrentPage, resetCurrentPage, setLoggedIn, setSuccessContext, setUserFullname, setUserEmail, setUserAvatar, setPlatforms }}>
                { props.children }
            </PageProvider>
        </>
    )
}