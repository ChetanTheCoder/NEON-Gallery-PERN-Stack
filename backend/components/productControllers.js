import { sql } from "../config/db.js";
//CRUD operations are controller here


export const getProducts = async (req, res) => {
  try {
    const products = await sql`
    SELECT * FROM products
    ORDER BY created_at DESC
  `;
    console.log("fetched products : ", products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(
      "internal error fetching products in getproducts in productsController.js : ",
      error
    );
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req, res) => {
  //In server.js file if deletel the app.use(express.json()) then we need to parse the body means it will undefined
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the required fields",
    });
  }

  try {
    const newProduct = await sql`
    INSERT INTO products (name, price, image)
    VALUES (${name}, ${price}, ${image})
    RETURNING * 
    `; // RETUNRING * this will return the newly created product

    console.log("New created product : ", newProduct);
    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.log(
      "error creating product getproducts in productsController.js : ",
      error
    );
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sql`
    SELECT * FROM products
    WHERE id = ${id}
  `;

    console.log("fetched product : ", product);

    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.log(
      "internal error fetching product in getproduct in productsController.js : ",
      error
    );

    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the required fields",
    });
  }

  try {
    const updateProduct = await sql`
    UPDATE products 
    SET name = ${name}, price = ${price}, image = ${image}
    WHERE id = ${id}
    RETURNING *
    `;

    if (updateProduct.count === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: updateProduct[0] });
  } catch (error) {
    console.log(
      "internal error updating product in updateproduct in productsController.js : ",
      error
    );

    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteProduct = await sql`
    DELETE FROM products
    WHERE id = ${id}
    RETURNING *
    `;

    if (deleteProduct.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: deleteProduct[0] });
  } catch (error) {
    console.log(
      "internal error deleting product in deleteproduct in productsController.js : ",
      error
    );

    res.status(500).json({ success: false, message: error.message });
  }
};
