import React from 'react';
import ReactDOM from 'react-dom/client';


const ProductsList = () => {
  const [products, setProducts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${window.product_list_api_url}?page=${page}`);
        const data = await response.json();

        // Assuming 'results' is the key where the products are stored
        setProducts(prevProducts => [...prevProducts, ...data.results]);

        // Check if there's more data to load
        if (!data.next) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hasMore) {
      fetchProducts();
    }
  }, [page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <h1>Products List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
      {loading && ( <div className="spinner-border" role="status">  <span className="sr-only">Loading...</span> </div>)}
      {!loading && hasMore && <button onClick={loadMore}>Load More</button>}
      {!hasMore && <p>No more products to load.</p>}
    </div>
  );
};



const ProductsListDIV = ReactDOM.createRoot(document.getElementById('ProductsList'))
if (ProductsListDIV !== null){
  ProductsListDIV.render(<ProductsList></ProductsList>)
}

