
export const getApi = async (url, options = {}) =>{
    try {
        const response = await fetch(url,{
            headers:{
                "Content-Type":"application/json",
                ...(options.headers || {})
            },
            ...options
        })
        console.log(response);
        
        if(!response.ok){
             throw new Error(`Api error, ${response.statusText}`)
        }
        return response.json()
        
    } catch (error) {
        console.error(error,"Something went wrong")
        throw error
    }
}


export const postApi = async (url, data={},options = {}) =>{
    try {
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                ...(options.headers || {})
            },
            body:JSON.stringify(data),
            ...options
        })
        console.log(response);
        
        if(!response.ok){
             throw new Error(`Api error, ${response.statusText}`)
        }
        return response.json()
        
    } catch (error) {
        console.error(error,"Something went wrong")
        throw error
    }
}
