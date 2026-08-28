module.exports = async (req, res) => {
  try {
    const category = req.query.category || "general";
    const page = req.query.page || 1;
    
    // const apiKey = process.env.REACT_APP_NEWS_API;
    const apiKey = process.env.REACT_APP_GNEWS_API || "YOUR_API_KEY";

    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=15&page=${page}&apikey=${apiKey}`;

    const response = await fetch(url);

    const data = await response.json();

    res.status(200).json(data);
    
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};