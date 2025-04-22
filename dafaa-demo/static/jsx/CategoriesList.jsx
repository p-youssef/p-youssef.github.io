import React from 'react';
import ReactDOM from 'react-dom/client';

const CategoriesList = () => {
  const [categories, setCategories] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${window.category_list_api_url}?page=${page}`);
        const data = await response.json();

        // Assuming 'results' is the key where the categories are stored
        setCategories(prevCategories => [...prevCategories, ...data.results]);

        // Check if there's more data to load
        if (!data.next) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hasMore) {
      fetchCategories();
    }
  }, [page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <h1>Categories List</h1>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            <p>Price: ${category.price}</p>
          </li>
        ))}
      </ul>
      {loading && ( <div className="spinner-border" role="status">  <span className="sr-only">Loading...</span> </div>)}
      {!loading && hasMore && <button onClick={loadMore}>Load More</button>}
      {!hasMore && <p>No more categories to load.</p>}
    </div>
  );
};



const CategoriesListDIV = ReactDOM.createRoot(document.getElementById('CategoriesListDiv'))
if (CategoriesListDIV !== null){
  CategoriesListDIV.render(<CategoriesList></CategoriesList>)
}

