import express from 'express'
import { getProductById,getAllProducts, createProduct ,updateProduct,deleteProduct,createProductReview} from '../controller/productController.js'
import { admin, protect } from '../midd/authMiddleware.js'

const router = express.Router()

// @desc    Fetch all products
// @route   GET /api/products
// router.route('/').get(getAllProducts)

// @desc    Fetch single product
router.route('/')
  .get(getAllProducts)
  .post(protect, admin, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

  router.route('/:id/reviews').post(protect, createProductReview);

export default router
