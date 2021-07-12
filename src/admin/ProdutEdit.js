import React, { PropsWithoutRef, SyntheticEvent, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import * as APIEdit from './services/editprod'

const ProductEdit = (props) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [redirect, setRedirect] = useState(false);


    const hello = async (props) => {
        const data = await APIEdit.editProdOne(data);

        setTitle(data.title);
        setBody(data.body);
    }
    useEffect( () =>{
       hello();
    },[]);

    const submit = async (e) => {
        e.preventDefault();

        const data = await fetch(`http://localhost:3000/users/${props.match.params.id}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                title,
                body
            })
        })

        setRedirect(true);
        
    }

    if(redirect){
        return(
            <Redirect to={'/home'}/>
        )
    }

    return (
        
        <form data-testid="pro-form" onSubmit={submit} className="px-4 rounded mx-auto pt-10 pb-10 shadow-md border-solid rounded-xl max-w-3xl w-full my-32 inputs space-y-6 bg-gray-200">
        <div className="flex space-x-4">
                <div className="w-1/2 flex ">
                    <label className="pr-2 pt-2 text-center">Title</label>
                    <input data-testid="pro-input" type="text" className="ml-12 border border-gray-400 px-4 py-2 rounded w-full focus:outline-none focus:border-teal-400" name="Title"
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}/>
                </div>
                </div>
                <div className="flex">
                    <label className="pr-2">Description</label>
                    <textarea data-testid="pro-textarea" className="border border-gray-400 px-4 py-2 rounded w-full focus:outline-none focus:border-teal-400" name="body"
                    defaultValue={body}
                    onChange={(e) => setBody(e.target.value)}/>
                </div>
                <button data-testid="submit" type="submit" className="shadow-md border-solid rounded-xl border-4 border-gray-200 bg-purple-500 p-2">Submit</button>
            </form>

    )
}

export default ProductEdit
