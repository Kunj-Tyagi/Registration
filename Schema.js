const Joi = require("joi");//Joi,Yup,zod

// Schema for server-side validation
const userSchema = Joi.object({
  // 'name' is a required string
  name: Joi.string().required(),

  // 'email' must be a valid email format and is required
  email: Joi.string().required(),

  // 'phoneno' must be a number, required, and should follow a pattern (optional)
  phoneno: Joi.number().required(),
}).required();

const validateUser=(req,res,next)=>{
    let {error}=userSchema.validate(req.body);
    if(error){
    console.log(req.body);
      res.status(400);
      throw new Error(error);
    }
    else next();
}

module.exports=validateUser;