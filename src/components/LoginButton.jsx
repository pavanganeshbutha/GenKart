import {LogIn} from "lucide-react";

const LoginButton = () => {
    return <button type="submit" className="w-full flex justify-center border py-1 rounded-xl bg-blue-600 text-white font-semibold">
        <span>Login</span>
        <LogIn/>
    </button>
}
export default LoginButton
