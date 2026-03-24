import React, { useEffect, useState, useCallback } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // ✅ MAIN FETCH FUNCTION
  const updateNews = useCallback(async () => {
    try {
      props.setProgress(10);
      setLoading(true);
      setPage(1);
      setHasMore(true);

      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;

      let data = await fetch(url);
      props.setProgress(40);

      let parsedData = await data.json();
      props.setProgress(70);

      // ✅ HANDLE BLOCKED API / EMPTY RESPONSE
      if (!parsedData.articles) {
        setArticles([]);
        setTotalResults(0);
        setHasMore(false);
        return;
      }

      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults || 0);
    } catch (error) {
      console.error("API Error:", error);
      setArticles([]);
      setHasMore(false);
    } finally {
      setLoading(false);
      props.setProgress(100); // ✅ always completes
    }
  }, [
    props.country,
    props.category,
    props.apiKey,
    props.pageSize,
    props.setProgress,
  ]);

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
  }, [props.category, updateNews]);

  // ✅ INFINITE SCROLL
  const fetchMoreData = async () => {
    try {
      if (!articles || articles.length >= totalResults) {
        setHasMore(false);
        return;
      }

      const nextPage = page + 1;

      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;

      let data = await fetch(url);
      let parsedData = await data.json();

      if (!parsedData.articles || parsedData.articles.length === 0) {
        setHasMore(false);
        return;
      }

      setPage(nextPage);
      setArticles((prev) => prev.concat(parsedData.articles));
    } catch (error) {
      console.error("Fetch More Error:", error);
      setHasMore(false);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "30px 0px" }}>
        NewsMonkey Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>

      {/* ✅ SHOW MESSAGE IF API FAILS */}
      {!loading && articles.length === 0 && (
        <h4 className="text-center text-danger">
          ⚠️ News not available (API blocked in production)
        </h4>
      )}

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles &&
              articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItems
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    source={element.source.name}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 15,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;