export const emailValidator = (emailId) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(emailId === ""){
        return "Email is required!";
    }

    if(!emailPattern.test(emailId)){
        return "Please enter a valid email address (eg: name@gmail.com)";
    }

    return "";
}