import React from 'react';
import ReactDOM from 'react-dom/client';


const SearchBar = () => {
    const [nameContains, setNameContains] = React.useState('')

    const handleInputChange = (event) => {
      setNameContains(event.target.value)
    }
     
    const search_result = (e) => {
      e.preventDefault();
      window.location.href = window.catalog_url + "?query=" + nameContains ;
    }

    React.useEffect( () => {
      const params = new URLSearchParams(window.location.search);
      const queryValue = params.get('query');
      if (queryValue){
        setNameContains(queryValue);
      }
      
    }, [])


    return (
      <form className="search" onSubmit={search_result}>
      <button 
        type="button" 
        className="searchButton" 
        onClick={search_result}
      >
        <i className="fa fa-search"></i>
      </button>
      <input 
        type="text" 
        className="searchTerm" 
        value={nameContains}
        onChange={handleInputChange}
        
      />
    </form>

    )
  }


  const search_forms = document.getElementsByClassName("search_form");

  Array.from(search_forms).forEach((form) => {
    const root =  ReactDOM.createRoot(form);  // Create a root for React rendering
    root.render(<SearchBar />);     // Render the SearchBar component inside the form
  });

