import express from 'express';
import { getFirstImage, getGallery, getGalleryById, uploadGalleryAlbum, updateGalleryAlbum, deleteGalleryAlbum } from '../controllers/galleryController.js';

const router = express.Router();

router.get("/first-img", getFirstImage);
router.get("/:id", getGalleryById);
router.get("/", getGallery);
router.post('/upload', uploadGalleryAlbum);
router.put('/update/:id', updateGalleryAlbum);
router.delete('/delete/:id', deleteGalleryAlbum);



export default router;