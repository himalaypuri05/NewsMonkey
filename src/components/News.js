import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({
  country = "us",
  pageSize = 12,
  category = "general",
  apiKey,
  setProgress,
  searchQuery,
  setSearchQuery,
}) => {
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // ---------------- FETCH INITIAL NEWS ----------------
  const updateNews = async () => {
    try {
      setProgress(10);
      setLoading(true);

      const queryParams = searchQuery
        ? `q=${encodeURIComponent(searchQuery)}`
        : `category=${category}`;

      const url = `/api/news?${queryParams}&country=${country}&max=${pageSize}&page=1`;

      const response = await fetch(url);
      const data = await response.json();

      setProgress(60);

      setArticles(data.articles || []);
      setTotalResults(data.totalArticles || 0);
      setPage(1);

      setProgress(100);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = searchQuery
      ? `Search: ${searchQuery} - NewsMonkey`
      : `${capitalizeFirstLetter(category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, [category, searchQuery]);

  // ---------------- INFINITE SCROLL ----------------
  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;

      const queryParams = searchQuery
        ? `q=${encodeURIComponent(searchQuery)}`
        : `category=${category}`;

      const url = `/api/news?${queryParams}&country=${country}&max=${pageSize}&page=${nextPage}`;

      const response = await fetch(url);
      const data = await response.json();

      setArticles((prev) => prev.concat(data.articles || []));
      setTotalResults(data.totalArticles || 0);
      setPage(nextPage);
    } catch (error) {
      console.log("Error loading more news:", error);
    }
  };

  return (
    <>
      <div className="container" style={{ marginTop: "90px" }}>
        <h1 className="text-center header-title my-4">
          {searchQuery
            ? `NewsMonkey - Search results for "${searchQuery}"`
            : `NewsMonkey - Top ${capitalizeFirstLetter(category)} Headlines`}
        </h1>

        {searchQuery && (
          <div className="text-center mb-4">
            <button
              className="btn btn-outline-danger btn-sm rounded-pill px-3"
              onClick={() => setSearchQuery("")}
            >
              Clear Search & Show Top Headlines
            </button>
          </div>
        )}

        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
          style={{ overflow: "visible" }}
        >
          <div className="container">
            <div className="row justify-content-center">
              {!loading && articles.length === 0 && (
                <div className="col-12 text-center my-5">
                  <h3 className="text-muted">No news articles found.</h3>
                  <p className="text-muted">Try searching for something else or check your spelling.</p>
                </div>
              )}
              {articles.map((element, index) => (
                <div className="col-md-4 my-3 d-flex align-items-stretch" key={element.url || index}>
                  <NewsItems
                    title={element.title || ""}
                    description={element.description || ""}
                    imageUrl={
                      element.image ||
                      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80"
                    }
                    newsUrl={element.url}
                    author={element.source?.name || "Unknown"}
                    date={element.publishedAt}
                    source={element.source?.name || "Unknown"}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
};

export default News;