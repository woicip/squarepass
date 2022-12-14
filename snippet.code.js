function snippet(){
    const [ step, setStep ] = useState(1);

    function stepHandler(){ setStep(step + 1) };
    function stepBackHandler(){ setStep(step - 1) };

    // Step 1
    const [ fullName, setFullName ] = useState('');
    const [ email, setEmail ] = useState('');

    function fullNameHandler(fullname){ setFullName(fullname) };
    function emailHandler(mail){ setEmail(mail) };

    // Step 2
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    function passwordHandler(pass){
        setPassword(pass);
    }

    const [ platformList, setPlatformList ] = useState([
        { name: "Gmail", icon: "https://i.imgur.com/azOsrzX.png", thumbnail: "https://svgshare.com/i/iTY.svg" },
        { name: "Facebook", icon: "https://i.imgur.com/17WpTSD.png", thumbnail: "https://svgshare.com/i/iUK.svg" },
        { name: "Outlook", icon: "https://i.imgur.com/8ZT7bSl.png", thumbnail: "https://svgshare.com/i/iTB.svg" },
        { name: "Discord", icon: "https://i.imgur.com/dJzsmqn.png", thumbnail: "https://svgshare.com/i/iTK.svg" },
        { name: "SoundCloud", icon: "https://i.imgur.com/1JeL1Yo.png", thumbnail: "https://svgshare.com/i/iTL.svg" },
        { name: "Spotify", icon: "https://i.imgur.com/dqRo3cJ.png", thumbnail: "https://svgshare.com/i/iUs.svg"},
        { name: "Wi-Fi", icon: "https://i.imgur.com/WVZXEXh.png", thumbnail: "https://svgshare.com/i/iUY.svg" },
        { name: "Steam", icon: "https://i.imgur.com/ksknesd.png", thumbnail: "https://svgshare.com/i/iTr.svg" },
    ]);

    // Pass Status
    const [ passwordLevel, setPasswordLevel ] = useState("None");

    function passwordLevelHandler(password){
        const strength = PasswordStrength(password);
        setPasswordLevel(strength);
    };

    // Security Question
    const [ questionList, setQuestionList ] = useState([ 
        "What is your pet's name ?", "What is your mother's name ?", 
        "What is your father's name ?", "What city do you live in ?",  
        "What is your favourite movie ?"
    ]);

    function removeOneQuestionList(questionArg){
        console.log(questionArg);
        const removedOne = questionList.filter((q) => q !== questionArg);
        setQuestionList(removedOne);
    }

    const [ questionOrder, setQuestionOrder ] = useState(1); // Question order like ... current order is 1
    const [ pickQuestion, setPickQuestion ] = useState('Select Question'); // Selected Question by User
    const [ answer, setAnswer ] = useState(''); // An answer by user

    // Question Collection
    const [ questionCollection, setQuestionCollection ] = useState([]); 

    // Dropdown Question State
    const [ dropdown, setDropdown ] = useState(false);

    // A handler for dropdown whether it show or not.
    function dropdownHandler(){ dropdown ? setDropdown(false) : setDropdown(true) };

    // Change handler for the button innerText question value
    function pickQuestionHandler(question){ setPickQuestion(question) };

    // Change handler for the input value for answer
    function answerHandler(text){ setAnswer(text) };

    // Add step by 1 for every Next button clicked
    function questionOrderHandler(){ setQuestionOrder(questionOrder + 1) };

    // Save the question & answer to question Collection everytime Next button clicked
    function saveQuestionAnswer(){
        const questionData = { question: pickQuestion, answer: answer }; console.log(questionData);
        setQuestionCollection([...questionCollection, questionData]);
        console.log(questionCollection);
    }

    // Reset the Picked Question & Answer everytime Next button Clicked
    function resetQuestionAnswer(){
        setPickQuestion('Select Question');
        setAnswer('');
    }
}