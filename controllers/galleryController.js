const GalleryData = [
  {
    id: 1,
    img: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&h=300&fit=crop",
    ],
    title: "Nature Collection",
    desc: "Beautiful landscapes and scenic views from around the world",
    aosDelay: "0",
  },
  {
    id: 2,
    img: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop",
    ],
    title: "Tech & Innovation",
    desc: "Modern technology and innovative solutions for the future",
    aosDelay: "200",
  },
  {
    id: 3,
    img: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop",
    ],
    title: "Architecture Showcase",
    desc: "Stunning architectural designs and urban photography",
    aosDelay: "400",
  },
  {
    id: 4,
    img: [
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1609592144043-8957810b27a6?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1586227740560-8cf2732c1531?w=500&h=300&fit=crop",
    ],
    title: "Food & Culinary",
    desc: "Delicious food photography and culinary artistry",
    aosDelay: "600",
  },
  {
    id: 5,
    img: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1611095973362-ee1cd3ee2f4d?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1609592144043-8957810b27a6?w=500&h=300&fit=crop",
    ],
    title: "Travel Adventures",
    desc: "Amazing travel destinations and memorable experiences",
    aosDelay: "800",
  },
  {
    id: 6,
    img: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1611095973362-ee1cd3ee2f4d?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=500&h=300&fit=crop",
    ],
    title: "Travel Adventures",
    desc: "Amazing travel destinations and memorable experiences",
    aosDelay: "800",
  },
];

export default GalleryData;

//get all gallery items
export const getGallery = (req, res) => {
  res.status(200).json(GalleryData);
};

//get single gallery item by ID
export const getGalleryById = (req, res) => {
  const galleryId = parseInt(req.params.id);
  const galleryItem = GalleryData.find((g) => g.id === galleryId);
  if (!galleryItem) {
    return res.status(404).json({ error: "Gallery item not found" });
  }
  res.status(200).json(galleryItem);
};

// get first image from the each gallery
export const getFirstImage = (req, res) => {
  const firstImages = GalleryData.map((item) => {
    return {
      id: item.id,
      img: Array.isArray(item.img) ? item.img[0] : item.img,
      title: item.title,
      desc: item.desc,
      aosDelay: item.aosDelay,
    };
  });
  res.status(200).json(firstImages);
};
