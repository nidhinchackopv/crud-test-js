import { act } from '@testing-library/react';
import React, { useEffect , useState} from 'react'
import { Link, BrowserRouter } from 'react-router-dom'
import * as APICall from './services/fetchprod'
import * as APIDelete from './services/delprod'


const Products = (props) => {

    const [products, setProducts] = useState([]);

    useEffect( () =>{
        (
            async () => {
                const data = await APICall.fetchData()

               setProducts(data);
            }
        )();
    },[]);

    const del = async (id) => {

        if(window.confirm("Are you sure you want to delete it")){

            const data = await APIDelete.delData(id)

            setProducts(products.filter((p) => p.id !== id ));
            // window.location.reload()
        }

    }
    return (

        <div className="shadow-lg bg-purple-200 pt-10 pb-20">
        <a href="/products/create" data-test-id = 'pro' className="shadow-md border-solid rounded-xl border-4 border-green-200 bg-purple-500 p-2">Add Information</a>
            <h1 className=" pt-10 align-center w-100 h-20 font-sans font-medium antialiased text-2xl">All the information</h1>
            <div className="pt-5 w-full">
                <table data-testid='table' className=" ml-2 mr-2 pt-5 w-full border-separate border border-green-800">
                <thead>
                    <tr className="">
                    <th className="">#id</th>
                    <th className="">Title</th>
                    <th className="">Body</th>
                    </tr>
                </thead>
                <tbody data-testid="tbody">
                    
                    {
                       products.map((p) => {
                            return (
                                <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.title}</td>
                                <td>{p.body}</td>
                                <td>
                                    <div className='mb-5'>
                                        <a href={`/products/${p.id}/edit`} data-testid="edit"
                                        className="shadow-md border-solid rounded-xl m-3 border-4 border-gray-200 bg-purple-500 p-2">Edit</a>
                                    </div>
                                </td>
                                <td>
                                    <div className='mb-5'>
                                        <a key= "delete" href="#" data-testid = "delete" className="shadow-md border-solid rounded-xl border-4 border-gray-200 bg-purple-500 p-2"
                                        onClick={() => del(p.id)} >Delete</a>
                                    </div>
                                </td>
                                </tr>
                                
                            )
                       })
                    }
                    
                </tbody>
                </table>
            </div>
            </div>
    )
}

export default Products
