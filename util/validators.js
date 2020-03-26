module.exports.validateRegisterInput = (
    userName, email, password, confirmPassword
) => {
    const errors = {};
    if(userName.trim() === '') {
        errors.userName = 'Username cannot be empty'
    }
    if(email.trim() === '') {
        errors.email = 'Email cannot be empty'
    } else{
        const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!email.match(regEx)) {
            errors.email = 'Enter a valid email'
        }
    }
    if(password === '') {
        errors.password = 'Password cannot be empty'
    } else if(password != confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}


module.exports.validateLoginInput = (
    userName, password
) => {
    const errors = {};
    if(userName.trim() === '') {
        errors.userName = 'Username cannot be empty'
    }
    if(password === '') {
        errors.password = 'Password cannot be empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}