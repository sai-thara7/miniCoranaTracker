let indiaApi = [];
let str = "";
let input = document.querySelector(".input");
let initial = document.querySelectorAll(".initial");
let listCont = document.querySelector(".listCont");
function getData() {

    let urlIndia = " https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true";
    // fetch api
    fetch(urlIndia)
        .then(responsePro => responsePro.json()) //store data in indiaApi
        .then(function (data) {
            indiaApi.push(...data["regionData"]);
        }).catch(error=>{
            console.error("error :"+error);
        });
        

}

function search(Api, key) {
    let patter = new RegExp(key, 'gi');

    keyEle = indiaApi.filter(function (ele) {
        if (ele.region.match(patter))
            return ele;
    });
    console.log(keyEle);

    return keyEle;
}

function display(lItems) {
    // initial.classList.add("hidden");

    str = "";
    let pattern = new RegExp(input.value, 'gi');
    lItems.forEach(element => {

        region = element.region.replace(pattern, `<span class="highlight">${input.value}</span>`);
        str = str + `<li class="listitem"><p>${region} </p><span class="activeCS" >${element.activeCases}</span><span class="recoveredcs hidden">${element.recovered}</span></li>`
    });

    

    listCont.innerHTML = str;

}
document.querySelector('#recoveredRad').addEventListener('click',()=>{
    console.log("click");
document.documentElement.style.setProperty('--dispActive','none');
document.documentElement.style.setProperty('--dispRecovered','flex');
});
document.querySelector('#activeRad').addEventListener('click',()=>{
    console.log("click");
document.documentElement.style.setProperty('--dispActive','flex');
document.documentElement.style.setProperty('--dispRecovered','none');
});




input.addEventListener("keyup", function () {
    searchedEle = search(indiaApi, input.value)
    //    console.log(sea);
    display(searchedEle)

});
input.addEventListener("click", () => { document.documentElement.style.setProperty('--disp', 'none') });
input.addEventListener("blur", () => {


    if (input.value.length == 0)
        document.documentElement.style.setProperty('--disp', 'flex')
});
getData();


