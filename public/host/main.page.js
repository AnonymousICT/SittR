let STATE = {}
const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;
const ETC = window.ETC_MODULE;

$(document).ready(onReady);

function onReady() {
    HTTP.getAllVisits({
        onSuccess: RENDER.renderAllVisits
    })
    $("#logout-btn").on("click", HTTP.onLogoutBtnClick);
    $("#visit-list").on("click", ".visit-card", onVisitCardClick)
}

function onVisitCardClick(event) {
    const visitId =$(event.currentTarget).attr("data-visit-id");
    window.open(`/visit/detail.html?id=${visitId}`, "_self");
}