//const { createContext } = require("react")

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import  { createContext } from "react"

const Context = createContext();

const ContextProvider = ({children})=>{
    const APIUrl=`http://localhost:9000`;
    const [ProductsData, setProductsData]=useState([]);
    const [PostsData, setPostsData] = useState([]);

    const RequestData=async (path=" ")=>{
        await axios.get(`${APIUrl}/products`).then(response=>{
            const data = response.data
            setProductsData(()=>{
                return data && data?.length? data:[]
            })
        });

        await axios.get(`${APIUrl}/blogs`).then(response=>{
            const data = response.data
            setProductsData(()=>{
                return data && data?.length? data:[]
            })
        });
    }

    useEffect (()=>{
        try{
            RequestData();
        }catch(error){
            console.log(error);
        }
    }, []);

    const contextValues = {
        APIUrl, PostsData, setPostsData, setProductsData, ProductsData
    }

    return(
        <Context.Provider>
            {children}
        </Context.Provider>
    )
}

export {Context, ContextProvider}