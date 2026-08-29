module.exports = async (req, res) => {
  try {
    const { q, category, country, max, page } = req.query;
    const apiKey = process.env.REACT_APP_GNEWS_API;

    const baseUrl = q
      ? "https://gnews.io/api/v4/search"
      : "https://gnews.io/api/v4/top-headlines";

    const params = new URLSearchParams();
    if (q) {
      params.append("q", q);
    } else {
      params.append("category", category || "general");
    }
    
    params.append("lang", "en");
    params.append("country", country || "us");
    params.append("max", max || "12");
    params.append("page", page || "1");
    params.append("apikey", apiKey);

    const url = `${baseUrl}?${params.toString()}`;

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