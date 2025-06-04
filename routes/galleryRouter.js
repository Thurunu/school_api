import express from 'express';
import { getFirstImage, getGallery, getGalleryById } from '../controllers/galleryController.js';

const router = express.Router();

router.get("/first-img", getFirstImage);
router.get("/:id", getGalleryById);
router.get("/", getGallery);

export default router;