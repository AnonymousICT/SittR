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
        onSuccess: RENDER.renderPetDetails
    });
    $("#logout-btn").on("click", HTTP.onLogoutBtnClick);
    $("#pet-profile").on("click", "#edit-pet-btn", onEditPetBtnClick);
}

function onEditPetBtnClick(event) {
    event.preventDefault();
    window.open(`/pet/edit.html?id=${STATE.petId}`, "_self");
}
