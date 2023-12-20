const Catalog = require('../models/catalogs')
const Product = require('../models/product')
const Order = require('../models/order')

const User = require('../models/user')
const Roles = require('../models/roles')




const createCatalog = async(req, res) =>{

    if(!req.type || req.type != Roles.seller) return res.status(400).json({error : "permissions restricted"})

    const {sellerId, items} = req.body

    try{
        //console.log(items, sellerId)


        if (!sellerId || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Invalid or empty items provided' });
          }
      
      
          const seller = await User.findById(sellerId);
          if (!seller) return res.status(404).json({ error: 'Seller not found' });
      

        //   let createdProducts = []
        //   items.forEach(async (item)=>{
        //     await Product.create({
        //         'name' : item.name, 'price' : item.price
        //     })
        //   })

          const createdProducts = await Promise.all(
            items.map(async (item) => {
              return await Product.create({
                'name': item.name,
                'price': item.price,
              });
            })
          )

          
          
          const createdProductsId = createdProducts.map(product => product._id)
          let catalog = await Catalog.findOne({ seller: sellerId })

          if(catalog)
          {
           // const uniqueProductIds = new Set([...catalog.products, ...createdProductsId])
            catalog.products = createdProductsId
            await catalog.save()

            return res.status(201).json({ catalog})
          }
          else{

              const catalognew = await Catalog.create({
                seller: sellerId,
                products: createdProductsId,
    
              });

              return res.status(201).json({ catalognew })

          }

         // console.log(createdProductsId)
          

          //console.log(catalognew)
          
    }
    catch(error){
       // console.log(error)
        return res.status(404).json(error)
    }

}


const getOrders = async(req, res) => {

    if(!req.type || req.type != Roles.seller) return res.status(400).json({error : "permissions restricted"})

    try{
        const sellerId = req.id;
        if(!sellerId) return res.status(400).json({error : 'seller not found'})

        const orders = await Order.find({seller : sellerId})

        return res.status(200).json(orders)
    }
    catch(error){
        return res.status(404).json(error)
    }

}

module.exports = {createCatalog, getOrders}