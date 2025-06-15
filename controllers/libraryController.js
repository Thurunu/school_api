import Library from "../models/libraryModel.js";

export const getAllLibraries = async (req, res) => {
  try {
    const categories = await Library.find();
    const result = categories.map((category) => ({
      _id: category._id,
      category_id: category.category_id,
      category: category.category,
      book_count: category.books.length,
    }));
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getBooksByCategory = async (req, res) => {
  const categoryId = req.params.category_id;
  try {
    const library = await Library.findOne({ category_id: categoryId }).select("books");
    if (!library) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(library.books);
  } catch (error) {
    console.error("Error fetching books by category:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createNewCategory = async (req, res) => {
  const id = req.params.id;
  const { category_id, category } = req.body;
  try {
    const existingCategory = await Library.findOne({ category_id });
    if (existingCategory) {
      return res.status(400).json({ message: "Category with this ID already exists" });
    }
    const newLibrary = new Library({ category_id, category });
    const createdLibrary = await newLibrary.save();
    res.status(201).json(createdLibrary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLibraryBooks = async (req, res) => {
  const { action, book } = req.body;
  try {
    const library = await Library.findOne({ category_id: req.params.category_id });
    if (!library) return res.status(404).json({ message: "Library not found" });

    if (action === "add") {
      library.books.push(book);
    } else if (action === "remove") {
      library.books = library.books.filter((b) => b.book_id !== book.book_id);
    } else {
      return res.status(400).json({ message: "Invalid action type" });
    }

    const updatedLibrary = await library.save();
    res.json(updatedLibrary);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error updating library books:", error);
  }
};

export const updateLibraryCategory = async (req, res) => {
  const { category } = req.body;
  console.log(req.body.id);
  try {
    const updated = await Library.findByIdAndUpdate(
      req.params.id,  // use internal Mongo _id
      { category },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Library not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteLibraryCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedLibrary = await Library.findOneAndDelete(id);
    if (!deletedLibrary) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error deleting category:", error);
  }
};

export const deleteLibraryBook = async (req, res) => {
  try {
    const { book_id } = req.params;
    const updatedLibrary = await Library.findOneAndUpdate(
      { "books.book_id": book_id },
      { $pull: { books: { book_id: book_id } } },
      { new: true }
    );
    if (!updatedLibrary) return res.status(404).json({ message: "Book not found in any category" });
    res.json({ message: "Book deleted successfully", updatedLibrary });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error deleting book:", error);
  }
};
