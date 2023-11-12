import {commonAPI} from './commonAPI'
import { serverURL } from './serverUrl'

export const uploadNote=async(body)=>{
    return await commonAPI("POST",`${serverURL}/notes`,body)
}
export const getAllNotes=async()=>{
    return await commonAPI("GET",`${serverURL}/notes`,"")
}
export const deleteANote=async(id)=>{
    return await commonAPI("DELETE",`${serverURL}/notes/${id}`)}

export const getANotes=async(id)=>{
    return await commonAPI("GET",`${serverURL}/notes/${id}`,"")}

 export const addCategory=async(body)=>{
   return await commonAPI("POST",`${serverURL}/categories`,body)}

 export const getAllCategories=async()=>{
    return await commonAPI("GET",`${serverURL}/categories`,"")
}

export const getACategories=async(id)=>{
    return await commonAPI("GET",`${serverURL}/categories/${id}`)
}
export const deleteCategory=async(id)=>{
    return await commonAPI("DELETE",`${serverURL}/categories/${id}`)}

export const updateCategory=async(id,body)=>{
     return await commonAPI("PUT",`${serverURL}/categories/${id}`,body)
    }