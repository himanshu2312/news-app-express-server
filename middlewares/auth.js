import jwt from "jsonwebtoken"

const auth = (req,res,next)=>{
     try{
         const token = req.headers.authorization.split(" ")[1];

         const decodeData = jwt.verify(token,process.env.JWT_SECRET);
         req.userId = decodeData?.id

         next();
     }
     catch(e){
      console.log(e)
     }
}
export default auth;