const HTTP_MODULE = {
    signupUser,
    loginUser,
    getUserPets,
    getPetById,
    createPet,
    updatePet,
    deletePet,
    getUserVet,
    getVetById,
    createVet,
    updateVet,
    deleteVet,
    getUserVisits,
    getVisitById,
    createVisit,
    updateVisit,
    deleteVisit,
    onLogoutBtnClick,
    updateAuthenticatedUI
};

window.HTTP_MODULE = HTTP_MODULE;

function onLogoutBtnClick(event) {
    const confirmation = confirm("Are you sure you want to logout?");
    if (confirmation) {
        CACHE.deleteAuthenticatedUserFromCache();
        window.open("/auth/login.html", "_self");
    }
}

function updateAuthenticatedUI() {
    const authUser = CACHE.getAuthenticatedUserFromCache();
    if (authUser) {
        STATE.authUser = authUser;
        $(".user-profile").html(
            `<li class="user-profile"><a href="/profile/detail.html">${
                authUser.name
            }'s profile</a></li>`
        );
        $(".user-email").html(`<p>Your email: ${authUser.email}</p>`);
    }
}

//user stuff
function signupUser(options) {
    const { userData, onSuccess, onError } = options;
    $.ajax({
        type: "POST",
        url: "/api/user",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(userData),
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}

function loginUser(options) {
    const { userData, onSuccess, onError } = options;
    $.ajax({
        type: "POST",
        url: "/api/auth/login",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(userData),
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}
//pet stuff
function getUserPets(options) {
    const { jwtToken, onSuccess, onError } = options;
    $.ajax({
        type: "GET",
        url: "/api/pet",
        contentType: "application/json",
        dataType: "json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}

function getPetById(options) {
    const { petId, onSuccess } = options;
    $.getJSON(`/api/pet/${petId}`, onSuccess);
}

function createPet(options) {
    const { jwtToken, newPet, onSuccess, onError } = options;
    $.ajax({
        type: "POST",
        url: "/api/pet",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(newPet),
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError();
            }
        }
    });
}

function updatePet(options) {
    const { jwtToken, petId, newPet, onSuccess, onError } = options;
    $.ajax({
        type: "PUT",
        url: `/api/pet/${petId}`,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(newPet),
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError();
            }
        }
    });
}

function deletePet(options) {
    const { petId, jwtToken, onSuccess, onError } = options;
    $.ajax({
        type: "delete",
        url: `/api/pet/${petId}`,
        contentType: "application/json",
        dataType: "json",
        data: undefined,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}

// //pet medical stuff
// function getPetMedicalById(options) {
// 	const{ petMedical, onSuccess } = options;
// 	$.getJSON(`/api/petMedical/${petMedicalId}`, onSuccess);
// }
// function createPetMedical(options) {
// 	const { jwtToken, newPetMedical, onSuccess, onError } = options;
// 	$.ajax({
// 		type: 'POST',
// 		url: '/api/petMedical',
// 		contentType: 'application/json',
// 		dataType: 'json',
// 		data: JSON.stringify(newPetMedical),
// 		beforeSend: function(xhr) {
// 			xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
// 		},
// 		success: onSuccess,
// 		error: err => {
//             console.error(err);
//             if (onError) {
//                 onError();
//             }
//         }
// 	})
// }

// function updatePetMedical(options) {
// 	const {jwtToken, petMedicalId, newPetMedical, onSuccess, onError} = options;
// 	$.ajax({
// 		type: 'PUT',
// 		url: `/api/petMedical/${petMedicalId}`,
// 		contentType: 'application/json',
// 		dataType: 'json',
// 		data: JSON.stringify(newPetMedical),
// 		beforeSend: function(xhr) {
// 			xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
// 		},
// 		success: onSuccess,
// 		error: err => {
//             console.error(err);
//             if (onError) {
//                 onError();
//             }
//         }
// 	})
// }

// function deletePetMedical(options) {
// 	const {petMedicalId, jwtToken, onSuccess, onError} = options;
// 	$.ajax({
// 		type: 'DELETE',
//         url: `/api/petMedical/${petMedicalId}`,
//         contentType: 'application/json',
//         dataType: 'json',
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
//         },
//         success: onSuccess,
//         error: err => {
//             console.error(err);
//             if (onError) {
//                 onError(err);
//             }
//         }
// 	})
// }

//vet stuff
function getUserVet(options) {
    const { jwtToken, onSuccess, onError } = options;
    $.ajax({
        type: "GET",
        url: "/api/vet",
        contentType: "application/json",
        dataType: "json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}

function getVetById(options) {
    const { vetId, onSuccess } = options;
    $.getJSON(`/api/vet/${vetId}`, onSuccess);
}

function createVet(options) {
    const { jwtToken, newVet, onSuccess, onError } = options;
    $.ajax({
        type: "POST",
        url: "/api/vet",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(newVet),
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError();
            }
        }
    });
}

function updateVet(options) {
    const { jwtToken, vetId, newVet, onSuccess, onError } = options;
    $.ajax({
        type: "PUT",
        url: `/api/vet/${vetId}`,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(newVet),
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError();
            }
        }
    });
}

function deleteVet(options) {
    const { vetId, jwtToken, onSuccess, onError } = options;
    $.ajax({
        type: "delete",
        url: `/api/vet/${vetId}`,
        contentType: "application/json",
        dataType: "json",
        data: undefined,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}

//visit stuff

function getUserVisits(options) {
    const { jwtToken, onSuccess, onError } = options;
    $.ajax({
        type: "GET",
        url: "/api/visit",
        contentType: "application/json",
        dataType: "json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}

function getVisitById(options) {
    const { visitId, onSuccess } = options;
    $.getJSON(`/api/visit/${visitId}`, onSuccess);
}

function createVisit(options) {
    const { jwtToken, newVisit, onSuccess, onError } = options;
    $.ajax({
        type: "POST",
        url: "/api/visit",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(newVet),
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError();
            }
        }
    });
}

function updateVisit(options) {
    const { jwtToken, visitId, newVisit, onSuccess, onError } = options;
    $.ajax({
        type: "PUT",
        url: `/api/visit/${visitId}`,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(newVisit),
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError();
            }
        }
    });
}

function deleteVisit(options) {
    const { visitId, jwtToken, onSuccess, onError } = options;
    $.ajax({
        type: "DELETE",
        url: `/api/visit/${visitId}`,
        contentType: "application/json",
        dataType: "json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
    });
}
// //report stuff
// function getUserReports(options) {
// 	const { jwtToken, onSuccess, onError } = options;
// 	$.ajax({
// 		type: 'GET',
// 		url: '/api/report',
// 		contentType: 'application/json',
// 		dataType: 'json',
// 		beforeSend: function(xhr) {
// 			xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
// 		},
// 		success: onSuccess,
// 		error: err => {
// 			console.error(err);
// 			if(onError) {
// 				onError(err);
// 			}
// 		}
// 	})
// }

// function getReportById(options) {
// 	const { reportId, onSuccess } = options;
// 	$.getJSON(`/api/report/${reportId}`, onSuccess);
// }

// function createReport(options) {
// 	const {jwtToken, newReport, onSuccess, onError } = options;
// 	$.ajax({
// 		type: 'POST',
// 		url: '/api/report',
// 		contentType: 'application/json',
// 		dataType: 'json',
// 		data: JSON.stringify(newVet),
// 		beforeSend: function(xhr) {
// 			xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
// 		},
// 		success: onSuccess,
// 		error: err => {
//             console.error(err);
//             if (onError) {
//                 onError();
//             }
//         }
// 	})
// }

// function updateReport(options) {
// 	const {jwtToken, reportId, newReport, onSuccess, onError} = options;
// 	$.ajax({
//         type: 'PUT',
//         url: `/api/report/${reportId}`,
//         contentType: 'application/json',
//         dataType: 'json',
//         data: JSON.stringify(newVisit),
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
//         },
//         success: onSuccess,
//         error: err => {
//             console.error(err);
//             if (onError) {
//                 onError();
//             }
//         }
//     });
// }

// function deleteReport(options) {
// 	const {reportId, jwtToken, onSuccess, onError} = options;
// 	$.ajax({
// 		type: 'DELETE',
//         url: `/api/report/${reportId}`,
//         contentType: 'application/json',
//         dataType: 'json',
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
//         },
//         success: onSuccess,
//         error: err => {
//             console.error(err);
//             if (onError) {
//                 onError(err);
//             }
//         }
// 	})
// }
