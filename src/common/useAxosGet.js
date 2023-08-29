import axios from "axios"
import { useState } from "react"

const useAxiosGet = ()=>{
    const [res,setRes] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    const getData = (url)=>{
        setLoading(true)
        axios.get(url)
        .then((res)=>{
            setRes(res?.data)
            setLoading(false)
        })
        .catch((err)=>{
            setRes([])
            setError(err)
            setLoading(false)
        })
    }

    return [res,getData,loading,error]
}

export default useAxiosGet ;