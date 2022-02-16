const express=require ('express');
const router=require ('./router');
const app= express();
app.use(router);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.listen(4000,()=>{
    console.log('Running on http://localhost:4000');
});