
export const isNameValid = (name) => {

    const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;

    if(!regName.test(name)){
        return false;
    }
    return true;
}

export const  isEmailValid = (email) => {

    const atposition=email.indexOf("@");  
    const dotposition=email.lastIndexOf(".");  

    if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email.length){ 
        return false;  
    } 
    return true;
}

export const isMatch = (a,b) => { 
    return a === b; 
}
