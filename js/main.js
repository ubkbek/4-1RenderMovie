// Select elements from DOM
var elList = document.querySelector("#movie_list");
var elSearchResultNum = document.querySelector("#search-result-number");
var elForm = document.querySelector("#form");
var elInputValue = document.querySelector("#input");
var elRating = document.querySelector("#movie-rating");
var elCategorySelect = document.querySelector("#category-select");
var elTempaleCard = document.querySelector("#template-card").content;


// Get movies
let slicedMovies = movies.slice(0, 100);


// get Normolized movies
var normolizedMovieList = slicedMovies.map(movieItem => {
    return {
        title: movieItem.Title.toString(),
        categories: movieItem.Categories,
        rating: movieItem.imdb_rating,
        year: movieItem.movie_year,
        imageLink: `https://i.ytimg.com/vi/${movieItem.ytid}/mqdefault.jpg`,
        youtubeLink: `https://www.youtube.com/watch?v=${movieItem.ytid}`
    }
})


// create categories

let categoryList = [];

normolizedMovieList.forEach(item => {
    var newArr = item.categories.split("|");
    newArr.forEach(item => {
        if(!categoryList.includes(item)) categoryList.push(item)
    });
});

categoryList.sort();


// generate categories
function generateMovies(movieArray){
    let categoryFragment = document.createDocumentFragment();

    movieArray.forEach(function(item){
        let categoryOption = document.createElement("option");
        categoryOption.value = item;
        categoryOption.textContent = item;
        categoryFragment.appendChild(categoryOption)
    })

    elCategorySelect.appendChild(categoryFragment)

}

generateMovies(categoryList)





// elSearchResultNum.textContent = normolizedMovieList.length

// event submit
// elForm.addEventListener("submit", function(evt){
//     evt.preventDefault();

//     let movieRating = elRating.value.trim();

//     let filteredArray = normolizedMovieList.filter(function(item){
//         return item.rating > movieRating
//     })

//     elSearchResultNum.textContent = filteredArray.length
//     renderMovies(filteredArray, elList)
// })

// event submit rating
// elForm.addEventListener("submit", function(evt){
//     evt.preventDefault();

//     // let movieRating = elRating.value.trim();
//     var inputValue = elInputValue.trim().toLowerCase();

//     let filteredArray = normolizedMovieList.filter(function(item){
//         return item.title.includes(inputValue);
//     })
//     elSearchResultNum.textContent = filteredArray.length
//     renderMovies(filteredArray, elList)
//     console.log(filteredArray);
// })


// elForm.addEventListener("input", function(evt){
//     evt.preventDefault();

//     var searchInput = elInputValue.value.trim().toLowerCase()


//     var searchedMovies = normolizedMovieList.filter(function(item){
//         return item.title.toLowerCase().includes(searchInput)
//     })

//     renderMovies(searchedMovies, elList)
// })




// elForm.addEventListener("submit", function(evt){
//     evt.preventDefault();

//     var selectOption = elCategorySelect.value;
//     let categotisedMovies = [];

//     if (selectOption === "All") {
//         return categotisedMovies = normolizedMovieList;
//     }
//     else{
//         var categotisedMovies = normolizedMovieList.filter (function(item){
//             return item.categories.split("|").includes(selectOption);
//         })
//     }



elForm.addEventListener("submit", function(evt){
    evt.preventDefault();

    var selectOption = elCategorySelect.value;

    let categotisedMovies = [];

    if(selectOption === "all"){
        categotisedMovies = normolizedMovieList
    }
    else{
        categotisedMovies = normolizedMovieList.filter(function(item){
            return item.categories.includes(selectOption)
        })
    }

    renderMovies(categotisedMovies, elList)
})

// create render function
function renderMovies(array, place){
    place.innerHTML = null;

    let elFragment = document.createDocumentFragment()

    array.forEach(item => {
        let newDiv = elTempaleCard.cloneNode(true);//get clone from template

        newDiv.querySelector("#card-img").src = item.imageLink;
        newDiv.querySelector(".card-title").textContent = item.title;
        newDiv.querySelector(".movie-category").textContent = item.categories.split("|").join(", ");
        newDiv.querySelector(".movie-year").textContent = item.year;
        newDiv.querySelector(".movie-rating").textContent = item.rating;
        newDiv.querySelector(".movie-youtube-link").href = item.youtubeLink;

        elFragment.appendChild(newDiv);
    });

    place.appendChild(elFragment)
    elSearchResultNum.textContent = array.length
}
