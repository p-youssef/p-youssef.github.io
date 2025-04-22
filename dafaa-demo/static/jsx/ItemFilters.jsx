import React from 'react';
import ReactDOM from 'react-dom/client';

const ProductFilter = ({ onFilterChange }) => {
  const [first_offer_price__gt, setPriceFrom] = React.useState("");
  const [first_offer_price__lt, setPriceTo] = React.useState("");
  const [category, setCategory] = React.useState("all");
  const [product, setType] = React.useState("all");
  const [types, setTypes] = React.useState([]); // New state for types based on selected category
  


  const handlePriceFromChange = (e) => {
    setPriceFrom(e.target.value);
    onFilterChange({ first_offer_price__gt: e.target.value, first_offer_price__lt, category, product });
  };

  React.useEffect(() => {
    console.log('window.current_category',window.current_category, window.current_category !== null);
    if (window.current_category !== null) {
      setCategory(window.current_category);


      const selectedCategory = window.categories.find(
        (category) => category.id === parseInt(window.current_category)
      );
  
      // Update the types based on the selected category
      if (selectedCategory) {
        setTypes(selectedCategory.types);
        setType("all"); // Reset product when category changes
      } else {
        setTypes([]);
      }
  
      onFilterChange({
        first_offer_price__gt, 
        first_offer_price__lt, 
        category: window.current_category, 
        product:"all"
      });
    }
  }, []);
  

  window.reset_query = () => {
    const url = new URL(window.location);
    const params = new URLSearchParams(window.location.search);
    params.set('query', '');
    url.search = params.toString();
    window.history.pushState({}, '', url);

    onFilterChange({
      first_offer_price__gt,
      first_offer_price__lt,
      category,
      product,
      'query':''
    });
  }

  window.reset_price_gt_filter = () => {
    
    setPriceFrom("")

    onFilterChange({
      first_offer_price__gt: '',
      first_offer_price__lt,
      category,
      product,
    });
  }


  const handlePriceToChange = (e) => {
    setPriceTo(e.target.value);
    onFilterChange({ first_offer_price__gt, first_offer_price__lt: e.target.value, category, product });
  };

  window.reset_price_lt_filter = () => {
    
    setPriceTo("")

    onFilterChange({
      first_offer_price__gt,
      first_offer_price__lt: '',
      category,
      product,
    });
  }

  window.reset_price_filter = () => {
    
    setPriceTo("")
    setPriceFrom("")

    onFilterChange({
      first_offer_price__gt: '',
      first_offer_price__lt: '',
      category,
      product,
    });
  }


  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setCategory(selectedCategoryId);

    // Find the selected category
    const selectedCategory = window.categories.find(
      (category) => category.id === parseInt(selectedCategoryId)
    );

    // Update the types based on the selected category
    if (selectedCategory) {
      setTypes(selectedCategory.types);
      setType("all"); // Reset product when category changes
    } else {
      setTypes([]);
    }

    onFilterChange({
      first_offer_price__gt,
      first_offer_price__lt,
      category: selectedCategoryId,
      product: "all",
    });
  };


  window.reset_category_filter = () => {
    setCategory("all");
    setType("all")

    onFilterChange({
      first_offer_price__gt,
      first_offer_price__lt,
      category: "all",
      product: "all",
    });
  }

  const handleTypeChange = (e) => {
    setType(e.target.value);
    onFilterChange({ first_offer_price__gt, first_offer_price__lt, category, product: e.target.value });
  };


  window.reset_type_filter = () => {
    
    setType("all")

    onFilterChange({
      first_offer_price__gt,
      first_offer_price__lt,
      category,
      product: "all",
    });
  }

  return (
<div className="filter_box collapse d-lg-block" id="filter_container" >
<h3 className="d-flex justify-content-between">Filters
<a className="w-auto collapsed d-block d-lg-none" style={{fontSize: '0.7em'}} id="filter_container_open_button" data-toggle="collapse" href="#filter_container" role="button" aria-expanded="true" aria-controls="filter_container"><i className="fa-solid fa-x"></i></a>
</h3>
<div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button
        className="accordion-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseOne"
        aria-expanded="true"
        aria-controls="collapseOne"
      >
        Category
      </button>
    </h2>
    <div
      id="collapseOne"
      className="accordion-collapse collapse show"
      aria-labelledby="headingOne"
    >
      <div className="accordion-body">
        <div>
          {window.categories.map((NCategory) => (
            <div
              className="form-check"
              key={"category_f_" + NCategory.id}
              htmlFor={"category_f_" + NCategory.id}
            >
              <input
                className="form-check-input"
                type="radio"
                name="category_filter"
                value={NCategory.id}
                
                checked={NCategory.id == category}
                onChange={handleCategoryChange}
                id={"category_f_" + NCategory.id}
              ></input>

              <label
                className="form-check-label"
                htmlFor={"category_f_" + NCategory.id}
              >
                {NCategory.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  <hr></hr>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingTwo">
      <button
        className="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseTwo"
        aria-expanded="false"
        aria-controls="collapseTwo"
      >
        Type
      </button>
    </h2>
    <div
      id="collapseTwo"
      className="accordion-collapse collapse"
      aria-labelledby="headingTwo"
    >
      <div className="accordion-body">
        <div>
          
          {types.map((NType) => (
            <div className="form-check" key={"type_f_" + NType.id}>
              <input
                className="form-check-input"
                type="radio"
                name="type_filter"
                checked={NType.id == product}
                value={NType.id}
                onChange={handleTypeChange}
                id={"type_f_" + NType.id}
              ></input>
              <label className="form-check-label" htmlFor={"type_f_" + NType.id}>
                {NType.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  <hr></hr>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingThree">
      <button
        className="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseThree"
        aria-expanded="false"
        aria-controls="collapseThree"
      >
        Price
      </button>
    </h2>
    <div
      id="collapseThree"
      className="accordion-collapse collapse"
      aria-labelledby="headingThree"
    >
      <div className="accordion-body">
        <div>
          <label htmlFor="first_offer_price__gt"> From: </label>
          <input
            className="form-control"
            type="number"
            id="first_offer_price__gt"
            name="first_offer_price__gt"
            min="0"
            max="1000"
            value={first_offer_price__gt}
            onChange={handlePriceFromChange}
          />
          <br></br>
          <label htmlFor="first_offer_price__lt"> To: </label>
          <input
          className="form-control"
            type="number"
            id="first_offer_price__lt"
            name="first_offer_price__lt"
            min="1"
            max="1000"
            value={first_offer_price__lt}
            onChange={handlePriceToChange}
          />

        </div>
      </div>
    </div>
  </div>
</div>
</div>
  );
};



export default ProductFilter;
