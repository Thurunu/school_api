import NewsFeed from "../models/NewsFeedModel.js";



// GET all news
export const getNews = async (req, res) => {
  try {
    const newsData = await NewsFeed.find().sort({ date: -1 }); // Sort by date, newest first
    res.status(200).json(newsData);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news items" });
  }
};

// GET single news by ID
export const getNewsById = async (req, res) => {
  // console.log("Fetching news item with ID:", req.params.id);
  try {
    const newsId = req.params.id;
    const newsItem = await NewsFeed.findById(newsId);
    
    if (!newsItem) {
      return res.status(404).json({ error: "News item not found" });
    }
    
    res.status(200).json(newsItem);
  } catch (error) {
    console.error("Error fetching news item:", error);
    
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({ error: "Invalid news ID format" });
    }
    
    res.status(500).json({ error: "Failed to fetch news item" });
  }
};
