import type {ReactNode} from "react";
import {error as errorcls} from "../styles";
interface Props{
    label:string;
    htmlFor:string;
    error?:string;
    children:ReactNode;
}
export default function Field({label,htmlFor,error,children}:Props){
    return(
        <div>
            <label htmlFor={htmlFor} className="block font-medium">
                {label}
            </label>
            {children}
            {error&& <p className={errorcls}>{error}</p>}
        </div>
    );
}