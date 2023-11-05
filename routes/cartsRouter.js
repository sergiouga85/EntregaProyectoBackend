import { Router } from "express";
import {CARRITO_JSON} from './config.js'
import {CartsManager} from './CartsManager.js'

export const cartsRouter =Router()

const cm= new CartsManager(CARRITO_JSON)


cartsRouter.post('/api/carts', async (req, res) => {
    
    try {
      const newCart = await cm.createCart();
      res.json(newCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


cartsRouter.get('/api/carts/:cid', async (req, res) => {
    try {
      const cartId = req.params.cid;
      const cart = await cm.getCartById(cartId);
  
      if (cart) {
        res.json(cart.products);
      } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


cartsRouter.post('/api/carts/:cid/product/:pid', async (req, res) => {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const products = await cm.addProductToCart(cartId, productId);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });