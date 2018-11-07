let STATE = {};
const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;
const ETC = window.ETC_MODULE;

$(document).ready(onReady);

function onReady() {
    HTTP.updateAuthenticatedUI();
    STATE.visitId = ETC.getQueryStringParam("id");
    STATE.authUser = CACHE.getAuthenticatedUserFromCache();

    HTTP.getVisitById({
        visitId: STATE.visitId,
        onSuccess: RENDER.renderVisitEdit
    });
    $("#logout-btn").on("click", HTTP.onLogoutBtnClick);
    $("#edit-visit-form").on("submit", onEditVisitSubmit);
}

function onEditVisitSubmit(event) {
    event.preventDefault();
    const newVisit = {
        visitDateStart: $("#date-start-txt").val(),
        visitDateEnd: $("#date-end-txt").val(),
        visitLocation: $("#location-txt").val(),
        visitPrice: $("#visit-price").val(),
        visitCareInstructions: $("#care-instructions").val(),
        visitSummary: $("#visit-summary").val()
    };

    HTTP.updateVisit({
        jwtToken: STATE.authUser.jwtToken,
        visitId: STATE.visitId,
        newVisit: newVisit,
        onSuccess: visit => {
            alert("visit changes saved successfuly, redirecting...");
            window.open(`/visit/detail.html?id=${STATE.visitId}`, "_self");
        },
        onError: err => {
            console.log(
                "There was a problem editing this visit, please try again later."
            );
            alert(
                "There was a problem editing this visit, please try again later."
            );
        }
    })
}