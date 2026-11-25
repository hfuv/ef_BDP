import {btn,error} from "../styles";
interface Props{
    message: string;
    onRetry?:() => void;
}
export default function ErrorMessage({message,onRetry}:Props)
{
    return(
        <div className="flex items-center gap-2">
            <p className={error}>{message}</p>
            {onRetry && <button className={btn} onClick={onRetry}> Reintentar </button>}
        </div>
    );
}