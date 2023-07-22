let cardsCon = document.querySelector('.cards-con');
let loader = document.querySelector('.loader1');
let sorryCon = document.querySelector('.sorry');
let pageCon = document.querySelector('.page');
let userValue = document.querySelector('#userSearch');
let head = document.querySelector('.itemHead');
let look = document.querySelector('.looking');


let currentPage = 1;
const productItems = 20; 


// DATA RENDERING
async function pageLoad(page){
    loader.style.display = "flex";
    // look.style.display = "none";

    // currentPage = page;
    cardsCon.innerHTML = "";

    let startIndex = (page - 1) * productItems;
    let endIndex = startIndex + productItems;

    // https://dummyjson.com/products?limit=0
    fetch(`https://dummyjson.com/products?limit=0`)
        .then(res => res.json())
        .then((json) => {
            
            let products = json.products.slice(startIndex, endIndex);
            // let products = json.products;
            console.log(products)
            
            head.style.display = "block";
            for(var i = 0; i < products.length; i++) {
                let dataObj = products[i]
                // let {image, title, description, price} = dataObj;
                let {thumbnail, title, description, price, rating} = dataObj;
                let {rate} = dataObj.rating;
                // <p class="rating">${rate}</p>
                // <img src="${image}" alt="" class="card-image">

                
                let card = `
                <div class="cards">
                <p class="rating">${Math.round(rating)}</p>
                <div class="card-img-con">
                <img src="${thumbnail}" alt="" class="card-image">
                </div>
                <div class="details">
                <span>
                <h2 class="det-name">${title.slice(0, 20)}...</h2>
                <p class="det-con">${description.slice(0, 40)}...</p>
                </span>
                <div class="button">
                <h3 class="det-price">${Math.round(price)}$</h3>
                <button class="det-but">+</button>
                </div>
                </div>
                </div>`
                
                cardsCon.innerHTML += card;
            }
            
            loader.style.display = "none";
            cardsCon.style.display = "flex";
            pageCon.style.display = "flex"
            
        })
        .catch((error) => {
            console.log('Network error:', error);
        });

    setTimeout(function(){
        if(cardsCon.innerHTML === ""){
            sorryCon.style.visibility = "visible";
        }
    }, 3000)
}
    

// SEARCH FILTER
async function searchItem(){
    look.style.display = "none";

    let matchFound = false;
    cardsCon.innerHTML = ""
    loader.style.display = "flex";
    pageCon.style.display = "none"
    
    let userSearch = userValue.value.toLowerCase()
    // await fetch(`https://fakestoreapi.com/products`)
    await fetch(`https://dummyjson.com/products/search?limit=0&q=${userSearch}`)
        .then(res => res.json())
        .then((json) => {
            // let userSearch = userValue.value.toLowerCase()


            console.log(json.products)

            loader.style.display = "none";
            head.innerHTML = "Search Results:"

            let dataObj1 = json.products;
            // let {rate} = dataObj.rating;
            
            for(var i = 0; i < dataObj1.length; i++){
                matchFound = true;
                let dataObj = dataObj1[i];
                let {thumbnail, title, description, price, rating} = dataObj;
                console.log(dataObj)
                let card = `
                <div class="cards">
                <p class="rating">${rating}</p>
                <div class="card-img-con">
                <img src="${thumbnail}" alt="" class="card-image">
                </div>
                <div class="details">
                <span>
                <h2 class="det-name">${title.slice(0, 20)}...</h2>
                <p class="det-con">${description.slice(0, 40)}...</p>
                </span>
                <div class="button">
                <h3 class="det-price">${Math.round(price)}$</h3>
                <button class="det-but">+</button>
                </div>
                </div>
                </div>`
                
                cardsCon.innerHTML += card;
            }
                


        //     json.forEach(items => {
        //         let itemsName = items.title.toLowerCase()
        //         if(itemsName.includes(userSearch)){
        //             matchFound = true;
        //             loader.style.display = "none";
        //             head.innerHTML = "Search Results:"
        //             // console.log(itemsName)
        //             // console.log(userSearch)
        //             // console.log("HELLo")

        //             let dataObj = items
        //             let {image, title, description, price} = dataObj;
        //             let {rate} = dataObj.rating;
                    
        //             let card = `
        //             <div class="cards">
        //             <p class="rating">${rate}</p>
        //             <div class="card-img-con">
        //             <img src="${image}" alt="" class="card-image">
        //             </div>
        //             <div class="details">
        //             <span>
        //             <h2 class="det-name">${title.slice(0, 20)}...</h2>
        //             <p class="det-con">${description.slice(0, 40)}...</p>
        //             </span>
        //             <div class="button">
        //             <h3 class="det-price">${Math.round(price)}$</h3>
        //             <button class="det-but">+</button>
        //             </div>
        //             </div>
        //             </div>`
                    
        //             cardsCon.innerHTML += card;
        //         }
        //     })
            if(matchFound === false){
                head.innerHTML = `No Search Results Found`
                look.style.display = "flex";
                // console.log("WHY")
                pageLoad(1);
            }
        })   
        .catch((error) => {
            console.log('Network error:', error);
        });

    setTimeout(function () {
        if(cardsCon.innerHTML === ""){
            sorryCon.style.visibility = "visible";
        }
    }, 3000)    
}


