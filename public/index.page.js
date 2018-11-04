let STATE = {};
// All these modules are are defined in /public/utilities
const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;
const ETC = window.ETC_MODULE;

$(document).ready(onPageLoad);

function onPageLoad() {
    updateAuthenticatedUI();
    if (STATE.authUser) {
        // HTTP.getUserVisits({
        //     jwtToken: STATE.authUser.jwtToken,
        //     onSuccess: RENDER.renderVisits
        // });
    }

    $("#logout-btn").on("click", HTTP.onLogoutBtnClick);
    // $("#visit-list").on("click", ".visit-card", onVisitCardClick)
    // $("#visit-list").on("click", "#delete-visit", deleteVisitBtnClick)
}

function updateAuthenticatedUI() {
    const authUser = CACHE.getAuthenticatedUserFromCache();
    if (authUser) {
        STATE.authUser = authUser;
        $("#nav-greeting").html(`Welcome, ${authUser.name}`);
        $(".user-profile").html(
            `<li class="user-profile"><a href="/profile/detail.html">${
                authUser.name
            }'s profile</a></li>`
        );
        $("#auth-menu").removeAttr("hidden");
        $("#visit-list").removeAttr("hidden");
    } else {
        $("#default-menu").removeAttr("hidden");
    }
}

// function onVisitCardClick() {
//     const visitId =$(event.currentTarget).attr("data-visit-id");
//     console.log(visitId)
//     // window.open(`/visit/detail.html?id${visitId}`, "_self");
// }

// function deleteVisitBtnClick() {
//     event.stopImmediatePropagation();
//     const visitId = $(event.currentTarget)
//         .closest(".visit-card")
//         .attr("data-visit-id");

//     console.log('poop');
// }