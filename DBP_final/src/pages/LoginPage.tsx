import {useState , type FormEvent} from 'react';
import {Link,useNavigate} from "react-router-dom";
import {setApi,login} from "../api";
import Field from "../components/Field";
import {btn,error,input} from  "../styles";
type Errors={email?:string; password?:string};
export default function LoginPage(){
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [errors,setErrors]=useState<Errors>({});
    const [formError, setFormError]=useState("");
    const [loading,setLoading]=useState(false);
    async function handleSubmit(ev:FormEvent){
        ev.preventDefault();
        setFormError("");
        const e:Errors={};
        if(!email.trim) e.email="Ingresar Correo";
        if(!password) e.password="Ingresar contraseña";
        setErrors(e);
        if(Object.keys(e).length>0) return;
        setLoading(true);
        try{
            await login({email:email.trim(),password});
            navigate("/dashboard");
        }catch(err){
            const {status,message}=getApiError(err);
            setFormError(status===401?"Correo o contraseña incorrectos")
        }finally{
            setLoading(false);
        }
    }
    return(
        <form onSubmit={handleSubmit} noValidate className='mx-auto max-w-sm space-y-y p-6'>
            <h1 className='text-x font-bold'> 
                Iniciar Sesion
            </h1>
            <Field label="Correo" htmlFor="email" error={errors.email}>
                <input id="email" type="email" className={input} value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </Field>
            
            <Field label="Contraseña" htmlFor="contraseña" error={errors.email}>
                <input id="contraseña" type="constraseña" className={input} value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </Field>
            {formError && <p className={error}>{formError}</p>}
            <button className={btn} disabled={loading}>{loading?"Ingresando..":"Ingresar"}</button>
        </form>
    );
}