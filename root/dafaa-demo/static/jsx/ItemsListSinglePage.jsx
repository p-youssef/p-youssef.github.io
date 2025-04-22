import React from 'react';
import ReactDOM from 'react-dom/client';

import ItemOnlineShop from './ItemOnlineShop';
import ItemCard from './ItemCard';

const ItemsListSinglePage = () => {
  const [items, setItems] = React.useState([]);
  const [category, setCategory] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const mainItemsListRef = React.useRef(null);
  const scrollLeftInit =  // React.useState(0.3 *  window.innerWidth)

  
  React.useEffect(() => {
    if (window.categories_id && Object.entries(window.categories_id).length > 0) {
      setCategory(Object.entries(window.categories_id)[0][1]);
    }
  }, []);
  
  React.useEffect(() => {

    const fetchItems = async () => {
      setLoading(true);
      setItems([])

      try {
        
        const response = await fetch(`${window.item_list_api_url}?page=1&page_size=4&category_id=${category}`);
        
        const data = await response.json();

        // Assuming 'results' is the key where the items are stored
        setItems(prevItems => [...prevItems, ...data.results]);

        // Check if there's more data to load

      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    
    fetchItems();
    
  }, [category]);

  const loadCategory = (category_id) => {
    setCategory(category_id.id);

  };
  React.useEffect(() => {
    // Scroll to the left by 3 items (assuming each item is 100px wide)
    if (mainItemsListRef.current) {
//      mainItemsListRef.current.scrollLeft= scrollLeftInit; 
      mainItemsListRef.current.scrollLeft = mainItemsListRef.current.scrollWidth * 0.125;

    }
  }, [items]);



  const scrollLeft = () => {
    if (mainItemsListRef.current) {
      if (mainItemsListRef.current.scrollLeft > 0) {
        mainItemsListRef.current.scrollBy({ left: -0.5 * window.innerWidth, behavior: 'smooth' });
      } else {
        window.location.href = window.catalog_url + "?category=" + category;
      }
    }
  };

  // Scroll the items list to the right
  const scrollRight = () => {
    if (mainItemsListRef.current) {
      const maxScrollLeft = mainItemsListRef.current.scrollWidth - mainItemsListRef.current.clientWidth;
      if (mainItemsListRef.current.scrollLeft < maxScrollLeft) {
        mainItemsListRef.current.scrollBy({ left: 0.5 * window.innerWidth, behavior: 'smooth' });
      } else {
        window.location.href = window.catalog_url + "?category=" + category ;
      }
    }
  };

  return (
    <div  className="ItemsListInnerDIV">

      <div className="categories_names  justify-content-center">

        {Object.entries(window.categories_id).map(([name, id]) => (
          
          <button 
          key={id} onClick={() => loadCategory({id})} 
          className={category === id ? 'active' : ''}
          >{name}</button>  
        ))}
        
      </div>
        <br></br>
      {loading && (
        
        <ul className="row w-100 p-md-3 d-lg-flex p-0 p-sm-2 justify-content-center">


          {[...Array(4)].map((_, index) => (
            
            <div key={index} className="col-xl-3 col-sm-6 p-0 p-sm-2 card">
              <li>
             <div className='product_image loading'>
             </div>
             <div className="product_details row ">
               <p className="price col-5 loading">1</p>
               <p className="col-5 ml-auto loading">1</p>
 
               <h3 className="col-12 mb-0 loading">1</h3>
               <p className="col-12 loading">1</p>

                 <div className="col-6 pl-2 pr-2">
                   <button className="btn custom_request_button button_view_1 col loading">1</button>
                 </div>
                 <div className="col-6 pl-2 pr-2">
                   <button className="btn buy_now_button button_view_1 col loading">1</button>
                 </div> : <a></a>
             </div>
 
           </li>
           </div>
          ))}


        </ul>
      )}

      <ul className="row w-100 p-md-3 p-0  p-sm-2 justify-content-center" id="main_items_list" ref={mainItemsListRef}>
        
        <button onClick={scrollLeft} className="scrollLeftButton"><i className="fa-solid fa-chevron-left"></i></button>
        <button onClick={scrollRight} className="scrollRightButton"><i className="fa-solid fa-chevron-right"></i></button>
        {items.map(item => (
            <ItemCard key={item.id} item={item}></ItemCard>
            
        ))}
        <ItemOnlineShop item_online_shops = {{}}  />
        
        
      </ul>
      
      
      
    </div>
    
  );
  
};



const ItemsListDIV = ReactDOM.createRoot(document.getElementById('ItemsListDIV'))
if (ItemsListDIV !== null) {
  ItemsListDIV.render(<ItemsListSinglePage></ItemsListSinglePage>)
}


const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};



