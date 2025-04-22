import React from 'react';
import ReactDOM from 'react-dom/client';


const ProductImagesView = () => {
  const [currentImage, setCurrentImage] = React.useState(window.cover_image);
  const [viewCurrentImagestatus, setViewCurrentImagestatus] = React.useState(false);

  const imageContainerRef = React.useRef(null);

  const ChangeCurrentImage = (image_) => {
    setCurrentImage(image_);
  }

  const viewCurrentImage = () => {
    setViewCurrentImagestatus(!viewCurrentImagestatus);
  }

  // Function to change to the next image
  const goToNextImage = (event) => {
    event.stopPropagation(); 
    const currentIndex = window.images.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % window.images.length;  // Loop back to the first image if at the end
    setCurrentImage(window.images[nextIndex]);
    
  };

  // Function to change to the previous image
  const goToPrevImage = (event) => {
    //event.stopPropagation(); 
    const currentIndex = window.images.indexOf(currentImage);
    const prevIndex = (currentIndex - 1 + window.images.length) % window.images.length;  // Loop back to the last image if at the beginning
    setCurrentImage(window.images[prevIndex]);
    
  };

  // Add key press events to navigate images
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (viewCurrentImagestatus) {
        if (event.key === 'ArrowRight') {
          goToNextImage(event);
        } else if (event.key === 'ArrowLeft') {
          goToPrevImage(event);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [viewCurrentImagestatus, currentImage]);

  React.useEffect(() => {
    const handleTransitionEnd = () => {
      if (!viewCurrentImagestatus && imageContainerRef.current) {
        imageContainerRef.current.style.display = 'none';  // Remove flex after transition
      }
    };

    const container = imageContainerRef.current;
    if (container) {
      container.addEventListener('transitionend', handleTransitionEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener('transitionend', handleTransitionEnd);
      }
    };
  }, [viewCurrentImagestatus]);

  React.useEffect(() => {
    if (viewCurrentImagestatus && imageContainerRef.current) {
      imageContainerRef.current.style.display = 'flex';
    }
  }, [viewCurrentImagestatus]);

  return (
    <div className="d-flex product_images_view_inner row">
      <div className="product_images_list col-3">
      {
        window.images.map((image_, index) => (
          <div 
            key={index} 
            className={`product_images_item ${image_ === currentImage ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${image_}.400x400_q85.jpg)`,
              marginTop: index === 0 ? '0' : '10px'  // Adjust margin for the first item
            }}
            onClick={() => {ChangeCurrentImage(image_)}}
          ></div>
        ))
      }
      </div>

      <div 
        className="product_image col-9" 
        onClick={viewCurrentImage} 
        style={{ backgroundImage: `url(${currentImage}.800x800_q85.jpg)` }}
      ></div>

      <div
        ref={imageContainerRef}
        className={`product_image_full_view_container ${viewCurrentImagestatus ? 'active' : ''}`}
        onClick={viewCurrentImage}
      >
        <button onClick={goToPrevImage} className="prev-button bg-none"><i className="fa-solid fa-chevron-left"></i></button>
        <img className="product_image_full_view"  src={viewCurrentImagestatus ? currentImage : currentImage + ".800x800_q85.jpg"} alt="Product View" />
        <button onClick={goToNextImage} className="next-button"><i className="fa-solid fa-chevron-right"></i></button>
      </div>
    </div>
  );
}

// Get the root element
const product_images_view = document.getElementById('product_images_view');

if (product_images_view !== null) {
  const root = ReactDOM.createRoot(product_images_view);
  // Render the component using PascalCase
  root.render(<ProductImagesView />);
}
