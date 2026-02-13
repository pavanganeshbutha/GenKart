import {useState} from 'react'
import Email from "../components/Email.jsx";
import {Password} from "../components/Password.jsx";
import Button from "../components/Button.jsx";
import {ChevronRight, Milestone} from "lucide-react";
import {emailValidator} from "../utils/emailValidator.js";
import {fetchSignInMethodsForEmail, createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../config/firebaseConfig.js";
import {useNavigate} from "react-router-dom";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const[error, setError] = useState("");
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const emailHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const confirmPasswordHandler = (event) => {
        setConfirmPassword(event.target.value);
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        setError("");

        if(step === 1){
            const emailValidation = emailValidator(email);

            if(emailValidation !== error){
                setError(emailValidation);
            } else{
                try {
                    const methods = await fetchSignInMethodsForEmail(auth, email)
                    if (methods.length > 0){
                        setError("User already exists. Please try with some other email.");
                    }
                    else {
                        setName(email.split("@")[0]);
                        setStep(2);
                    }
                } catch (error){
                    setError(error);
                    console.log(error);

                }
            }
        }

        if(step === 2){
            if(password.length < 8){
                setError("Password must be at least 8 characters.");
            }

            else if(password !== confirmPassword){
                setError("Password did not match.");
            }

            else{
                try {
                    const response = await createUserWithEmailAndPassword(auth, email, password);
                    console.log(response);
                    navigate("/");
                } catch(error){
                    setError(error);
                }
            }
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-main px-4">
            <div className="w-full max-w-md bg-card-bg rounded-3xl shadow-2xl p-8 border border-secondary/10">
                <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
                    {step === 1 && <h2>Sign Up</h2>}
                    {step === 2 && <h2>Hi {name}</h2>}</h2>

                <form className="space-y-6" onSubmit={submitHandler}>
                    {step === 1 && <Email value={email} action={emailHandler} />}
                    {step === 2 && <Password value={password} placeholder="Password" action={passwordHandler}/>}
                    {step === 2 && <Password value={confirmPassword} placeholder="confirmPassword" action={confirmPasswordHandler} />}
                    <span className="text-s text-red-600">{error}</span>
                    {step === 1 && <Button buttonType="submit" buttonText="Next" buttonIcon={<ChevronRight />} />}
                    {step === 2 && <Button buttonType="submit" buttonText="Sign Up" buttonIcon={<Milestone/>} />}
                </form>
            </div>
        </div>
    )
}
export default SignupPage
