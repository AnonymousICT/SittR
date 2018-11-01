let STATE = {};
// All these modules are are defined in /public/utilities
const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;

$(document).ready(onPageLoad);

function onPageLoad() {
    updateAuthenticatedUI();
    $('#logout-btn').on('click', HTTP.onLogoutBtnClick);

}

function updateAuthenticatedUI() {
    const authUser = CACHE.getAuthenticatedUserFromCache();
    if (authUser) {
        STATE.authUser = authUser;
        $('#nav-greeting').html(`Welcome, ${authUser.name}`);
        $('.user-profile').html(`<li class="user-profile"><a href="/profile/detail.html">${authUser.name}'s profile</a></li>`);
        $('#auth-menu').removeAttr('hidden');
    } else {
        $('#default-menu').removeAttr('hidden');
    }
}