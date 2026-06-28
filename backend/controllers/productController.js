import Product from "../model/Product.js";
import Category from "../model/Category.js";

//get all product
//Get/api/products
export const getProducts  = async (req , res) => {
    try{
        const products = await Product.find();

        res.status(200).json({ products });
    } catch(error){
        res.status(500).json({
            message:"Failed to fetch product",
            error: error.message,
        });
    }
};

//get product by id
//get/api/products/:id

export const getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        
        if(!product){
            return res.status(404).json({ message: "Product Not Found" });
        }

        res.status(200).json(product);
    }catch(error){
        res.status(500).json({
            message:"Failed to fetch product",
            error: error.message,
        });
    }
};

//create new product
// post/api/products

// export const createProduct = async (req, res) => {
//     try{
//         const { name, image, price, rating, description, category, stock} = req.body; 

//         const product = new Product({
//             name,
//             image,
//             price, 
//             rating, 
//             description, 
//             category,
//             stock,
//         });
        
//         const saveProduct = await product.save();

//         res.status(201).json(saveProduct);
//     }catch(error){
//         res.status(501).json({
//             message:"Failed to save product",
//             error:error.message,
//         })
//     }
// }
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      price,
      rating,
      description,
      category,
      stock,
    } = req.body;

    // Auto-create category if it doesn't exist
    let existingCategory = await Category.findOne({
      name: category,
    });

    if (!existingCategory) {
      existingCategory = await Category.create({
        name: category,
        image: "",
        description: `${category} category`,
      });
    }

    const product = new Product({
      name,
      image,
      price,
      rating,
      description,
      category,
      stock,
    });

    const saveProduct = await product.save();

    res.status(201).json(saveProduct);
  } catch (error) {
    res.status(500).json({
      message: "Failed to save product",
      error: error.message,
    });
  }
};
//Update product
// put/api/products/:id

export const updateProduct = async (req,res) => {
    try{
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true , runValidators:true}
        );

        if(!updateProduct) {
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json(updateProduct);
    }catch(error){
        res.status(400).json({
            message:"Failed to update product",
            error:error.message,
        });
    }
};

// delete product
// delete /api/ product/:id

export const deleteProduct = async (req,res) =>{
    try{
        const deleteProduct = await Product.findByIdAndDelete(req.params.id,);
        if(!deleteProduct) {
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json({message:"Product deleted successfully"});
    }catch(error){
        res.status(400).json({
            message:"failed to delete product",
            error:error.message,
        });
    }
};