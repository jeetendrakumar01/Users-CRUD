import React from 'react';
import './Home.css';

/**
 * Home component serves as the landing page with a clear slogan,
 * brief description, and a visual representation of the app's functionality.
 * Designed with clean layout, subtle animations, and professional styling.
 */
const Home = () => {
  return (
    <>
      <header className="app-header">
        <div className="logo">MERN CRUD</div>
        
      </header>
      <main className="home-container" role="main" aria-label="Landing page">
        <section className="intro-section">
          <h1 className="slogan">Powerful Forms, Seamless Flow – CRUD Made Simple with MERN.</h1>
          <p className="subtitle">
            A simple MERN stack app to Create, Read, Update, and Delete your users.
          </p>
        </section>
        <section className="animation-container" aria-label="App functionality illustration">
          <div className="phone" aria-hidden="true">
            <div className="screen">
              <ul className="contact-list" aria-live="polite" aria-relevant="additions">
                <li className="contact-item">Jeetendra Kumar</li>
                <li className="contact-item">23</li>
                <li className="contact-item">New Delhi</li>
              </ul>
              <div className="actions" aria-hidden="true">
                <button className="btn add" aria-label="Add contact">Add</button>
                <button className="btn edit" aria-label="Edit contact">Edit</button>
                <button className="btn delete" aria-label="Delete contact">Delete</button>
              </div>
            </div>
          </div>
          <div className="arrows" aria-hidden="true">
            <span className="arrow">→</span>
            <span className="arrow">→</span>
            <span className="arrow">→</span>
          </div>
          <aside className="database" aria-label="Database information">
            <div className="db-icon" aria-hidden="true">🗄️</div>
            <p>Data stored securely in MongoDB</p>
          </aside>
        </section>
      </main>
    </>
  );
};

export default Home;
