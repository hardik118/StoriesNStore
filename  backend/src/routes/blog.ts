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

type Variables={
    userId: string

}

export const blogRouter = new Hono<{
    Variables: Variables
    Bindings:{
      DATABASE_URL: string
      JWT_TOKEN: string
      AWS_ACCESS_KEY_ID: string
      AWS_SECRET_ACCESS_KEY: string
      
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
      
    const s3client= new S3Client({
        region: 'us-east-1',
        credentials:{
            accessKeyId: c.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: c.env.AWS_SECRET_ACCESS_KEY
        }
    })
  const body= await c.req.json();
  const imgUrlsForBatchJob: string[]= body.imgurls;
  let  GetImgUrl: string[]=[];


  const batchJobUploadPromise=  imgUrlsForBatchJob.map((imgurl:string)=>{
    const base64ImgData= imgurl.replace(/^data:image\/\w+;base64,/,'');
    const buffer= Buffer.from(base64ImgData, 'base64');
    const key= `uploads/user-imgs/img-${Date.now()}.JPEG`;
    console.log(2);
  GetImgUrl.push("https://hyadav-testcase.s3.us-east-1.amazonaws.com/"+key);

    const params= {
        Bucket: "hyadav-testcase",
        Key : key,
        Body: buffer,
        ContentEncoding: "base64",
        ContentType: "image/JPEG"
    }
    const commnad = new PutObjectCommand(params);

    return s3client.send(commnad).catch(()=>{
        console.log(3);
        return c.json({msg:"Try again! Some issue while publishing "});

    });




  })
  await Promise.all(batchJobUploadPromise);
console.log(4);
return  c.json({msg:"Hey all files uplade", Urls: GetImgUrl});


   
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
        id: body.id
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

  blogRouter.post('/store/UploadDocToStore', async (c)=>{

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
    
    const document =  await c.req.json();

     const s3client= new S3Client({
      region: 'us-east-1',
      credentials:{
          accessKeyId: c.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: c.env.AWS_SECRET_ACCESS_KEY
      }

     })
     const Usershop= await prisma.userShop.findFirst({
      where:{
        userId: c.get('userId')

      }
    })
    if(!Usershop) return c.json({msg:"Create a Shop , Shop is not created"});

    if (!document.fileName || !document.content) {
      return c.json({ msg: "Missing file data" }, 400);
  }

     const extension= extname(document.fileName);
     const  cleanTxt= extension.replace('.','');

     const fileType=mime.getType(cleanTxt) || 'application/octet-stream';
     const fileName: string = `uploads/user-doc/doc-${Date.now()}.${extension}` ;



     const params= {
      Bucket: "hyadav-testcase",
      Key : fileName,
      Body: document.content,
      ContentType: fileType,
  }
  const Title: string = document.title;
  const metaInfo: string= document.metaInfo;
  const Tags : string = document.tags;
  const DocLink= `https://hyadav-testcase.s3.us-east-1.amazonaws.com/${fileName}`;

  try {
    const commnad= new PutObjectCommand(params);
    console.log('s3');

    await s3client.send(commnad);
    console.log('prisma');
    await prisma.shopDoc.create({
      data:{
        title: Title,
        metaInfo : metaInfo,
        Tags: Tags,
        DocLink: DocLink,
        shopId: c.get('userId')

      }

    })
    return c.json({msg: "created Your Doc"});

  } catch (error) {
    return c.json({msg:" could not upload the doc try again"});
    
  }

  })

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

  const storeId= c.req.param('id');

  try {
    const usershop= await prisma.userShop.findFirst({
      where:{
        ShopId: storeId
      }
    })
    if(!usershop) return c.json({msg: 'Hey The Shop Seems busy!'});

  } catch (error) {
    return c.json({msg:'Hey Try again!'});
    
  }
  try {
    const userDocs= await prisma.userShop.findMany({
      where:{
        ShopId: storeId
      },
      include:{
        shopDoc: true
      }
    })
    return c.json({Docs: userDocs});
    
  } catch (error) {
    return c.json({msg:'Hey Seems store is Empty!'});
    
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
      include:{
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


  export default blogRouter;
  
  