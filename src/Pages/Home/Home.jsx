import React from 'react';
import './Home.scss';

const Home = () => {
  const name = "Alyorbek";

  return (
    <div className="home-container">
      <div className="animated-name">
        {name.split("").map((letter, index) => (
          <span key={index} className="letter" style={{ animationDelay: `${index * 0.3}s` }}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Home;
