export class Product{
 
    constructor({id,title,description,code,price,status,stock,category,thumbnail}){
        this.id = id
        this.title= title
        this.description=description
        this.code=code
        this.price=price
        this.status=status
        this.category=category
        this.thumbnail=thumbnail
        
        this.setStock(stock)
    }

    setStock(nuevoStock){
        if(nuevoStock < 0){
            throw new Error ('El stock no puede ser menor a cero')
        }
        this.stock= nuevoStock
    }

    getStock(){
        return this.stock
    } 
    
}