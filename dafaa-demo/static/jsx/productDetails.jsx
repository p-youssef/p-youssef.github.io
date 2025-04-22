import React from 'react';
import ReactDOM from 'react-dom/client';

import ItemOnlineShop from './ItemOnlineShop';

const ProductDetails = () => {
  const colors = React.useState(window.item_colors);
  const alert_base_classes = 'col-20 col-md-8 alert fade show';
  const [is_favorite, setIsFavorite] = React.useState(window.item_is_favorite);
  const [storesWidgetView, setStoresWidgetView] = React.useState(false);
  
  function send_order() {
    // Create a FormData object from the form
    const formData = new FormData(document.getElementById('order-form'));
    

    fetch(window.add_order_url, {
        method: 'POST',
        headers: {
            // CSRF token for Django
            'X-CSRFToken': csrftoken,
            // Do not set Content-Type, the browser will set it automatically for FormData
        },
        body: formData  // FormData handles multipart encoding
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Display success message
            Notifications_Container.innerHTML = `
                
                <div class="${alert_base_classes} alert-${data.status}">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    
                    <h5>${data.message_title}</h5>
                    <p>${data.message_body}</p>
                    
                </div>
            `;
        } else {
            // Handle error message
            var errorMessage = `
                <div class="${alert_base_classes} alert-danger">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                `
            for (const [field, errors] of Object.entries(data.message)) {
                
                errors.forEach(error => {
                    errorMessage += `<p><strong>${field}:</strong> ${error}</p>`;
                });
            }
            errorMessage += '</div>`'
            Notifications_Container.innerHTML += errorMessage;
            console.error(data.message);
        }
    })
    .catch(error => {

        Notifications_Container.innerHTML += `
        <div class="${alert_base_classes} alert-danger">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <p>${get_userFriendlyMessage(error)}</p>
        </div>
                `

        });
    }


    const handleFavoriteChange = async () => {
    
        if (window.logged_in){
          
          setIsFavorite(!is_favorite);
    
          try {
            const response = await fetch(window.setfavorite_url + `${window.item_id}/`, {
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
    

        const getFaviconLink = (url) => {
          const Flink = new URL(url).hostname ;
          return `https://${Flink}/favicon.ico`;
        };
      

        function handleClickStoresWidget(event) {
          // Check if the click was directly on the div
          if (event.target === event.currentTarget) {
            setStoresWidgetView(false)
          }
        }
      
        const phone_code_field = React.useRef(null);
        const phone_number_field = React.useRef(null);
      
        const handlePhoneNumberChange = (e, nextInputRef) => {
          if (e.target.value.length >= 3) {
            nextInputRef.current.focus(); // Move focus to the next input
          }
        };
        console.log(colors)
    return(

        <div>
            
            <h4>{ window.item_product_category }</h4>
            <h1>{ window.item_name }</h1>
            <hr></hr>
            <h4 className="colors_div">Color: 
            <ul  className="color_view_list">
            {colors.map((colorArray, index) => {
                // Check if the current item is a valid array
                if (Array.isArray(colorArray) && colorArray.length > 0) {
                  return (
                    <div key={index} className="d-flex">
                      {colorArray.map((colorV, colorIndex) => (
                        <li key={colorIndex} className="color_view" style={{ backgroundColor: colorV }}>

                        </li>
                      ))}
                    </div>
                  );
                }
                return null; // If the item is null, skip rendering
              })}
            </ul>
            </h4>
            <hr></hr>
            <h3>Size: {window.item_width} x { window.item_height } x { window.item_length } Cm</h3>
            <h3>Material: {window.item_material}</h3>
            <h4>{window.item_note}</h4>
            <hr></hr>
            <h1>{ window.item_first_offer_price }€</h1>
            <hr></hr>
            <div className="d-flex item_actions">{/** actions */}
            {window.item_sold ?
                <button className="btn custom_request_button button_view_1" data-toggle="modal" data-target="#custom_request">Request Now</button>
            
            :
            
                <button className="btn custom_request_button button_view_1" data-toggle="modal" data-target="#custom_request">Custom Request</button>
            
            }

            {!window.item_sold ?
                <button className="btn buy_now_button button_view_1"  data-toggle="modal" data-target="#item_stores_window">Buy Now </button>
             : null
            }

            <input 
                type="checkbox" id={`checkbox_${window.item_id}`}  
                className="favorite_btn_checkbox"
                checked={is_favorite} 
                onChange={() => { handleFavoriteChange();}} 
            />
      
            <label className="favorite_button" htmlFor={`checkbox_${window.item_id}`}>
                <svg id="heart-svg" viewBox="467 392 58 57" >
                    <g id="Group" fill="none" fillRule="evenodd" transform="translate(467 392)">
                    
                    
                    <path d="M45.6776 21.1479C45.158 19.9448 44.4088 18.8546 43.4719 17.9383C42.5344 17.0192 41.4289 16.2889 40.2158 15.7869C38.9578 15.2643 37.6086 14.9969 36.2464 15C34.3354 15 32.4709 15.5233 30.8506 16.5118C30.4629 16.7483 30.0947 17.008 29.7458 17.291C29.3969 17.008 29.0287 16.7483 28.641 16.5118C27.0207 15.5233 25.1562 15 23.2452 15C21.8691 15 20.5356 15.2636 19.2758 15.7869C18.0586 16.2908 16.9616 17.0157 16.0197 17.9383C15.0816 18.8536 14.3322 19.944 13.814 21.1479C13.2752 22.4 13 23.7296 13 25.0979C13 26.3887 13.2636 27.7338 13.7869 29.1022C14.2249 30.2457 14.8529 31.4318 15.6553 32.6296C16.9267 34.5252 18.675 36.5021 20.8457 38.5062C24.443 41.8282 28.0053 44.123 28.1565 44.216L29.0752 44.8052C29.4822 45.0649 30.0055 45.0649 30.4125 44.8052L31.3312 44.216C31.4824 44.1191 35.0409 41.8282 38.642 38.5062C40.8127 36.5021 42.561 34.5252 43.8324 32.6296C44.6348 31.4318 45.2667 30.2457 45.7008 29.1022C46.2241 27.7338 46.4877 26.3887 46.4877 25.0979C46.4916 23.7296 46.2164 22.4 45.6776 21.1479Z" fill="#ffffff00" id="heart"/>

                    
                    <path d="M45.6776 21.1479C45.158 19.9448 44.4088 18.8546 43.4719 17.9383C42.5344 17.0192 41.4289 16.2889 40.2158 15.7869C38.9578 15.2643 37.6086 14.9969 36.2464 15C34.3354 15 32.4709 15.5233 30.8506 16.5118C30.4629 16.7483 30.0947 17.008 29.7458 17.291C29.3969 17.008 29.0287 16.7483 28.641 16.5118C27.0207 15.5233 25.1562 15 23.2452 15C21.8691 15 20.5356 15.2636 19.2758 15.7869C18.0586 16.2908 16.9616 17.0157 16.0197 17.9383C15.0816 18.8536 14.3322 19.944 13.814 21.1479C13.2752 22.4 13 23.7296 13 25.0979C13 26.3887 13.2636 27.7338 13.7869 29.1022C14.2249 30.2457 14.8529 31.4318 15.6553 32.6296C16.9267 34.5252 18.675 36.5021 20.8457 38.5062C24.443 41.8282 28.0053 44.123 28.1565 44.216L29.0752 44.8052C29.4822 45.0649 30.0055 45.0649 30.4125 44.8052L31.3312 44.216C31.4824 44.1191 35.0409 41.8282 38.642 38.5062C40.8127 36.5021 42.561 34.5252 43.8324 32.6296C44.6348 31.4318 45.2667 30.2457 45.7008 29.1022C46.2241 27.7338 46.4877 26.3887 46.4877 25.0979C46.4916 23.7296 46.2164 22.4 45.6776 21.1479ZM29.7458 41.739C29.7458 41.739 15.946 32.8971 15.946 25.0979C15.946 21.1479 19.2138 17.9461 23.2452 17.9461C26.0788 17.9461 28.5364 19.5276 29.7458 21.8379C30.9552 19.5276 33.4128 17.9461 36.2464 17.9461C40.2778 17.9461 43.5456 21.1479 43.5456 25.0979C43.5456 32.8971 29.7458 41.739 29.7458 41.739Z" fill="#CC5D39" id="heart"/>

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
            <div className={`item_stores_window ${storesWidgetView ? 'active' : ''}`} onClick={handleClickStoresWidget}>
              <div className="item_stores_widget">
                <div className="title">
                  <h2>Available On</h2>
                  <button type="button" className="close" onClick={()=>{ setStoresWidgetView(false)  }} data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                {Object.entries(window.item_online_shop).map(([shop, url]) => (
                  <a target="_blank" key={shop} className="shop_button btn" href={url}>
                    
                    <div  className="favicon_container" style={{ backgroundImage: `url(${ getFaviconLink(url)})` }}></div>
                    
                    <p >{shop} </p>
                  </a>
                  
                ))}

                

              </div>
            </div>

                
                <ItemOnlineShop item_online_shops = {window.item_online_shop}  />

            <div className="modal fade" id="custom_request" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">please enter your contact info <br></br>so we can reach you </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form method="POST" className="modal-body row" id="order-form">
                    <div id="phone_number_complex" className="col-md-6 d-flex">
                      <p className="plus_sign">+</p>
                      <input name="phone_number_code" id="id_phone_number_code" ref={phone_code_field} placeholder="39" maxLength="3" onChange={(e) => handlePhoneNumberChange(e, phone_number_field)} type="text"></input>
                      <input ref={phone_number_field} type="text" placeholder="Phone Number" name="phone_number" id="id_phone_number"></input>  
                    </div>
                    <input type="email" name="email" id="id_email" placeholder="Email" className="col-md-6 mt-4 mt-md-0"></input>

                    <input type="hidden" value={window.item_id} name="item_referance" id="id_item_referance" ></input>
                    
                    <textarea   name="note"  required id="id_note" placeholder="Additional Notes" className="col-12" rows="5"></textarea>
                    
                  </form>
                  <div className="modal-footer">
                    
                    <button type="button" onClick={() => {send_order()}} className="btn button_view_1" >Submit Order</button>
                  </div>
                </div>
              </div>
            </div>

            </div>
        </div>
    );
}  

const product_details = document.getElementById('product_details');
if (product_details !== null) {
const root = ReactDOM.createRoot(product_details);
// Render the component using PascalCase
root.render(<ProductDetails></ProductDetails>);
}

