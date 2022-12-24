import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { ToastContainer,  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddProduct = () => {
    const [name, setName]=useState('')
    const [price, setPrice]=useState('')
    const [category, setCategory]=useState('')
    const [company, setCompany]=useState('')
    const [error, setError]=useState(false);

    const navigate=useNavigate();

    const addproduct =async(e)=>{
        
       
        e.preventDefault();
        console.log(!name)
        if(!name || !price || !category || !company)
        {   
            toast.warn("Please fill All Details",{position: "top-center",
            autoClose: 700,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",})
            setError(true)
             return false;
        }
        console.log(name,price, category, company)

        const userId=JSON.parse(localStorage.getItem('user'))._id;
        console.log(userId._id)

        let result= await fetch(`/add-product`,{
        method:'post',    
        body:JSON.stringify({name,price, category, company,userId}),
        headers:{
            'Content-type':'application/json',
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }

        })
        result= await result.json();
        

            
            navigate('/')
           
        

    }

  return (
    <div className='absolute left-1/3 top-[100px]  rounded-md shadow-2xl  h-[525px] w-[450px] px-10'>
    <form className=' grid grid-cols-1 py-10 gap-4 justify-center'>

        <h1 className='text-2xl'>Add Product</h1>

        <input className='border-2 rounded-2xl px-5 py-1' onChange={(e)=>setName(e.target.value)} 
        value={name} type='text' placeholder='Name'></input>
        {error && !name && <span className='flex justify-start top-0 text-red-500'>Enter valid Name</span>}

        <input className='border-2 rounded-2xl px-5 py-1' onChange={(e)=>setPrice(e.target.value)} 
        value={price} type='text' placeholder='Price'></input>
        {error && !price && <span className='flex justify-start top-0 text-red-500'>Enter valid Price</span>}

        <input className='border-2 rounded-2xl px-5 py-1' onChange={(e)=>setCategory(e.target.value)} 
        value={category} type='text' placeholder='Category'></input>
        {error && !category && <span className='flex justify-start text-red-500'>Enter valid category</span>}

        <input className='border-2 rounded-2xl px-5 py-1 ' onChange={(e)=>setCompany(e.target.value)} 
        value={company} type='text' placeholder='Company'></input>
        {error && !company && <span className='flex justify-start top-0 text-red-500'>Enter valid company</span>}

        <button onClick={addproduct}  className='bg-red-500 border rounded-2xl py-2 w-[100px] h-12 text-white hover:hover:scale-110 duration-200 '>Submit</button>
        
        </form>
        <ToastContainer />
    </div>
  )
}

export default AddProduct
