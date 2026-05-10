import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({
  country = "us",
  pageSize = 15,
  category = "general",
  apiKey,
  setProgress,
}) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // ================= FETCH NEWS =================

  const updateNews = async () => {
    try {
      setProgress(10);

      setLoading(true);

      // ================= GNEWS API WITH CORS PROXY =================

      const url = `https://corsproxy.io/?https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=${country}&max=${pageSize}&apikey=${apiKey}`;

      // ================= NEWSAPI =================

      // const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

      let data = await fetch(url);

      setProgress(40);

      let parsedData = await data.json();

      setProgress(70);

      setArticles(parsedData.articles || []);

      // GNews uses totalArticles
      setTotalResults(parsedData.totalArticles || 0);

      setLoading(false);

      setProgress(100);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(
      category
    )} - NewsMonkey`;

    updateNews();

    // eslint-disable-next-line
  }, [category]);

  // ================= INFINITE SCROLL =================

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;

      setPage(nextPage);

      // ================= GNEWS API WITH CORS PROXY =================

      const url = `https://corsproxy.io/?https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=${country}&max=${pageSize}&page=${nextPage}&apikey=${apiKey}`;

      // ================= NEWSAPI =================

      // const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;

      let data = await fetch(url);

      let parsedData = await data.json();

      if (parsedData.articles) {
        setArticles((prevArticles) =>
          prevArticles.concat(parsedData.articles)
        );
      }

      setTotalResults(parsedData.totalArticles || 0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        NewsMonkey - Top {capitalizeFirstLetter(category)} Headlines
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItems
                    title={
                      element.title
                        ? element.title.slice(0, 45)
                        : ""
                    }
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }

                    // ================= GNEWS IMAGE =================

                    imageUrl={
                      element.image
                        ? element.image
                        : "https://via.placeholder.com/300x180.png?text=No+Image"
                    }

                    // ================= NEWSAPI IMAGE =================

                    // imageUrl={
                    //   element.urlToImage
                    //     ? element.urlToImage
                    //     : "https://via.placeholder.com/300x180.png?text=No+Image"
                    // }

                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;