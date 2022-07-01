
export const getApiTask = async () => {
    try{
    const resp = await fetch('https://assets.breatheco.de/apis/fake/todos/user/tomeumayol', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        const data= await resp.json();
       
        return(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
} catch(err){
    console.error(err);
}


}

export const putApiTask = async (tasks) => {
			try{
    const resp = await fetch('https://assets.breatheco.de/apis/fake/todos/user/tomeumayol', {
        method: "PUT",
        body: JSON.stringify(tasks),
        headers: {
            "Content-Type": "application/json"
        }
    })
  
}catch(err){
    console.error(err);
}

};









