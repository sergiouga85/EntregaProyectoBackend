import fs from 'fs/promises'
import {Cart} from './Cart.js'


export class CartsManager {
    constructor(ruta) {
      this.ruta=ruta
      this.carts = [];
    }
  
    async createCart() { 
      const newCart = new Cart(this.generateId());
      this.carts.push(newCart);
      await this.saveData();
      return newCart;
    }
  
    async getCartById(cartId) {
      return this.carts.find(cart => cart.id === cartId);
    }
  
    async addProductToCart(cartId, productId) {
      const cart = await this.getCartById(cartId);
      
  
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
  
      cart.addProduct(productId);
      await this.saveData();
      return cart.products;
    }
  
    generateId() {
        return Math.random().toString(36).substring(2, 9);
      }
  
    async saveData() {
      await fs.writeFile(this.ruta, JSON.stringify(this.carts, null, 2));
    }
  
    async loadData() {
      try {
        const data = await fs.readFile(this.ruta, 'utf-8');
        this.carts = JSON.parse(data).map(cartData => {
          const cart = new Cart(cartData.id);
          cart.products = cartData.products;
          return cart;
        });
      } catch (error) {
        // El archivo no existe o hay un error al leerlo (puede ser normal al inicio)
        this.carts = [];
      }
    }
  }


        
