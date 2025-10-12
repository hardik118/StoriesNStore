import { Hono } from 'hono';
import { Prisma, PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {  decode, sign, verify } from 'hono/jwt';
import { JWTPayload } from 'hono/utils/jwt/types';
import bcrypt, { genSalt } from "bcryptjs";
import {userBlogInput, userBlogUpdateInput} from "@hardik_05/medium-zod"
import {S3Client, GetObjectCommand, PutObjectCommand} from "@aws-sdk/client-s3"
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {extname} from "path"
import mime from 'mime';
import { blob } from 'aws-sdk/clients/codecommit';
import {uploadWithBlobSasUrl} from "../apiFunc/uploadtoCloudStorage"
import { uploadDocToAzure } from '../apiFunc/uploadDocttoBlobStorage';

type Variables={
    userId: string

}

export const blogRouter = new Hono<{
    Variables: Variables
    Bindings:{
      DATABASE_URL: string
      JWT_TOKEN: string
  AZURE_BLOB: string 
  AZURE_SAS_TOKEN: string 
      
    }
    }>();
    



blogRouter.use("/*", async ( c ,next)=>{
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
  
  
  
  
  
  /*Blog routes*/
  blogRouter.post("/uploadToCloudService", async (c)=>{
    const Body  = await c.req.json();

  try {
    const url = await uploadWithBlobSasUrl( c.env.AZURE_BLOB, Body.img);
    c.json({ url });
  } catch (err) {
    c.status(500)
    c.json({ error: "Upload failed" });

  }
  })

  
  blogRouter.post('/blog', async (c)=>{
    //this route is for posting your blog , it lets you add  your blog to the server 
    const body= await c.req.json();
    const prisma= new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    
    if(!body.title || !body.content){return c.json({msg: "Hey please add something"}) }
    try {
        const {success}= userBlogInput.safeParse(body);
        if(!success) return c.json({msg:"enter the inputs again "})
        
       } catch (error) {
      c.status(402);
        return c.json({msg:"Invalid credentials"})
        
       }

    const userblog= await prisma.post.create({
        data:{
            id: body.id,
            title:body.title,
            content: body.content,
            authorId: c.get('userId')
        }
    })

return c.json({id: userblog.id});
  
  })

blogRouter.put('/blog/publish', async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  if (!body.title || !body.content) {
    return c.json({ msg: "Hey please add something" });
  }

  try {
    const { success } = userBlogInput.safeParse(body);
    if (!success) return c.json({ msg: "Enter the inputs again" });
  } catch (error) {
    c.status(402);
    return c.json({ msg: "Invalid credentials" });
  }

  let updatedContent = body.content;

  // Match base64 images in Quill content
  const base64Regex = /<img[^>]+src=["'](data:image\/[^"']+)["'][^>]*>/g;
  const matches = [...updatedContent.matchAll(base64Regex)];
  let sucess= true;

  for (const match of matches) {
    const base64Img = match[1];
    try {
      // Upload to Azure Blob
      const azureUrl = await uploadWithBlobSasUrl(
        c.env.AZURE_BLOB,
        base64Img
      );

      // Replace base64 with Azure URL
      updatedContent = updatedContent.replace(base64Img, azureUrl);
    } catch (err) {
      sucess= false;
      console.error("Failed to upload image to Azure", err);
    }
  }

 if(sucess){
   // Save blog with updated content
  const userblog = await prisma.post.update({
    where: { id: body.id },
    data: {
      title: body.title,
      content: updatedContent,
      published: true
    },
  });

  return c.json({ id: userblog.id },200);
 }else{
  return c.json({msg: "could not upload !!"}, 400);
  
 }
});



  blogRouter.put('/blog', async (c)=>{
    //this route is for posting your blog , it lets you add  your blog to the server 
    const body= await c.req.json();
    const prisma= new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    
    if(!body.title || !body.content){return c.json({msg: "Hey please add something"}) }
    try {
        const {success}= userBlogInput.safeParse(body);
        if(!success) return c.json({msg:"enter the inputs again "})
        
       } catch (error) {
      c.status(402);
        return c.json({msg:"Invalid credentials"})
        
       }

    const userblog= await prisma.post.update({
      where:{
        id: body.id,
        published: false
      },
        data:{
            title:body.title,
            content: body.content,
        }
    })

return c.json({id: userblog.id});
  
  })
  
  
  blogRouter.put('/blog', async (c)=>{
    // this route let's you  make change  to your published blog, edit your blog route 
    const body= await c.req.json();
    const  prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try {
        const {success}= userBlogUpdateInput.safeParse(body);
        if(!success) return c.json({msg:"enter the inputs again "})
        
       } catch (error) {
      c.status(402);
        return c.json({msg:"Invalid credentials"})
        
       }
      
    const updatedBlogObject=await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            ...(body.title? {title: body.title}: {}),
            ...(body.content ? {content: body.content}: {})
        }
    })


    return c.json({id: updatedBlogObject.id});
    
  })
  
  blogRouter.get('/blog/:id',async (c)=>{
    //this route lets you  request a single blog by its id eg. user getting blogs on clicks 
    console.log("requested");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
let blog;
const id = c.req.param('id');
try {
     blog= await prisma.post.findFirst({
        where:{
            id: id
        },
    })
} catch (error) {
    c.status(404);
    return c.json({msg:"Try refreshing again"});
    
}
    return c.json({ blog});
    
  })
  
  blogRouter.get('/bulk', async (c)=>{
// this route lets you get bulk route for the  blogs eg. scroll feed
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const initialTake: string  = c.req.query('page') || '1';
    const page: number= parseInt(initialTake) ;
    const FIXED_LENGTH= 10;

    let offset= (page-1)*FIXED_LENGTH;
    let blogs;
try {
    blogs = await prisma.post.findMany(
    {
        skip: offset,
        take: FIXED_LENGTH,
        include:{
          author:{
            select:{
              name: true
            }

          }
        }
    }
    
   )
} catch (error) {
    return c.json({msg:"Hey cannot get blogs  try refreshing "})
    
} 

    return c.json({blogs});
    
  })




  //Store Router

  blogRouter.post("/store/createShop", async (c)=>{
    
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

    const body= await c.req.json();
    //const shopId = body.ShopId;
    if(!body.Name) return c.json({msg: 'Add the shop name'});

    console.log(body);
    const Shop = await prisma.userShop.findFirst({
      where:{
        userId:  c.get('userId')
      }
    })

    if(Shop?.ShopId) return  c.json({msg: "Shop Already Exists"});

    await prisma.userShop.create({
      data:{
        Name: body.Name,
        userId: c.get("userId"),
        shopDesc: body.shopDesc
      }
    })
    return c.json({msg : body.Name+" is Created"});

  })

