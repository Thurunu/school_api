import express from 'express';
import { getAllLibraries, getBooksByCategory, createNewCategory, updateLibraryBooks, updateLibraryCategory, deleteLibraryBook, deleteLibraryCategory } from '../controllers/libraryController.js';
import { searchBooks } from '../controllers/searchController.js';
const router = express.Router();

router.get("/", getAllLibraries);
router.get("/:category_id/books", getBooksByCategory);
router.post("/new-category", createNewCategory);
router.put("/:id", updateLibraryBooks);
router.get("/search/:searchTerm", searchBooks);
router.put("/update-category/:id", updateLibraryCategory);
router.delete("/delete-category/:id", deleteLibraryCategory);
router.delete("/delete-book/:id", deleteLibraryBook);

export default router;
