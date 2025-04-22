import React from 'react';

 const ItemOnlineShop = ({item_online_shops}) => {
    
  const [shops, setShops] = React.useState(item_online_shops);

  // Function to update shops using the latest state
  const updateShops = React.useCallback((Cshops) => {

      setShops(prevShops => {

          return Cshops;
      });
      const modalElement = document.getElementById('item_stores_window');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
  }, [shops]);

  // Set the global function to the latest updateShops callback
  React.useEffect(() => {
      window.update_current_shops = updateShops;
  }, [updateShops]);

  // Function to get the favicon link for each shop
  const getFaviconLink = (url) => {
      try {
          const Flink = new URL(url).hostname;
          return `https://${Flink}/favicon.ico`;
      } catch (error) {
          return `https://dafaa/favicon.ico`;
      }
  };

  return (
<div className="modal fade" id="item_stores_window" tabIndex="-1" role="dialog" aria-labelledby="item_stores_window" aria-hidden="true">
    <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Available On</h5>
                <button 
                  type="button" 
                  style={{ border: 0 }} 
                  className="btn-close" 
                  data-bs-dismiss="modal" 
                  aria-label="Close">
                </button>
            </div>
            <div className="modal-body row">
                {/* Logging directly in JSX */}
                
                {Object.entries(shops).map(([shop, url]) => 
                    shop !== '' ? (
                        <a target="_blank" key={shop} className="shop_button btn" href={url}>
                            <div className="favicon_container" style={{ backgroundImage: `url(${getFaviconLink(url)})` }}></div>
                            <p>{shop}</p>
                        </a>
                    ) : <h5>Not available online yet,<br></br> please check later</h5> // If the shop is an empty string, render nothing
                )}
                
            </div>
        </div>
    </div>
</div>

  );
};




export default ItemOnlineShop;