
const Validation=(Firstname,Lastname,email,password,Confirm) =>{
    let errors={};
    if(!Firstname){
        errors.Firstname="Firstname is required."
    }
    if(!Lastname){
        errors.Lastname="Lastname is required."
    }
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

    if(!Confirm){
        errors.Confirm='Confirm password is required.'
    }
    else if(Confirm!==password){
        errors.Confirm='Password does not match.'

    }
    



return errors;
}

export default Validation
