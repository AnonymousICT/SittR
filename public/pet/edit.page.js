let STATE = {};
// All these modules are are defined in /public/utilities
const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;
const ETC = window.ETC_MODULE;

$(document).ready(onReady);

function onReady() {
    HTTP.updateAuthenticatedUI();
    STATE.petId = ETC.getQueryStringParam("id");
    STATE.authUser = CACHE.getAuthenticatedUserFromCache();

    HTTP.getPetById({
        petId: STATE.petId,
        onSuccess: RENDER.renderEditablePet
    });
    $("#logout-btn").on("click", HTTP.onLogoutBtnClick);
    $("#pet-edit-form").on("submit", onEditSubmit);
}

function onEditSubmit(event) {
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

    HTTP.updatePet({
        petId: STATE.petId,
        newPet: newPet,
        jwtToken: STATE.authUser.jwtToken,
        onSuccess: pet => {
            alert("pet changes saved succesfully, redirecting ...");
            window.open(`/pet/detail.html?id=${STATE.petId}`, "_self");
        },
        onError: err => {
            alert(
                "There was a problem editing this pet, please try again later."
            );
        }
    });
}
