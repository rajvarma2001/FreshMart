import axios from "axios";

// get all products

export const fetchProducts = async () => {
    try {
        const  response = await fetch(BASE_URL);

        if(!response.ok){
            throw new Error("Failed to fetch products");
        }
        return await response.json();
    }catch (error){
        console.error("Error fetching products:",error);
        throw error;
    }  
};


// get product by id


export const fetchProductById = async (id) => {
    try {
        const  response = await fetch(`${BASE_URL}/${id}`);

        if(!response.ok){
            throw new Error("Failed to fetch products");
        }
        return await response.json();
    }catch (error){
        console.error("Error fetching products:",error);
        throw error;
    }  
};

// create product
export const createProduct = async (productData) => {
    try {
        const  response = await fetch(BASE_URL,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        });

        if(!response.ok){
            throw new Error("Failed to create products");
        }
        return await response.json();
    }catch (error){
        console.error("Error createing products:",error);
        throw error;
    }  
};


// update product
export const updateProduct = async (id, updatedData) => {
    try {
        const  response = await fetch(`${BASE_URL}/${id}`,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        });

        if(!response.ok){
            throw new Error("Failed to update products");
        }
        return await response.json();
    }catch (error){
        console.error("Error updating products:",error);
        throw error;
    }  
};



// delete product
export const deleteProduct = async (id) => {
    try {
        const  response = await fetch(`${BASE_URL}/${id}`,{
            method: "DELETE"
        });

        if(!response.ok){
            throw new Error("Failed to delete products");
        }
        return await response.json();
    }catch (error){
        console.error("Error deleting products:",error);
        throw error;
    }  
};

