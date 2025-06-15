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

export const createNews = async (req, res) => {
    try {
        const { title, desc, img } = req.body;
        console.log(req.body);

        const latestNews = new NewsFeed({
            title,
            desc,
            img,
        });

        const newsSaved = await latestNews.save();
        res.status(201).json(newsSaved);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create news feed post.' });
    }
}

export const deleteNews = async (req, res) => {
  try {
    console.log("Deleting news item with ID:", req.params.id);
    const newsId = req.params.id;
    const deletedNews = await NewsFeed.findByIdAndDelete(newsId);

    if (!deletedNews) {
      return res.status(404).json({ error: "News item not found" });
    }

    res.status(200).json({ message: "News item deleted successfully" });
  } catch (error) {
    console.error("Error deleting news item:", error);
    res.status(500).json({ error: "Failed to delete news item" });
  }
};

export const updateNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    const { title, desc, img } = req.body;

    const updatedNews = await NewsFeed.findByIdAndUpdate(
      newsId,
      { title, desc, img },
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ error: "News item not found" });
    }

    res.status(200).json(updatedNews);
  } catch (error) {
    console.error("Error updating news item:", error);
    res.status(500).json({ error: "Failed to update news item" });
  }
};
