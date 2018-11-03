let STATE = {};
// All these modules are are defined in /public/utilities
const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;

$(document).ready(onReady);

function onReady() {
    STATE.authUser = CACHE.getAuthenticatedUserFromCache();

    $("#logout-btn").on("click", HTTP.onLogoutBtnClick);
    $("#new-pet-form").on("submit", onCreateSubmit);
}

function onCreateSubmit(event) {
    event.preventDefault();
    const newPet = {
        petName: $("#petname-txt").val(),
        petType: $("#pettype-txt").val(),
        petBreed: $("#petbreed-txt").val(),
        petAge: $("#petage-txt").val(),
        petSize: $("#petsize-txt").val(),
        petWeight: $("#petweight-txt").val(),
        petActivityLevel: $("#petactivity-txt").val(),
        petIntact: $("#petintact-txt").val(),
        petDietRestrictions: $("#petdiet-txt").val(),
        petBehavior: {
            dogs: $("#behaviordogs").val(),
            cats: $("#behaviorcats").val(),
            children: $("#behaviorchildren").val(),
            miscPets: $("#behaviormiscpets").val(),
            other: $("#behaviorother").val()
        }
    };

    HTTP.createPet({
        jwtToken: STATE.authUser.jwtToken,
        newPet: newPet,
        onSuccess: pet => {
            alert("Pet has been added to your profile! redirecting...");
            window.open("../profile/detail.html", "_self");
        },
        onError: err => {
            alert("Internal Server Error (see console)");
            console.error(err);
        }
    });
}
