import React from 'react';

const ItemCard = ({item}) => {

  const [is_favorite, setIsFavorite] = React.useState(item.is_favorite);



    
  const handleFavoriteChange = async () => {
    
    if (window.logged_in){
      
      setIsFavorite(!is_favorite);

      try {
        const response = await fetch(window.setfavorite_url + `${item.id}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': getCookie('csrftoken'),  
          },
          body: new URLSearchParams({
            'is_favorite': !is_favorite,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update favorite status');
          
        }

        const data = await response.json();
        
        setIsFavorite(data.is_favorite)
        console.log('fav')
        console.log(data.is_favorite)

      } catch (error) {
        console.log(error.message);

      }

    }
    else{
      setIsFavorite(false)
      showLoginForm()
    }
  };

  function open_item(pk) {
    console.log('open request');
    window.location.href = window.item_view_url + `${pk}/` ;
  }



  return (
    <div key={item.id}  className="col-xl-3 col-6 p-0 p-sm-2 card" onClick={() => { window.location.href = window.item_view_url + `${item.id}/` }}>


    <li >
      <div className='product_image' style={{ backgroundImage: `url(${item.cover_image}.800x800_q85.jpg)` }}>


      <div className="favorite_btn" >
      <input 
        type="checkbox" id={`checkbox_${item.id}`}  
        className="favorite_btn_checkbox"
        checked={is_favorite} 
        onChange={(e) => {e.stopPropagation(); handleFavoriteChange();}}
        onClick={(e) => {e.stopPropagation(); handleFavoriteChange();}}
        />
      

        <label  htmlFor={`checkbox_${item.id}`} onClick={(e) => {e.stopPropagation();}}>
          <svg id="heart-svg" viewBox="467 392 58 57" >
            <g id="Group" fill="none" fillRule="evenodd" transform="translate(467 392)">
            
            
            <path d="M45.6776 21.1479C45.158 19.9448 44.4088 18.8546 43.4719 17.9383C42.5344 17.0192 41.4289 16.2889 40.2158 15.7869C38.9578 15.2643 37.6086 14.9969 36.2464 15C34.3354 15 32.4709 15.5233 30.8506 16.5118C30.4629 16.7483 30.0947 17.008 29.7458 17.291C29.3969 17.008 29.0287 16.7483 28.641 16.5118C27.0207 15.5233 25.1562 15 23.2452 15C21.8691 15 20.5356 15.2636 19.2758 15.7869C18.0586 16.2908 16.9616 17.0157 16.0197 17.9383C15.0816 18.8536 14.3322 19.944 13.814 21.1479C13.2752 22.4 13 23.7296 13 25.0979C13 26.3887 13.2636 27.7338 13.7869 29.1022C14.2249 30.2457 14.8529 31.4318 15.6553 32.6296C16.9267 34.5252 18.675 36.5021 20.8457 38.5062C24.443 41.8282 28.0053 44.123 28.1565 44.216L29.0752 44.8052C29.4822 45.0649 30.0055 45.0649 30.4125 44.8052L31.3312 44.216C31.4824 44.1191 35.0409 41.8282 38.642 38.5062C40.8127 36.5021 42.561 34.5252 43.8324 32.6296C44.6348 31.4318 45.2667 30.2457 45.7008 29.1022C46.2241 27.7338 46.4877 26.3887 46.4877 25.0979C46.4916 23.7296 46.2164 22.4 45.6776 21.1479Z" fill="#ffffff00" id="heart"/>

            
              <path d="M45.6776 21.1479C45.158 19.9448 44.4088 18.8546 43.4719 17.9383C42.5344 17.0192 41.4289 16.2889 40.2158 15.7869C38.9578 15.2643 37.6086 14.9969 36.2464 15C34.3354 15 32.4709 15.5233 30.8506 16.5118C30.4629 16.7483 30.0947 17.008 29.7458 17.291C29.3969 17.008 29.0287 16.7483 28.641 16.5118C27.0207 15.5233 25.1562 15 23.2452 15C21.8691 15 20.5356 15.2636 19.2758 15.7869C18.0586 16.2908 16.9616 17.0157 16.0197 17.9383C15.0816 18.8536 14.3322 19.944 13.814 21.1479C13.2752 22.4 13 23.7296 13 25.0979C13 26.3887 13.2636 27.7338 13.7869 29.1022C14.2249 30.2457 14.8529 31.4318 15.6553 32.6296C16.9267 34.5252 18.675 36.5021 20.8457 38.5062C24.443 41.8282 28.0053 44.123 28.1565 44.216L29.0752 44.8052C29.4822 45.0649 30.0055 45.0649 30.4125 44.8052L31.3312 44.216C31.4824 44.1191 35.0409 41.8282 38.642 38.5062C40.8127 36.5021 42.561 34.5252 43.8324 32.6296C44.6348 31.4318 45.2667 30.2457 45.7008 29.1022C46.2241 27.7338 46.4877 26.3887 46.4877 25.0979C46.4916 23.7296 46.2164 22.4 45.6776 21.1479ZM29.7458 41.739C29.7458 41.739 15.946 32.8971 15.946 25.0979C15.946 21.1479 19.2138 17.9461 23.2452 17.9461C26.0788 17.9461 28.5364 19.5276 29.7458 21.8379C30.9552 19.5276 33.4128 17.9461 36.2464 17.9461C40.2778 17.9461 43.5456 21.1479 43.5456 25.0979C43.5456 32.8971 29.7458 41.739 29.7458 41.739Z" fill="#FDFDFD" id="heart"/>

              <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5" />

              <g id="grp7" opacity="0" transform="translate(7 6)">
                <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
              </g>

              <g id="grp6" opacity="0" transform="translate(0 28)">
                <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
              </g>

              <g id="grp3" opacity="0" transform="translate(52 28)">
                <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
              </g>

              <g id="grp2" opacity="0" transform="translate(44 6)">
                <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
              </g>

              <g id="grp5" opacity="0" transform="translate(14 50)">
                <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
                <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
              </g>

              <g id="grp4" opacity="0" transform="translate(35 50)">
                <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
                <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
              </g>

              <g id="grp1" opacity="0" transform="translate(24)">
                <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
                <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
              </g></g>
          </svg>
        </label>
      </div>



      </div>
      <div className="product_details row ">
        
        <p className="price col-6">{item.first_offer_price}€ </p>

          {item.sold ? 
            <p className="col-6 text-end">Unavailable in store</p> : 
            <p className="col-6 text-end">Available in store</p>
          }
          

        <h3 className="col-12 mb-0">{item.name}  </h3>
        <p className="col-12">{item.product_name}</p>
        {item.sold ?
          <div className="col-6 d-none d-lg-flex pl-2 pr-2 button-wrap">
            <button className="btn custom_request_button button_view_1 col">Request Now</button>
          </div>
          :
          <div className="col-6 d-none d-lg-flex pl-2 pr-2 button-wrap">
            <button className="btn custom_request_button button_view_1 col">Custom Request</button>
          </div>


        }

        {!item.sold ?
          <div className="col-6 d-none d-lg-flex pl-2 pr-2 button-wrap">
            <button className="btn buy_now_button button_view_1 col"   onClick={(e) => {e.stopPropagation();   window.update_current_shops(item.online_shop) }}>Buy Now </button>
            
          </div> : null
        }

        
      </div>





    </li>
    </div>
  );
};


export default ItemCard;

