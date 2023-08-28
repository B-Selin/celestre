// Import React hooks for state management
import React, { useState } from 'react';

// Import hook to get route location state
import { useLocation } from 'react-router-dom';

// Import CSS transition component
import { CSSTransition } from 'react-transition-group';

// Import component CSS 
import './DisplayPage.css';

export default function DisplayPage(props) {
  // Get search results from location state
  const location = useLocation();
  const searchResults = location.state || [];
  // State to store selected image for modal
  const [selectedImage, setSelectedImage] = useState(null);
  // State to track current page for pagination
  const [currentPage, setCurrentPage] = useState(1);


  // Open modal with selected image
  const openDetailsModal = (image) => {
    setSelectedImage(image);
  };

  // Close modal by resetting state
  const closeDetailsModal = () => {
    setSelectedImage(null);
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
