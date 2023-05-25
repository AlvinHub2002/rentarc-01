
const Validation=(email,password) =>{
    let errors={};
    if(!email){
        errors.email="Email is required."
    }
    else if(!/\S+@\S+\.\S+/.test(email)){
        errors.email='Email is invalid.'
    }
    if(!password){
        errors.password='password is required.'
    }
    else if(password.length <8){
        errors.password='Password must be of length more than 8.'
    }


return errors;
}

export default Validation
