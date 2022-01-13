const express = require('express');

const { getAllProducts ,
        createProduct ,
        getProductDetails ,
        updateProduct , 
        deleteProduct,
        createProductReview,
        getProductReviews,
        deleteReview 
      }
     = require('../controllers/productController');

const {isAuthenticatedUser , authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// to get the data ..
router.route("/products").get(getAllProducts);

// to add new product data post method...
router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

// to modify the product data put method...
router.route("/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);

// to delete the product..
router.route("/product/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);

// to get single product by id ..
router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser,createProductReview);

router.route("/reviews").get(getProductReviews);

router.route("/reviews").delete(isAuthenticatedUser ,deleteReview);

module.exports = router;