// CATERGORY NAMES 
// fetch('https://fakestoreapi.com/products/categories')
fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(categories => {
        let dropdownMenu = document.querySelector('.dropdown-menu');
        console.log(categories)
        categories.map((items, index) => {
            let itemFSlice = items.charAt(0).toUpperCase()
            let itemRSlice = items.slice(1)
            let categoryItem = [itemFSlice, itemRSlice].join('');
            let categoryCon = `<a class="dropdown-item" href="#" onclick="searchFilter(this)">${categoryItem}</a>`;
            dropdownMenu.innerHTML += categoryCon;
        })    
        })
    .catch((error) => {
        console.log('Network error:', error);
    });


// CATEGORY FILTER
function searchFilter (categoryName) {
    cardsCon.innerHTML = "";
    loader.style.display = "flex";
    pageCon.style.display = "none";
    look.style.display = "none";

    
    let cateName = categoryName.innerHTML.toLowerCase()
    // fetch(`https://fakestoreapi.com/products/category/${cateName}`)
    fetch(`https://dummyjson.com/products/category/${cateName}`)
        .then(res => res.json())
        .then(json => {
            head.innerHTML = categoryName.innerHTML.toUpperCase() + ":";
            // console.log(json.products)
            json = json.products
            console.log(json)
            json.forEach(cateObj => {
                // console.log(cateObj)
                // let {image, title, description, price} = cateObj;
                let {thumbnail, title, description, price, rating} = cateObj;
                // let {rate} = cateObj.rating;
                // <img src="${image}" alt="" class="card-image">
                // <p class="rating">${rate}</p>

                let card = `
                    <div class="cards">
                    <p class="rating">${rating}</p>
                    <div class="card-img-con">
                    <img src="${thumbnail}" alt="" class="card-image">
                    </div>
                    <div class="details">
                    <span>
                    <h2 class="det-name">${title.slice(0, 20)}...</h2>
                    <p class="det-con">${description.slice(0, 40)}...</p>
                    </span>
                    <div class="button">
                    <h3 class="det-price">${Math.round(price)}$</h3>
                    <button class="det-but">+</button>
                    </div>
                    </div>
                    </div>`
                
                cardsCon.innerHTML += card;
                
                loader.style.display = "none";
                cardsCon.style.display = "flex";
            });
        })
        .catch((error) => {
            console.log('Network error:', error);
        });

    setTimeout(function () {
        if(cardsCon.innerHTML === ""){
            sorryCon.style.visibility = "visible";
        }
    }, 3000)
}


setTimeout(function(){
    if(cardsCon.innerHTML === ""){
        sorryCon.style.visibility = "visible";
        sorryCon.innerHTML = "Check your Internet Connection.";
    }
}, 10000)

// setTimeout(function(){
//     if(cardsCon.innerHTML === ""){
//         location.href = "index.html"
//     }
// }, 15000)

pageLoad(currentPage)

// let item = "electronics"
// console.log(item.charAt(0).toUpperCase())

// fetch('https://dummyjson.com/products?limit=0')
// .then(res => res.json())
// .then(console.log);