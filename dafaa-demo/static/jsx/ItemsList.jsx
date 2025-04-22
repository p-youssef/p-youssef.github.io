import React from 'react';
import ReactDOM from 'react-dom/client';

import ItemOnlineShop from './ItemOnlineShop';
import ItemCard from './ItemCard';
import ProductFilter from './ItemFilters'


const ItemsList = () => {
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [requestItemsCount, setRequestItemsCount] = React.useState(0);
  
  
  const [sortOption, setSortOption] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);
  const [enableLoadingRef, setEnableLoadingRef] = React.useState(true);
  const loadingRef = React.useRef(null);

  const fetchController = React.useRef(new AbortController());
  const params = new URLSearchParams(window.location.search);
  const queryValue = params.get('query');

  const [filtersDict, setFiltersDict] = React.useState(Object.entries({'query':queryValue}).filter(([key, value]) => value !== 'all' && value !== ''));
  const [filter, setFilter] = React.useState('');

  const [isWindowLoaded, setIsWindowLoaded] = React.useState(false);


  React.useEffect(() => {
    if (queryValue !== null){
      setFilter(`query=${queryValue}`);
    }

    const handleLoad = () => {
      setIsWindowLoaded(true); // Set to true when the window is fully loaded
    };

    window.addEventListener('load', handleLoad);

    // Clean up the event listener
    return () => window.removeEventListener('load', handleLoad);

  }, []);



  React.useEffect(() => {
    fetchItems(1);
  }, [filter, sortOption]);
  
  const onFilterChange = (newFilters) => {
    setEnableLoadingRef(false);
    if (! ('query' in newFilters) && queryValue !== null ){
      newFilters['query'] = queryValue;  
      console.log(queryValue)
    }
    
    setFiltersDict(Object.entries(newFilters).filter(([key, value]) => value !== 'all' && value !== ''));
    setFilter(new URLSearchParams(Object.entries(newFilters).filter(([key, value]) => value !== 'all' && value !== '')).toString());
    setLoading(true);
    setHasMore(true);
    setItems([]);
    
    setPage(1);
    
    
    
  }


  
  const handleSortChange = (e) => {
    setHasMore(true);
    setItems([]);
    document.getElementById('options_container_oprn_button').classList.add('collapsed');
    document.getElementById('sort_options_container').classList.remove('show');
    setSortOption(e.target.value);
    setPage(1);
    fetchItems(1);
  };


    const fetchItems = async (currentPage) => {
      setLoading(true);
      try {
        
        // Abort previous request if exists
        if (fetchController.current) {
          fetchController.current.abort();
        }

        // Create a new AbortController for the current request
        fetchController.current = new AbortController();
        const favParam = window.wish_list ? "&fav=true" : "";

        const response = await fetch(
          `${window.item_list_api_url}?page=${currentPage}&ordering=${sortOption}&page_size=12&${filter}${favParam}`,
          { signal: fetchController.current.signal }
        );
        const data = await response.json();

        setItems((prevItems) => [...prevItems, ...data.results]);

        setLoading(false); 
        if (!data.next) {
          setHasMore(false);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching items:', error);
          setLoading(false); 
        }
      } finally {
         
      }
      
    };

    React.useEffect(() => {
    
    
    if (hasMore) {
      
      fetchItems(page );

      
    }
    }, [requestItemsCount]);

    const onClickViewMore = () => {

          
          fetchItems(page + 1)
          setPage(page + 1);
    
  }

  const onlineShopsData = {};
  

  return (
    
    <div style={{ 
      display: "flex", 
      width: window.filterView ? "auto" : "100%" 
    }}>
      { window.filterView && (
        <div id="Product_filter_div" className="w-auto">
          <ProductFilter onFilterChange={onFilterChange}></ProductFilter>
        </div>
      )}
      

      <div className="ItemsListInnerDIV container">

        <ul className="row col-12 p-0 p-lg-3" style={{flexWrap: 'wrap'}}>
        { window.filterView && (  
        <div className="col-12" style={{ display: 'flex', justifyContent: 'space-between' }}>
          
            <div className=" row filter_bar">
            <a className="w-auto d-flex d-lg-none" id="filter_container_open_button" data-toggle="collapse" href="#filter_container" role="button" aria-expanded="true" aria-controls="filter_container"><i className="fa-solid fa-bars"></i></a>
              <p className="d-none d-lg-flex">Applied filters:</p>

              {filtersDict.map(([key, value]) => {
                
                if (key === 'first_offer_price__lt' && filtersDict.some(([k]) => k === 'first_offer_price__gt') ||  value === null || value.length === 0  ) {
                  return null; // Skip rendering this button
                }

                return (
                  <div key={key} className="filter_bar_item d-none d-lg-flex">
                    {key === 'category'   && (
                      <p>
                        Category: {
                          window.categories.find(category => category.id == value).name
                        }
                        
                        <a href="#" onClick={window.reset_category_filter}><i className="fa-solid fa-x"></i></a>
                      </p>
                      
                    )}

                    {key === 'product' && (
                      <p>
                        Product: {
                          window.categories.find(
                            category => category.id == filtersDict.find(([k]) => k === 'category')[1]
                          ).types.find(item => item.id == value).name
                        }
                        <a href="#" onClick={window.reset_type_filter}><i className="fa-solid fa-x"></i></a>
                      </p>
                    )}

                    {key === 'first_offer_price__lt' && !filtersDict.some(([k]) => k === 'first_offer_price__gt') && (
                      <p>
                        Price &lt; {value} €
                        <a href="#" onClick={window.reset_price_lt_filter}><i className="fa-solid fa-x"></i></a>
                      </p>
                    )}

                    {key === 'first_offer_price__gt' && !filtersDict.some(([k]) => k === 'first_offer_price__lt') && (
                      <p>
                        {value} &lt; Price €
                        <a href="#" onClick={window.reset_price_gt_filter}><i className="fa-solid fa-x"></i></a>
                      </p>
                    )}

                    {key === 'first_offer_price__gt' && filtersDict.some(([k]) => k === 'first_offer_price__lt') && filtersDict.some(([k]) => k === 'first_offer_price__gt') && (
                      <p>
                        {filtersDict.find(([k]) => k === 'first_offer_price__gt')[1]} -
                        {filtersDict.find(([k]) => k === 'first_offer_price__lt')[1]} €
                        <a href="#" onClick={() =>  {window.reset_price_filter()}}>x</a>
                      </p>
                    )}

                    {key === 'query' && (
                      <p>
                        Related: {value}
                        <a href="#" onClick={window.reset_query}><i className="fa-solid fa-x"></i></a>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
         
          
          </div> 
        )}
        {console.log(items)}
        {isWindowLoaded && (
          <>
          {items.map(item => (
            
            <ItemCard key={item.id} item={item}></ItemCard>
          ))}
          </>
        )}
          
          <ItemOnlineShop item_online_shops = {{}}  />

        </ul>
        <div style={{position: 'absolute', right: 0}} >
        { window.filterView && (  
        <a className="accordion-button collapsed sort_options_button" id="options_container_oprn_button" data-toggle="collapse" href="#sort_options_container" role="button" aria-expanded="true" aria-controls="sort_options_container">
            Sort By
        </a>
        )}
        { window.filterView && ( 
        <div className="form-check collapse sort_options_container form-check" id="sort_options_container">
        <label className={`form-check-label ${sortOption === 'name' ? 'active' : ''}`}>
          Name A-Z
              <input
                  className="form-check-input"
                  type="radio"
                  name="sort"
                  value="name"
                  checked={sortOption === 'name'}
                  onChange={handleSortChange}
                  label="ss"
              />
              
          </label>
          <hr />
          <label className={`form-check-label ${sortOption === '-name' ? 'active' : ''}`}>
              Name Z-A
              <input
                  className="form-check-input"
                  type="radio"
                  name="sort"
                  value="-name"
                  checked={sortOption === '-name'}
                  onChange={handleSortChange}
              />
              
          </label>
          <hr />
          <label className={`form-check-label ${sortOption === '-first_offer_price' ? 'active' : ''}`}>
          Price High-Low
              <input
                  className="form-check-input"
                  type="radio"
                  name="sort"
                  value="-first_offer_price"
                  checked={sortOption === '-first_offer_price'}
                  onChange={handleSortChange}
              />
              
          </label>
          <hr />
          <label className={`form-check-label ${sortOption === 'first_offer_price' ? 'active' : ''}`}>
              Price Low-High
              <input
                  className="form-check-input"
                  type="radio"
                  name="sort"
                  value="first_offer_price"
                  checked={sortOption === 'first_offer_price'}
                  onChange={handleSortChange}
              />
              
          </label>
          <hr />
          <label className={`form-check-label ${sortOption === '-preducing_date' ? 'active' : ''}`}>
              Date Latest-Oldest
              <input
                  className="form-check-input"
                  type="radio"
                  name="sort"
                  value="-preducing_date"
                  checked={sortOption === '-preducing_date'}
                  onChange={handleSortChange}
              />
              
          </label>
          <hr />
          <label className={`form-check-label ${sortOption === 'preducing_date' ? 'active' : ''}`}>
            Date Oldest-Latest
              <input
                  className="form-check-input"
                  type="radio"
                  name="sort"
                  value="preducing_date"
                  checked={sortOption === 'preducing_date'}
                  onChange={handleSortChange}
              />
              
          </label>
          <hr />
          <label className={`form-check-label ${sortOption === '-size' ? 'active' : ''}`}>
              Size Big-Small
              <input
                  className="form-check-input"
                  type="radio"
                  name="sort"
                  value="-size"
                  checked={sortOption === '-size'}
                  onChange={handleSortChange}
              />
              
          </label>
          <hr />
          <label className={`form-check-label ${sortOption === 'size' ? 'active' : ''}`}>
              Size Small-Big 
              <input
                  className="form-check-input"
                  type="radio"
                  name="sort"
                  value="size"
                  checked={sortOption === 'size'}
                  onChange={handleSortChange}
              />
              
          </label>
          
        </div> )}
      </div>
          {console.log('loading',loading)}
        {loading && (

          <ul className="row w-100 justify-content-space-around">
            {[...Array(12)].map((_, index) => (

              <div key={index} className="col-xl-3 col-6 p-0 p-sm-2 card" >
                <li >
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

        {hasMore && <button onClick={onClickViewMore} className="btn" style={{ backgroundColor: '#CC5D39', color:"#F6F6F6", height: "40px"}}>Load more</button>}

      </div>
      
    </div>);
};



const ItemsListDIV = ReactDOM.createRoot(document.getElementById('ItemsListDIV'))
if (ItemsListDIV !== null) {
  ItemsListDIV.render(<ItemsList></ItemsList>)
}

