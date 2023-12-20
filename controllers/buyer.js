const User = require('../models/user')
const Catalog = require('../models/catalogs')
const Order = require('../models/order')
const roles = require('../models/roles')

const listOfSellers = async(req, res)=>{

    
    if(!req.type || req.type != roles.buyer) return res.status(400).json({error : "permissions restricted"})
    
    try{
        
        const sellers = await User.find({role : 'seller'})
        const sellersList = sellers.map(seller => ({
            id: seller._id,
            username: seller.name, 
            email: seller.email }));

        return res.status(200).json(sellersList)

    }
    catch(error)
    {
        return res.status(400).json(error)   
    }

}




const sellerCatalog =  async (req, res) => {

    if(!req.type || req.type != roles.buyer) return res.status(400).json({error : "permissions restricted"})

    const { seller_id } = req.params;
    if(!seller_id) return res.status(400).json({error : 'seller id is needed'})
    console.log(seller_id)

    try {
        const catalog = await Catalog.findOne({ seller: seller_id }).populate('products');
        console.log(catalog)
        if (!catalog) {
            return res.status(400).json({ error: 'Catalog not found for the specified seller_id' });
        }
        res.status(200).json({ catalog });
    } catch (error) {
        return res.status(400).json(error);
    }
}



const createOrder =  async (req, res) => {
    const { seller_id } = req.params;
    const { items } = req.body;

    if(!req.type || req.type != roles.buyer) return res.status(400).json({error : "permissions restricted"})

    try {
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Invalid or empty items provided' });
        }
        const itemsList = items.map(item => item._id)
        const order = await Order.create({
            buyer: req.id, 
            seller: seller_id,
            products: itemsList,
            
        });

        res.status(201).json({ order });
    } catch (error) {
        console.log(error)
        return res.status(400).json(error);
    }
}



module.exports = {listOfSellers, sellerCatalog, createOrder}