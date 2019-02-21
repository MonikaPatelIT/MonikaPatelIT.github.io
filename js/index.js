(() => {
  "use strict";
  // Page is loaded
let headerSec= document.getElementById("header");
 headerSec.style.height  = window.innerHeight  + 'px' ;
  const lowerImage = document.querySelectorAll(".low_qua_Img");
  Array.from(lowerImage).map(item => {
    // Start loading image
    const img = new Image();
    img.src = item.dataset.src;

    // Once image is loaded replace the src of the HTML element
    img.onload = () => {
      //   item.classList.remove('headerImg');
      return item.nodeName === "IMG"
        ? (item.src = item.dataset.src)
        : (item.style.backgroundImage = `url(${item.dataset.src})`);
    };
  });
  const endpoint = "https://cpv2api.com/pens/popular/iammonikapatel"; // data files
  let pens = [];

  $.getJSON(endpoint, function(resp) {
    if (resp.success) {
      
      pens = [...resp.data]; // fetch json data into cities array
 
    }
  });
  const myPenCollection = document.querySelector("#pen-Gallary div");
  //document.addEventListener('DOMContentLoaded' ,drawPen );

  // `DOMContentLoaded` may fire before your script has a chance to run, so check before adding a listener
  window.addEventListener('scroll',drawPen, {once: true});
//  document.addEventListener("DOMContentLoaded", drawPen);

  function drawPen() {
     const innerPen = pens
      .map(pen => {
        let heartCount = pen.loves.replace(/[^0-9]/g, "").trim() ==="" ?0:pen.loves.replace(/[^0-9]/g, "").trim();
        let viewCount = pen.views.replace(/[^0-9]/g, "").trim() ==="" ?0:pen.views.replace(/[^0-9]/g, "").trim();
        let commentCount = pen.comments.replace(/[^0-9]/g, "").trim() ==="" ?0:pen.comments.replace(/[^0-9]/g, "").trim();

        return `
<div class='col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3 mt-3'>
        <div class="card">
          <a class="img-card" href=${pen.link} target="blank">
                            <img src=${pen.images.small} class="img-fluid" />
                          </a>
          <div class="card-content p-2 text-left">
            <h4 class="card-title ">
              ${pen.title}
            </h4>
            <p class="">
              ${
                pen.details
              }<a href=${pen.link} target="blank"> Read more
                                  </a>
            </p>
          </div>
          <div class="card-more text-center">
<ul class="list-inline m-1">
   <li class="list-inline-item"><span class="heartCount social-icon text-xs-center"><i class="fas fa-heart"></i> ${heartCount}</span></li>
   <li class="list-inline-item">  <span class="viewCount social-icon text-xs-center">  <i class="fas fa-eye"></i> ${viewCount} </span></li>
   <li class="list-inline-item"><span class="commentCount social-icon text-xs-center"> <i class="fas fa-comment-alt"></i>  ${commentCount}</span></li>
</ul></div>
        </div>
      </div>`;
      })
      .join("");

    myPenCollection.innerHTML = innerPen;
  }
})();