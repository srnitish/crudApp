import toast from 'react-hot-toast';
import { authenticate } from './helper.js';

/** validate login page email */
export async function loginValidation(values) {
    const errors = emailVerify({}, values);
    passwordVerify(errors, values);

    if (values.email) {
        //check email exist or not
        const { status } = await authenticate(values.email);
        if (status !== 200) {
            errors.exist = toast.error("email does not exist");
        }
    }

    return errors;
}

/** validate recover page email */
export async function recoverValidation(values) {
    const errors = emailVerify({}, values);
    if (values.email) {
        //check email exist or not
        const { status } = await authenticate(values.email);
        if (status !== 200) {
            errors.exist = toast.error("email does not exist");
        }
    }

    return errors;
}

/** validate password */
function passwordVerify(errors = {}, values) {
    // const specialChars = /^[^ !"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+$/;
    if (!values.password) {
        errors.password = toast.error('Password Required..!!');
    } else if (values.password.includes(' ')) {
        errors.password = toast.error('Invalid Password..!!');
    } else if (values.password.length < 4) {
        errors.password = toast.error("Password must be 4 char long!!");
    }
    // else if (!specialChars.test(values.password)) {
    //     errors.password = toast.error("Password must have special characters!!");
    // }
    return errors;
}

/** validate reset password */
export async function resetPasswordValidation(values) {
    const errors = passwordVerify({}, values);

    if (values.password !== values.confirm_pwd) {
        errors.exist = toast.error("Password not match...!");
    }
    return errors;
}

/** Validate register form*/
export async function registerValidation(values) {
    const errors = emailVerify({}, values);
    nameVerify(errors, values);
    passwordVerify(errors, values);
    ageVerify(errors, values);
    return errors;
}

/** Validate Profile form*/
export async function profileValidation(values) {
    const errors = emailVerify({}, values);
    nameVerify(errors, values);
    phoneVerify(errors, values);
    addressVerify(errors, values);
    return errors;
}

/** validate name */
function nameVerify(error = {}, values) {
    if (!values.firstname) {
        error.firstname = toast.error('First Name is Required..!!');
    } else if (values.firstname.includes(' ')) {
        error.firstname = toast.error('Invalid Name..!!');
    } else if (!values.lastname) {
        error.lastname = toast.error('Last Name is Required..!!');
    } else if (values.lastname.includes(' ')) {
        error.lastname = toast.error('Last Name..!!');
    }
    return error;
}

/** validate mobile */
function phoneVerify(error = {}, values) {
    if (!values.mobile) {
        error.mobile = toast.error('Mobile Required..!!');
    }
    return error;
}

/** validate address */
function addressVerify(error = {}, values) {
    if (!values.address) {
        error.address = toast.error('Address Required..!!');
    } else if (values.address.includes(' ')) {
        error.address = toast.error('Invalid Address..!!');
    }
    return error;
}

/** validate email */
function emailVerify(error = {}, values) {
    if (!values.email) {
        error.email = toast.error('Email Required..!!');
    } else if (values.email.includes(' ')) {
        error.email = toast.error('Invalid Email..!!');
    }
    return error;
}

/** validate age */
function ageVerify(error = {}, values) {
    if (!values.age) {
        error.age = toast.error('Age Required..!!');
    } else if (values.age.includes(' ')) {
        error.age = toast.error('Invalid Age..!!');
    }
    return error;
}