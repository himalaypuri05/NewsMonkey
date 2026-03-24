import React from "react";

const NewsItems = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div className='my-3'>
        <div className='card'>
          <div style={{
            display : 'flex',
            justifyContent : 'flex-end',
            position: 'absolute',
            right : '0'}}>
            <span className="badge rounded-pill bg-danger">{source}</span>
            </div>
          <img src={imageUrl?imageUrl:"https://deadline.com/wp-content/uploads/2026/01/zaysvtownThe_Moment-Still_1.jpg?w=1024"}
            className='card-img-top' alt='...'></img>
          <div className='card-body'>
            <h5 className='card-title'>{title}...</h5>
            <p className='card-text'>{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {author?author:""} on {date?date:""}</small></p>
            <a rel="noreferrel" href={newsUrl} target="blank"
              className='btn btn-sm btn-dark'> Read More </a>
          </div>
        </div>
      </div>
    )
}
export default NewsItems;
