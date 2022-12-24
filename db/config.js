const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://admin:1234@cluster0.ayvyv9b.mongodb.net/e-commerce')
.then(()=>{
    console.log(`server connected to DataBase`);
})
.catch((err)=>console.log(`no connection to database`))