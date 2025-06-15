import mongoose from "mongoose";

export const searchBooks = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;

    // Validate search term
    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(400).json({ error: "Search term is required" });
    }

    const agg = [
      {
        $search: {
          text: {
            query: searchTerm,
            path: ["category", "books.book_name"],
          },
        },
      },
      {
        $sort: {
          field1: 1,
        },
      },
    ];
    const database = mongoose.connection.db;
    const collection = database.collection("libraries");
    const result = await collection.aggregate(agg).toArray();

    res.json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      error: "Failed to search books",
      message: error.message,
    });
  }
};
