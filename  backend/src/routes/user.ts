import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {  decode, sign, verify } from 'hono/jwt';
import { JWTPayload } from 'hono/utils/jwt/types';
import bcrypt, { genSalt } from "bcryptjs";
import {userSingupInput,userSigninInput} from "@hardik_05/medium-zod"

type Variables={
  userId: string

}

export const userRouter = new Hono<{
  Variables: Variables

  Bindings:{
  DATABASE_URL: string
  JWT_TOKEN: string
}
}>();

userRouter.use("updateUser/*", async ( c ,next)=>{
    const auhtToken   =  c.req.header("Authorization");
   
  if(!auhtToken) return c.json({msg: 'The authorization token in missgin'})
    let token = auhtToken.split(' ')[1];

 
  let  decodedUserInfo: any;
  try {
   decodedUserInfo=  await  verify(token , c.env.JWT_TOKEN);
   if(!decodedUserInfo.id){
  return c.json({msg:"try putting valid credentials"});
   }
  }catch(error){
    return c.json({msg:"the user is not valid ", err: error});
  
  }
  const authorId: string= decodedUserInfo.id;
  c.set('userId',authorId);
  await next();
  
  
  })

userRouter.post('/signup',async (c)=>{

    const prisma =   new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  
  const body = await c.req.json();
 try {
  const {success}= userSingupInput.safeParse(body);
  if(!success) return c.json({msg:"enter the inputs again "})
  
 } catch (error) {
c.status(402);
  return c.json({msg:"Invalid credentials"})
  
 }
  

  let userToken: string;
  
  const  salt :string| number = await bcrypt.genSalt(10);
  const password: string= body.password;
  
  const hashUserPassword = await  bcrypt.hash(password, salt);
  
  const email: string= body.email;
  try {
  try {
    const alreadyPresentUser=await prisma.user.findFirst({
      where:{
        email: email
      }
    })
    if(alreadyPresentUser?.email) return c.json({msg:"The Email is already present"});
  } catch (error) {
    return c.json({msg:"The email may be present "})
    
  }
    const user= await  prisma.user.create({
      data:{
        email: email,
        password: hashUserPassword
    
      }
     
    })
  
    userToken= await sign({id: user.id}, c.env.JWT_TOKEN);
  
  } catch (error) {
    return c.json({msg:'the user is not created'});
  
  }
  
  
    return c.json({msg:"the user is created ",
      token: userToken
    });
  
  })
  
  userRouter.post('/Login', async (c)=>{
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  
  const body=await c.req.json();
  let userToken : string;
  try {
    const {success}= userSigninInput.safeParse(body);
    if(!success) return c.json({msg:"enter the inputs again "})
    
   } catch (error) {
  c.status(402);
    return c.json({msg:"Invalid credentials"})
    
   }
  
  try {
  
    const user: any = await prisma.user.findFirst({
      where:{
    email: body.email,
      }
    })
    if(!user) return c.json({msg:"hey the email is invalid!"});
  const userpassword : string =user.password;
  const password :string = body.password
  const email: string= body.email;
    const isMatch: boolean = await bcrypt.compare(password, userpassword);
    if(!isMatch) return c.json({msg:"the user password is invalid "});
  
    
   if(!user) return c.json({msg:"enter valid credentials "}) ;
  
   userToken= await sign({id: user.id}, c.env.JWT_TOKEN);
  
  
  } catch (error) {
    return c.json({msg:"the user could not be logged in"});
  
    
  }
    return c.json({msg:"the user is singed ",
      userToken : userToken
    });
    
  })

userRouter.post("updateUser/addToSave", async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  const body=  await c.req.json();
  try{
   const resposeForSavedReq= await prisma.user.findFirst({
    where:{
      id: c.get("userId")
    },
    select:{
      savedpost: true
    }

   })
   if(resposeForSavedReq){
    if(resposeForSavedReq.savedpost.includes(body.data.postId.id)){
      return c.text("the post is saved alredy ");
    }

   }
  } catch{
    return c.json({msg:"some err occured"});
    
  }

  try {
    await prisma.user.update({
      where:{
id: c.get("userId")
      },
    data:{
      savedpost:{
        push: body.data.postId.id
      }
    }
    })
  } catch (error) {

console.log(error);

    
  }
 return c.text("the post has been saved ");

})
  
export default userRouter;