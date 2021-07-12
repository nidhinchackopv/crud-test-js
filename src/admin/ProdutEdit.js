import React, { PropsWithoutRef, SyntheticEvent, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import * as APIEdit from './services/editprod'

const ProductEdit = (props) => {
    const [state, setState] = useState([{title:"",body:""}]);
    const [redirect, setRedirect] = useState(false);

console.log(props)
    const hello = async (props) => {
        console.log(props)
        const data = await APIEdit.editProdOne(props);

        setState({title:data.title,body:data.body});
    }
    useEffect( () =>{
       hello(props);
    },[]);

    const submit = async (e) => {
        console.log(e)
        console.log(props)
        e.preventDefault();

       await APIEdit.editProd(props,state)

        setRedirect(true);
        
    }

    if(redirect){
        return(
            <Redirect to={'/home'}/>
        )
    }
console.log(state)
    return (
        
        <form data-testid="pro-form" onSubmit={(e)=>submit(e)} className="px-4 rounded mx-auto pt-10 pb-10 shadow-md border-solid rounded-xl max-w-3xl w-full my-32 inputs space-y-6 bg-gray-200">
        <div className="flex space-x-4">
                <div className="w-1/2 flex ">
                    <label className="pr-2 pt-2 text-center">Title</label>
                    <input data-testid="pro-input" type="text" className="ml-12 border border-gray-400 px-4 py-2 rounded w-full focus:outline-none focus:border-teal-400" name="Title"
                    defaultValue={state.title}
                    onChange={(e) => setState({...state,title:e.target.value})}/>
                </div>
                </div>
                <div className="flex">
                    <label className="pr-2">Description</label>
                    <textarea data-testid="pro-textarea" className="border border-gray-400 px-4 py-2 rounded w-full focus:outline-none focus:border-teal-400" name="body"
                    defaultValue={state.body}
                    onChange={(e) =>  setState({...state,body:e.target.value})}/>
                </div>
                <button data-testid="submit" type="submit" className="shadow-md border-solid rounded-xl border-4 border-gray-200 bg-purple-500 p-2">Submit</button>
            </form>

    )
}

export default ProductEdit
