import React from "react";

const NewsItems = (props) => {
  const { title, description, imageUrl, newsUrl, author, date, source } = props;

  const formattedDate = date ? new Date(date).toGMTString() : "Date unavailable";

  return (
    <div className="w-100 my-2">
      <div className="card news-card h-100 d-flex flex-column">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "10px",
            top: "10px",
            zIndex: 1,
          }}
        >
          <span className="badge badge-source bg-danger">{source}</span>
        </div>
        <img
          src={
            imageUrl ||
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80"
          }
          className="card-img-top"
          alt={title || "News article"}
        />
        <div className="card-body news-card-body d-flex flex-column justify-content-between flex-grow-1">
          <div>
            <h5 className="card-title news-card-title">
              {title ? (title.length > 70 ? `${title.slice(0, 70)}...` : title) : "No Title Available"}
            </h5>
            <p className="card-text news-card-text">
              {description
                ? description.length > 120
                  ? `${description.slice(0, 120)}...`
                  : description
                : "No description available for this article. Click 'Read More' to view details."}
            </p>
          </div>
          <div className="mt-3">
            <p className="card-text news-card-meta mb-3">
              <small>
                By <strong>{author || "Unknown"}</strong> on {formattedDate}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark w-100 rounded-pill py-2 shadow-sm"
              style={{ backgroundColor: "var(--accent-color)", borderColor: "var(--accent-color)" }}
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItems;
