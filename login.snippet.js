function login(){
    // const [ fetchedEmail, setFetchedEmail ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ wrongEmail, setWrongEmail ] = useState(false);
    const [ inputCheck, setInputCheck ] = useState(false);

    const [ next, setNext ] = useState(false);
    const [ microInvalid, setMicroInvalid ] = useState({ status: false, message: "" });
    const [ moveNext, setMoveNext ] = useState(false);
    
    // const [ fetchedPassword, setFetchedPassword ] = useState('awikwokgaming123');
    const [ password, setPassword ] = useState('');
    const [ wrongPassword, setWrongPassword ] = useState(false);
    const [ signIn, setSignIn ] = useState(false);

    function InputCheckEmail(e){
        const email = e.target.value;
        setEmail(email);
        
        // You can fetch search Email on database in
        // this function. of course on this line.

        if(!email.length){
            setWrongEmail(false);
            setMicroInvalid({ status: false, message: "" });
        }

        if(email.includes('@')){ // jika ada @
            if(email.includes('.')){ // jika ada .
                if(email[email.lastIndexOf('.') + 2] !== undefined){ // danjuga ... jika ada nama domain setelah .
                    setInputCheck(true);
                    setWrongEmail(false);
                    setMicroInvalid({ status: false, message: "" });
                } else {
                    setInputCheck(false);
                }
            } else { // jika tidak ada .
                setInputCheck(false);
            }
        } else { // jika tidak ada @
            setInputCheck(false);
        }
    }

    function FetchCheckEmail(){

        const EmailData = { 
            data: {
                email_address: email
            }
         };

        fetch('http://localhost:3333/checkEmail', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(EmailData)
        })
            .then(res => res.json())
            .then(res => {
                if(res.code === 200){
                    setWrongEmail(false);
                    setMicroInvalid({ status: false, message: "" });
                    setMoveNext(true);

                } else {
                    setWrongEmail(true);
                    setMicroInvalid({ status: true, message: "Email Not Found" });
                }
            })
            .catch(err => console.log(err));
    }

    function SubmitCheckEmail(e){
        e.preventDefault();

        if(email.includes('@')){
            if(email.includes('.')){
                if(email[email.lastIndexOf('.') + 2] !== undefined){ // danjuga ... jika ada nama domain setelah .
                    FetchCheckEmail();
                } else {
                    setWrongEmail(true);
                    setMicroInvalid({ status: true, message: "Email are Invalid" });
                }
            } else {
                setWrongEmail(true);
                setMicroInvalid({ status: true, message: "Email are Invalid" });
            }
        } else {
            setWrongEmail(true);
            setMicroInvalid({ status: true, message: "Email are Invalid" });
        }
    }

    function FailedLoginHandler(failed){
        if(failed){
            setWrongPassword(true);
            setMicroInvalid({ status: true, message: "Wrong Password" });
            
        } else {
            setWrongPassword(false);
            setMicroInvalid({ status: false, message: "" });
        }
    }

    function SubmitCheckPassword(){
        // Code here to check fetched password with input password
        // If password is same then bring user to home.

        const LoginData = {
            data: {
                email_address: email,
                password: password
            }
        };

        fetch('http://localhost:3333/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(LoginData)
        })
            .then(res => res.json())
            .then(res => {
                if(res.code === 200){
                    FailedLoginHandler(false);
                    localStorage.setItem('squarepass_access_token', res.result.token);

                } else {
                    FailedLoginHandler(true);
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if(email.includes('@')){
            setNext(true);
        } else {
            setNext(false);
        }

        return () => { window.document.title = "" };
    });

    useEffect(() => {
        if(password.length > 0){
            setSignIn(true);
        } else {
            setSignIn(false);
        }

        return () => "";
    });
}