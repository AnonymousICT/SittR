let STATE = {};
const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;
const ETC = window.ETC_MODULE;

$(document).ready(onReady);

function onReady() {
    HTTP.updateAuthenticatedUI();
    STATE.vetId = ETC.getQueryStringParam("id");
    STATE.authUser = CACHE.getAuthenticatedUserFromCache();

    HTTP.getVetById({
        vetId: STATE.vetId,
        onSuccess: RENDER.renderVetEdit
    });
    $("#logout-btn").on("click", HTTP.onLogoutBtnClick);
    $("#vet-edit-form").on("submit", onEditVetSubmit);
    
}

function onEditVetSubmit(event) {
    event.preventDefault();
    const newVet = {
        vetName: $("#vetname-txt").val(),
        vetAddress: $("#vetaddress-txt").val(),
        vetPhone: $("#vetphone-txt").val()
    };

    HTTP.updateVet({
        jwtToken: STATE.authUser.jwtToken,
        vetId: STATE.vetId,
        newVet: newVet,
        onSuccess: vet => {
            alert("vet changes saved successfuly, redirecting...");
            window.open(`/profile.html`, "_self");
        },
        onError: err => {
            console.log(
                "There was a problem editing this vet, please try again later."
            );
            alert(
                "There was a problem editing this vet, please try again later."
            );
        }
    });
}
