import React from 'react';
import './App.css';
import InfiniteScroll from './InfiniteScroll';

function App (props) {
  return (
    <div className="is-dark">
    <div id="app" className="container">
      <section id="header" className="hero is-info">
        <div className="hero-body container has-text-centered">
          <h1 className="title">
          Improved Goggles
          </h1>
          <h2 className="subtitle">
          (it's an infinite scroll json viewer)
          </h2>
        </div>
      </section>

      <InfiniteScroll endpoint={props.endpoint} />

      <footer className="footer">
          <div className="content has-text-centered">
            <p><strong>Improved Goggles</strong> uses data from <a href={props.endpoint}>{props.provider}</a>.</p>
          </div>
      </footer>
    </div>
    </div>
  );
}

export default App;
