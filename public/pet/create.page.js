let STATE = {};
// All these modules are are defined in /public/utilities
const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;

$(document).ready(onReady);

function onReady() {
    STATE.authUser = CACHE.getAuthenticatedUserFromCache();

    $('#new-pet-form').on('submit', onCreateSubmit);
}

function onCreateSubmit(event) {
    event.preventDefault();
    const newPet = {
        petName: $('#petname-txt').val(),
        petType: $('#pettype-txt').val(),
        petBreed: $('#petbreed-txt').val(),
        petAge: $('#petage-txt').val(),
        petSize: $('#petsize-txt').val(),
        petWeight: $('#petweight-txt').val(),
        petActivityLevel: $('#petactivity-txt').val(),
        petIntact: $('#petintact-txt').val(),
        petDietRestrictions: $('#petdiet-txt').val(),
        petBehavior: {
            dogs: $('#behaviordogs').val(),
            cats: $('#behaviorcats').val(),
            children: $('#behaviorchildren').val(),
            miscPets: $('#behaviormiscpets').val(),
            other: $('#behaviorother').val()
        }
    };

    HTTP.createPet({
        jwtToken: STATE.authUser.jwtToken,
        newPet: newPet,
        onSuccess: pet => {
            alert('Pet has been added to your profile! redirecting...');
            window.open('/', '_self');
            // window.open(`/pet/detail.html?=id${pet.id}`, '_self');
        },
        onError: err=> {
            alert('Internal Server Error (see console)');
            console.error(err);
        }
    })
}


// function createPet(options) {
//     const {jwtToken, newPet, onSuccess, onError } = options;
//     $.ajax({
//         type: 'POST',
//         url: '/api/pet',
//         contentType: 'application/json',
//         dataType: 'json',
//         data: JSON.stringify(newPet),
//         beforeSend: function(xhr) {
//             xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
//         },
//         success: onSuccess,
//         error: err => {
//             console.error(err);
//             if (onError) {
//                 onError();
//             }
//         }
//     })
// }