blogRouter.post("/store/UploadDocToStore", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const formData = await c.req.parseBody(); // { title, metaInfo, tags, file }

  const file = formData["file"] as File; // raw file object
  const title = formData["title"] as string;
  const metaInfo = formData["metaInfo"] as string;
  const tags = formData["tags"] as string;

  if (!file || !title) {
    return c.json({ msg: "Missing file data" }, 400);
  }

  const Usershop = await prisma.userShop.findFirst({
    where: { userId: c.get("userId") },
  });

  if (!Usershop) {
    return c.json({ msg: "Create a Shop , Shop is not created" });
  }

  try {
    // Upload raw file to Azure
    const fileUrl = await uploadDocToAzure(
      "https://storiesnstore.blob.core.windows.net/upload-docs",
      c.env.AZURE_SAS_TOKEN,
      file.name,
      file // send the raw file directly
    );

    await prisma.shopDoc.create({
      data: {
        title,
        metaInfo,
        Tags: tags,
        DocLink: fileUrl,
        shopId: Usershop.ShopId,
      },
    });

    return c.json({ msg: "Created your Doc", url: fileUrl });
  } catch (error) {
    console.error(error);
    return c.json({ msg: "Could not upload the doc, try again" }, 500);
  }
});



  

  blogRouter.get("/store/Bulk", async (c)=>{
    
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const intialPage= c.req.query('page') || '1';
  const firstPage: number= parseInt(intialPage);
  const Max_call= 10;
  let off_set= (firstPage-1)*Max_call;
  let Docs 
  try {
    Docs= await prisma.shopDoc.findMany({
      skip: off_set,
      take: Max_call,
      
    })

  } catch (error) {
    return c.json({msg: 'Try again'});
    
  }

  return c.json({Docs: Docs});



   
  })

  blogRouter.get('/store/Doc/:id', async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const id= c.req.param('id');

  try {
    const Doc= await prisma.shopDoc.findFirst({
      where:{
        id: id
      }
    })

    return c.json({doc: Doc});

    
  } catch (error) {
    return c.json({msg: 'Try Again'});

    
  }



  })

  blogRouter.get("/store/Shop/:id", async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

    const shopId= c.req.param('id');


    try {
      const userShop= await prisma.userShop.findFirst({
        where:{
          ShopId:shopId
        },
        include:{
          user:{
            select: {
              name: true
            }
          },
          shopDoc:{
            select:{
              id: true,
              title: true,
              metaInfo: true
              
            }
          }
          
        }
      })

      return c.json({Shop: userShop});

      
    } catch (error) {
      return c.json({msg: 'Try again'});

      
    }

  })
 // userhsop docs route to get all docs in the user shop

  blogRouter.get('/store/Shops/Docs/:id', async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const userId= c.req.param('id');

  try {
    const user= await prisma.user.findFirst({
      where:{
        id: userId
      }
    })
    if(!user) return c.json({msg: 'Hey The user doesnot exists !'});

    try {
    const userDocs= await prisma.userShop.findMany({
      where:{
        userId: user.id
      },
      select:{
        Name: true,
        shopDoc: true
      }
    })
    return c.json({Docs: userDocs});
    
  } catch (error) {
    return c.json({msg:'Hey Seems store is Empty!'});
    
  }

  } catch (error) {
    return c.json({msg:'Hey Try again!'});
    
  }
  


       
  })
  
  blogRouter.get("/store/Shops/Bulk", async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  
  const intialPage= c.req.query('page') || '1';
  const firstPage: number= parseInt(intialPage);
  const Max_call= 10;
  let off_set= (firstPage-1)*Max_call;
  try {
    const Shops= await prisma.userShop.findMany({
      skip: off_set,
      take: Max_call,
      select:{
        Name: true,
        shopDesc: true,
        user:{
          select:{
            name: true,
            _count:{
              select:{
                followed: true
              }
            }
          }
        }
      }
      
    }
  )
    console.log(Shops);
    return c.json({shoplist: Shops})



  } catch (error) {
    return c.json({msg: 'Try again'});
    
  }


    
  })

  blogRouter.get('/IntrestForm', async (c)=>{

    const interestForm = [
      ["AI & ML"], ["Cybersecurity"], ["Blockchain"], ["Quantum Computing"],
      ["Cloud Computing"], ["Networking"], ["Software Dev"], ["Open Source"],
      ["Competitive Coding"], ["Algorithms"], ["OS & Systems"], ["IoT & Robotics"],
      ["DevOps"], ["VR & AR"], ["NLP"], ["Databases"],
      ["Big Data"], ["Game Dev"], ["Distributed Systems"], ["Web3 & Metaverse"],
      ["Reverse Engineering"], ["Pen Testing"], ["Math & CS"], ["Edge Computing"],
      ["Bioinformatics"], ["Digital Forensics"]
    ];    
     
    return c.json({interestForm: interestForm});

  } )


  blogRouter.get("/userInterest", async (c)=>{
     const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try {
   const userInterest = await prisma.user.findFirst({
      where: {
        id: c.get('userId')
      },
       select: {
    saveIntrest: true,   // only fetch this field
  }
     });
     
    console.log(userInterest);
    return c.json({userInterest});
   } catch (error) {
    return c.json({});

   }
  })

  blogRouter.post('/IntrestForm', async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const body=  await c.req.json();

   const intrestList= body.flat();
   try {
    await prisma.user.update({
      where: {
        id: c.get('userId')
      },
      data:{
        saveIntrest: {
          push: intrestList
        }
      }
     });
     
    
    return c.json({msg: true});
   } catch (error) {
    return c.json({msg: false});
    
    
   }


  })


   blogRouter.post('/userUpi', async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const user = await prisma.user.findFirst({
    where:{
       id: c.get('userId')
    }
  });

  if(!user) return c.json({msg: "no such user exists!! "}, 404);
   // Build full UPI link
  const amount = Number(c.req.query('amount')) || 100; // default 100 if not passed
  const creatorName = user?.name || "Creator"; // optional, can store in DB
  const upiId = user.userUpiId;
  console.log(user);

  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    creatorName
  )}&am=${amount}&cu=INR`;

  console.log(upiLink);

  return c.json({ upiLink }, 200);

  


  })


  export default blogRouter;
  
  