window.HTTP_MODULE = {
    signupUser,
    loginUser,
    getUserPets,
    getPetById,
    createPet,
    updatePet,
    deletePet
};

function signupUser(options) {
    const { userData, onSuccess, onError } = options;
    $.ajax({
        type: 'POST',
        url: '/api/user',
        contentType: 'application/json',
        dataType: 'json',
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
        type: 'POST',
        url: '/api/auth/login',
        contentType: 'application/json',
        dataType: 'json',
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

function getUserPets(options) {
	const { jwtToken, onSuccess, onError } = options;
	$.ajax({
		type: 'GET',
		url: '/api/pet',
		contentType: 'application/json',
		dataType: 'json',
		beforeSend: function(xhr) {
			xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
		},
		success: onSuccess,
		error: err => {
			console.error(err);
			if(onError) {
				onError(err);
			}
		}
	})
}

function getPetById(options) {
	const { petId, onSuccess } = options;
	$.getJSON(`/api/pet/${petId}`, onSuccess);
}

function createPet(options) {
	const {jwtToken, newPet, onSuccess, onError } =options;
	$.ajax({
		type: 'POST',
		url: '/api/pet',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(newPet),
		beforeSend: function(xhr) {
			xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
		},
		success: onSuccess,
		error: err => {
            console.error(err);
            if (onError) {
                onError();
            }
        }
	})
}

function updatePet(options) {
	const {jwtToken, petId, newPet, onSuccess, onError} = options;
	$.ajax({
        type: 'PUT',
        url: `/api/pet/${petId}`,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(newNote),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
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
	const {petId, jwtToken, onSuccess, onError} = options;
	$.ajax({
		type: 'delete',
        url: `/api/pet/${petId}`,
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
        },
        success: onSuccess,
        error: err => {
            console.error(err);
            if (onError) {
                onError(err);
            }
        }
	})
}