import GalleryAlbum from '../models/galleryModel.js';



// GET all gallery items
export const getGallery = async (req, res) => {
  try {
    const galleries = await GalleryAlbum.find();
    res.status(200).json(galleries);
  } catch (error) {
    console.error("Error fetching galleries:", error);
    res.status(500).json({ error: "Failed to fetch gallery items" });
  }
};

// GET single gallery item by MongoDB ID
export const getGalleryById = async (req, res) => {
  try {
    const galleryItem = await GalleryAlbum.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ error: "Gallery item not found" });
    }
    res.status(200).json(galleryItem);
  } catch (error) {
    console.error("Error fetching gallery by ID:", error);
    res.status(500).json({ error: "Failed to fetch gallery item" });
  }
};

// GET first image from each gallery album
export const getFirstImage = async (req, res) => {
  try {
    const albums = await GalleryAlbum.find();
    const firstImages = albums.map((item) => ({
      id: item._id,
      title: item.title,
      desc: item.desc,
      img: Array.isArray(item.img) ? item.img[0] : item.img,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
    res.status(200).json(firstImages);
  } catch (error) {
    console.error("Error fetching first images:", error);
    res.status(500).json({ error: "Failed to fetch first images" });
  }
};

export const uploadGalleryAlbum = async (req, res) => {
  console.log('Gallery upload request received:', req.body, req.files);
  try {
    const { title, desc, imagePaths } = req.body;

    

    const newAlbum = new GalleryAlbum({
      title,
      desc,
      img: imagePaths,
      
    });

    const savedAlbum = await newAlbum.save();
    res.status(201).json(savedAlbum);
  } catch (err) {
    console.error('Gallery upload error:', err);
    res.status(500).json({ error: 'Failed to upload images.' });
  }
};

export const updateGalleryAlbum = async (req, res) => {
  try {
    const albumId = req.params.id;
    const { title, desc, imagePaths } = req.body;

    const album = await GalleryAlbum.findById(albumId);

    if (!album) {
      return res.status(404).json({ error: "Gallery album not found" });
    }

    // Update title and desc
    if (title) album.title = title;
    if (desc) album.desc = desc;

    // Merge images only if imagePaths is provided
    if (Array.isArray(imagePaths) && imagePaths.length > 0) {
      // Combine existing and new images, ensuring no duplicates
      const uniqueImages = Array.from(new Set([...album.img, ...imagePaths]));
      album.img = uniqueImages;
    }

    const updatedAlbum = await album.save();
    res.status(200).json(updatedAlbum);
  } catch (error) {
    console.error("Error updating gallery album:", error);
    res.status(500).json({ error: "Failed to update gallery album" });
  }
};


export const deleteGalleryAlbum = async (req, res) => {
  try {
    const albumId = req.params.id;
    const deletedAlbum = await GalleryAlbum.findByIdAndDelete(albumId);

    if (!deletedAlbum) {
      return res.status(404).json({ error: "Gallery album not found" });
    }

    res.status(200).json({ message: "Gallery album deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery album:", error);
    res.status(500).json({ error: "Failed to delete gallery album" });
  }
}