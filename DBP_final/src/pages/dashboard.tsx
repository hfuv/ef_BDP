import { useEffect,useState } from "react";
import {Link} from "react-router-dom";
import {getApiError,getList,type Page, type Mentor} from "../api";
import Pagination from "../components/Pagination";
import ErrorMessage from "../components/ErrorMessage.tsx"