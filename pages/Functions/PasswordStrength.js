function passwordStrength(password){
    const capitalChar = [];
    const numbers = [];
    const symbols = [];

    // Capital Char Checking
    const getCharacters = password.match(/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g);
    getCharacters !== null ? getCharacters.forEach((char) => capitalChar.push(char)) : "";

    // Number Checking
    const getNumbers = password.match(/[0-9]/g);
    getNumbers !== null ? getNumbers.forEach((number) => numbers.push(number)) : "";

    // Symbols Checking
    const getSymbols = password.match(/[~!@#$%^&/*()|\-+?,;:'"{}<>]/g);
    getSymbols !== null ? getSymbols.forEach((symbol) => symbols.push(symbol)) : "";

    // console.log(capitalChar);
    // console.log(numbers);
    // console.log(symbols);

    // console.log(password.length);

    // Weak Level
    if(password.length >= 8){
        // console.log('masuk sini');
        if(!capitalChar.length && !numbers.length && !symbols.length){ // jika tidak ada kapital, angka, simbol (30)
            return 'Weak';
        } else if(!capitalChar.length && numbers.length && !symbols.length){ // jika tidak ada kapital, ada angka, tidak ada simbol (31)
            return 'Weak';
        } else if(capitalChar.length && !numbers.length && !symbols.length){ // jika ada kapital, tidak ada angka, tidak ada simbol (32)
            return 'Weak';
        } else if(!capitalChar.length && !numbers.length && symbols.length){ // jika tidak ada kapital, tidak ada angka, tapi ada simbol (33)
            return 'Good';
        } else if(capitalChar.length && !numbers.length && symbols.length){ // jika ada kapital, tidak ada angka, tapi ada simbol (36)
            return 'Good';
        } else if(!capitalChar.length && numbers.length && symbols.length){ // jika tidak ada kapital, ada angka, ada simbol (34)
            return 'Good';
        } else if(capitalChar.length && numbers.length && !symbols.length){ // jika ada kapital, ada angka, tidak ada simbol (35)
            return 'Good';
        } else if(capitalChar.length && numbers.length && symbols.length){ // jika ada kapital, angka, simbol (99)
            return 'Strong';
        }

    } else if(!password.length){
        return "None";

    } else {
        return "Weak"
    }
    
}

export default passwordStrength;