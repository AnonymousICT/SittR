const CACHE_MODULE = {
    getAuthenticatedUserFromCache,
    saveAuthenticatedUserIntoCache,
    deleteAuthenticatedUserFromCache
};

window.CACHE_MODULE = CACHE_MODULE;

function getAuthenticatedUserFromCache() {
    const jwtToken = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("userid");
    const username = localStorage.getItem("username");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const pets = localStorage.getItem("pets").split(",");

    if (jwtToken) {
        return {
            jwtToken,
            userId,
            username,
            name,
            email,
            pets
        };
    } else {
        return undefined;
    }
}

function saveAuthenticatedUserIntoCache(user) {
    localStorage.setItem("jwtToken", user.jwtToken);
    localStorage.setItem("userid", user.id);
    localStorage.setItem("username", user.username);
    localStorage.setItem("name", user.name);
    localStorage.setItem("email", user.email);
    localStorage.setItem("pets", user.pets);
}

function deleteAuthenticatedUserFromCache() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("pets");
}

