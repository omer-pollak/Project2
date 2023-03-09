const url = "https://api.coingecko.com/api/v3/coins/list";
const moreInfoUrl = "https://api.coingecko.com/api/v3/coins/";

//empty array for coins
let  displayCoins= [];

$(async () => {
  displayCoins = await $.get(url);
  getData(displayCoins);
});

// FUNCTION fetchCoins GETS THE COINS FROM THE API
const fetchCoins = async () => {
  return new Promise((resolve, reject) => {
    $.get({
      url: moreInfoUrl,
      success: (data) => {
        resolve(data)
      },
      error: (error) => {
        reject(error)
      },
    })
  })
}

const getData = (data) => {
  $("#coins").html("");
  for (let counter = 0; counter < 100; counter++) {
    let randomIndex = Math.floor(Math.random() * data.length);
    displayCoins.push(data[counter]);
    let coin = data[randomIndex];
    let targetId = `coin-${counter}`;
    $("#coins").append(`
    <div class="card border-warning text-warning bg-transparent ">
      <div class="card-header border-warning d-flex justify-content-between">
        ${coin.symbol}
        <div class="form-check form-switch d-inline-block m-1 p-0">
          <input class="form-check-input checkbox-${coin.name}" id ="" type="checkbox"/>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">${coin.name}</h5>
      </div>
      <div class="card-footer bg-transparent">
        <button type="button" class="btn btn-warning moreInfo" data-bs-toggle="collapse" 
        data-bs-target="#${targetId}" aria-expanded="false" aria-controls="${targetId}">More Info</button>
        <div class="collapse" id="${targetId}">
        </div>
      </div>
    </div>`);
  }
};
