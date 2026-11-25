import axios from 'axios';
const Base_url=import.meta.env.VITE_API_UR;
const token_key="token";
export const api=axios.create({baseURL:`${Base_url}`});
export const getToken= ()=>localStorage.getItem(token_key);
export const setToken= (t:string)=>localStorage.setItem(token_key,t);
export const clearToken=()=>localStorage.removeItem(token_key);

api.interceptors.request.use((config)=>{
    const token=getToken();
    if(token){
        config.headers.Authorization=`Bearer${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res)=>res,
    (error)=>{
        const isAuhtRoute=error.config?.url?.starsWith("/auth");
        if(error.response?.status===401 && !isAuhtRoute){
            clearToken();
            window.location.href="/login";}
        return Promise.reject(error);
    }
);
export interface ApiError{code:string;message:string}

export interface Register{
    name:string;
    email:string;
    password:string;
}
export interface Page<T>{
    items:T[];
    page: number;
    size: number;
    totalItems:number;
    totalPages:number;
}
export interface Mentor{
    id:number;
    name:string;
    specialty:string;
    modality:string;
    availableSlots:number;
    description:string;
}
export interface MentorDetail{
    id:number;
    resourceId:number;
    resourceName:string;
    topic:string;
    status:number;
}
export async function register(body:{name:string; email:string; password:string}){
    await api.post("auth/register/",body);
}


export async function login(body:{email:string; password:string}){
    const {data}=await api.post<{token:string}>("auth/login/",body);
    setToken(data.token); 
}

export async function getPage(page:number,size=5){
    const {data}=await api.get<Page<Mentor>>("/mentors",{params:{page,size}})
    return data;
}

export async function getDetail(topic:string){
    const {data}=await api.get<Mentor>(`/mentors/${topic}/request`);
    return data;
}

/* export function getApiError (err:string):{status?:number; code?:string;message:string}{
    if(axios.isAxiosError(err)){
        if(!err.response){
            return {message:"No se pudo conectar con el servidor"}
        }
    }
} */