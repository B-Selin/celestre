import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import './DisplayPage.css';

export default function DisplayPage(props) {
  const location = useLocation();
  const searchResults = location.state || [];
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);



  const openDetailsModal = (image) => {
    setSelectedImage(image);
  };

  const closeDetailsModal = () => {
    setSelectedImage(null);
  };


  // Keeping track of next page to handle pagination and use the props to be able to run the load more
  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };


  return (
    <div className="photos-grid">
      {searchResults.length > 0 ? (
        searchResults.map(result => (
          <div key={result.data[0].nasa_id} className="photo-card">
            <div className="image-link" onClick={() => openDetailsModal(result)}>
              <img src={result.links[0].href} alt={result.data[0].title} />
              <div className="overlay"><span>{result.data[0].title}</span></div>
            </div>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}

      {/* Add next and previous page buttons here */}
      {searchResults.length > 0 && (
        <div className="pagination">
          {/* Add a "Load More" button to load the next page if there is a next page */}

          <button onClick={loadNextPage}>Load More</button>

        </div>
      )}

      {selectedImage && (
        <CSSTransition
          in={selectedImage}
          timeout={300}
          classNames="modal"
          unmountOnExit
        >
          <div className="details-modal">
            <div className="modal-content">

              <div className="modal-left">
                <img src={selectedImage.links[0].href} />
              </div>

              <div className="modal-right">
                <h3>{selectedImage.data[0].title}</h3>
                <p>{selectedImage.data[0].description}</p>
                <button onClick={closeDetailsModal}>Close</button>
              </div>

            </div>
          </div>
        </CSSTransition>
      )}
    </div>
  );
}
