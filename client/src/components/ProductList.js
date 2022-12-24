import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import { ToastContainer,  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        getproducts(); 

    }, [])

    const handlesearch = async(e)=>{
            let key=e.target.value;
           if(key)
           {
            const result = await fetch(`/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            let final= await result.json();
            console.log(final)
            if(final)
            {
                setProducts(final);
            }
           }
           else{
            getproducts();
           }
            
    }

    const getproducts = async () => {
        let result = await fetch(`/products`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        let final = await result.json();
        setProducts(final); 
    }
    const handledelete=async(id)=>{
        let result= await fetch(`/product/${id}`,{ 
            method:'delete',
            headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            
        });
        let final=await result.json();
        console.log(final);
        if(final)
        {
            getproducts(); 
            
            toast.success("Record is deleted." ,{position: "top-center",
            autoClose: 800,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",})
        }
    }


    return (
        <div>
            <h1 className='text-3xl'>Product List</h1>
            <input onChange={handlesearch} className='border-2 rounded-2xl px-5 py-1 w-[400px] m-4' type='text' placeholder='Search products'></input>
            <div className='relative shadow-xl top-5 rounded-2xl h-[auto] w-[900px] left-[20%]
            place-items-center bg-red-100'>
                <ul className='text-bold text-3xl gap-5 justify-items-center rounded-lg py-2 text-white bg-red-300 grid grid-flow-col '>
                    <li>S.no</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>Category</li>
                    <li>Company</li>
                    <li>Update</li>
                    <li>Delete</li>
                </ul>
              {
               products.length> 0 ?
               products.map((item,index)=>
                <ul key={index} className='text-bold text-1xl gap-5 rounded-lg py-2 px-3 text-red-900 bg-red-1 grid grid-flow-col '>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li>{item.company}</li>
                <li className='hover:hover:scale-110 duration-200 '><Link to={`/update/${item._id}`} className='bg-red-500 py-1 px-2 text-white '>Update</Link></li>
                 <li className='hover:hover:scale-110 duration-200 '><button onClick={()=>handledelete(item._id)}
                 className='bg-red-500 py-1 px-2 text-white'>Delete</button></li>
            </ul>
                )
                :  <h1 className=' text-red-500 text-5xl py-5 '>No Result Found..</h1>
              }


            </div>
            <ToastContainer />
        </div>
    )
}

export default ProductList
