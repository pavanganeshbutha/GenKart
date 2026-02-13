import React, {useState} from 'react'
import {auth} from "../config/firebaseConfig.js"
import { fetchSignInMethodsForEmail, signInWithEmailAndPassword } from "firebase/auth";
import Email from "../components/Email.jsx";
import {Password} from "../components/Password.jsx";
import {Link, useNavigate} from "react-router-dom";
import Button from "../components/Button.jsx";
import {ChevronRight, LogIn} from "lucide-react";
import {emailValidator} from "../utils/emailValidator.js";


export const LoginPage = () => {
    const[email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const emailAction = (event) =>{
        setEmail(event.target.value);
    }

    const passwordAction = (event) =>{
        setPassword(event.target.value);
    }

    const submitHandler = async (event) =>{
        event.preventDefault();

        setError('');
        const emailValidation = emailValidator(email);

        if(step === 1) {

            if (error !== emailValidation) {
                setError(emailValidation);
            } else {
                try {
                    const methods = await fetchSignInMethodsForEmail(auth, email);

                    if (methods.length === 0) {
                        setError("User not found!. Please create an account");
                    } else {
                        setName(email.split("@")[0]);
                        setStep(2);
                    }

                } catch (error) {
                    setError(error);
                }
            }
        }
        else if(step === 2){
            if(password === ""){
                setError("Password is required");
            }
            else{
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                navigate("/home");
            }
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-main px-4">
            <div className="w-full max-w-md bg-card-bg rounded-3xl shadow-2xl p-8 border border-secondary/10">
                <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">Welcome {step === 1 && "to GenKart"}
                    {step === 2 && name}
                </h2>
                <form className="space-y-6" onSubmit={submitHandler}>
                    {step === 1 && <Email value={email} action={emailAction} />}
                    {step === 2 && <Password  value={password} action={passwordAction} placeholder="Password" />}
                    <span className="text-red-600">{error}</span>
                    {step === 1 && <Button buttonType="submit" buttonText="Next" buttonIcon={<ChevronRight />}/>}
                    {step === 1 && <Link to="/signup">Create Account</Link>}
                    {step === 2 && <Button buttonType="submit" buttonText="Login" buttonIcon={<LogIn/>}/>}



                </form>
            </div>
        </div>
    )
}
