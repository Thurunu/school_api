const NewsData = [
  {
    id: 1,
    title: "What is Lorem Ipsum?",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    bannerImg:
      "https://drive.google.com/uc?export=download&id=1lY8ah-e10ED34usIQ7kyslNQBARcWEJn",
  },
  {
    id: 2,
    title: "Why do we use it? & what its for?",
    desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    bannerImg:
      "https://drive.google.com/uc?export=download&id=1Vo5mLZc4JLybvpJ9LfMU_YWIVluiuxO6",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet.",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, optio?",
    bannerImg:
      "https://drive.google.com/uc?export=download&id=1Whl2Fq3jvsGfS2ubNl1ZhCMPbu0nx_7z",
  },
];

// GET all news
export const getNews = (req, res) => {
  res.status(200).json(NewsData);
};

// GET single news by ID
export const getNewsById = (req, res) => {
  const newsId = parseInt(req.params.id);
  console.log(newsId);
  const newsItem = NewsData.find((n) => n.id === newsId);
  console.log(newsItem);
  if (!newsItem) {
    return res.status(404).json({ error: "News item not found" });
  }

  res.status(200).json(newsItem);
};
