import { Router } from "express";
import {PRODUCTOS_JSON} from './config.js'
import {ProductsManager} from './ProductsManager.js'

export const productsRouter =Router()

const pm= new ProductsManager(PRODUCTOS_JSON)


productsRouter.get('/',async (req, res)=>{
    const limit=parseInt(String(req.query.limit));
    try{
        const products= await pm.getAll({limit})
        res.json(products)
    }catch(error){
        res.json({
            status:'error',
            message: error.message
        })
    }

}) 

productsRouter.get('/:pid', async (req, res)=>{
    const id= req.params.pid
    try{
        const products = await pm.getById(id)
        res.json(products)
    } catch(error){
        res.json({
            status:'error',
            message: error.message
        })
    }
}) 


productsRouter.post('/',async (req,res)=>{
    const {title,description,code,price,status,stock,category,thumbnail} = req.body
    try{
        const productAgregado = await pm.addProducts({title,description,code,price,status,stock,category,thumbnail});
        res.json(productAgregado)
    } catch(error){
        res.json({
            status:'error',
            message: error.message
        })
    }  
})

productsRouter.put('/:pid',async (req,res)=>{
    
    const id= req.params.pid
    const {title,description,code,price,status,stock,category,thumbnail} = req.body
    try{
        const productActualizado = await pm.updateProducts(id,{title,description,code,price,status,stock,category,thumbnail});
        res.json(productActualizado)
    } catch(error){
        res.json({
            status:'error',
            message: error.message
        })
    }  
})

productsRouter.delete('/:pid',async (req,res)=>{
    const id= req.params.pid
    try{
        const productDelete= await pm.deleteProducts(id);
        res.json(productDelete)
    } catch(error){
        res.json({
            status:'error',
            message: error.message
        })
    }
    
})