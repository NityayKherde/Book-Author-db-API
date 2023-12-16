import React from 'react';
import './index.css'; // Import the AuthorCard CSS file

const AuthorCard = ({ author }) => {
  return (
    <div className="author-card">
      <h3>Author: {author.name}</h3>
      <p>ID: {author.author_id}</p>
      <p>Birth Place: {author.birth_place}</p>
      <p>Birth Date: {author.birth_date}</p>
      <p>Genre: {author.genre}</p>
      <p>Followers Count: {author.followers_count}</p>
      <p>About Author: {author.about_author}</p>
      {/* You can add more details here */}
    </div>
  );
};

export default AuthorCard;
