import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const [name, setName]=useState('')
    const [price, setPrice]=useState('')
    const [category, setCategory]=useState('')
    const [company, setCompany]=useState('')
    const params= useParams();
    const navigate=useNavigate();

    useEffect(() => {
        getproductDetails();
    }, [])

    const getproductDetails =async()=>{
    const result=await fetch(`/product/${params.id}`,{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
    })
    let final= await result.json();
    setName(final.name)
    setPrice(final.price)
    setCategory(final.category)
    setCompany(final.company)

    // console.log(final);
    }
    const updateproduct = async(e)=>{
        e.preventDefault();
        
       // console.log(name,price, category, company)
       const result=await fetch(`/product/${params.id}`,{
            method:'put',
            body:JSON.stringify({name,price, category, company}),
            headers:{
                'Content-type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
       })
       let final=await result.json();
       console.log(final);
       navigate('/')
    }
        

  return (
    <div className='absolute left-1/3 top-[100px]  rounded-md shadow-2xl  h-[525px] w-[450px] px-10'>
    <form className=' grid grid-cols-1 py-10 gap-4 justify-center'>

        <h1 className='text-2xl'>Update Product</h1>

        <input className='border-2 rounded-2xl px-5 py-1' onChange={(e)=>setName(e.target.value)} 
        value={name} type='text' placeholder='Name'></input>
      

        <input className='border-2 rounded-2xl px-5 py-1' onChange={(e)=>setPrice(e.target.value)} 
        value={price} type='text' placeholder='Price'></input>
      

        <input className='border-2 rounded-2xl px-5 py-1' onChange={(e)=>setCategory(e.target.value)} 
        value={category} type='text' placeholder='Category'></input>
       

        <input className='border-2 rounded-2xl px-5 py-1' onChange={(e)=>setCompany(e.target.value)} 
        value={company} type='text' placeholder='Company'></input>
       

        <button onClick={updateproduct} className='bg-red-500 border rounded-2xl py-2 w-[100px] h-12 text-white '>Submit</button>
    </form>
    </div>
  )
}

export default UpdateProduct

