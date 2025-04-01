import React from 'react';
import  Lottie  from 'lottie-react';
import animationData from './Coffejson.json'; // Replace with your Lottie JSON file
import { Button } from '../components/button';
import { Heading } from '../components/Heading';
import { FunctionalButton } from '../components/ButtonsWordPlus';

const Document = () => {
  return (
    <div className='grid grid-rows-12 h-screen '>
  <div className='row-span-2 pt-2'>
  <div className="row-span-1 flex items-start justify-between p-1 ">
               <div  className="w-1/2 h-full flex items-center justify-start gap-2">

<Heading heading="Medium"/>


             
               </div>
                <div className=" w-1/2 h-full flex items-center justify-end gap-3 p-1 ">
                <FunctionalButton heading="Publish" color={'blue'} />
                <FunctionalButton heading="Save" color={'Green'} />
                </div>
            </div>
            <hr />
  </div>
 
  <div className="row-span-10 bg-[url('coffe.png')] ">
    <div className='grid grid-cols-2'>
      <div className='col-span-1  flex items-center justify-center '>
        <div className=" flex items-center justify-center flex-col  h-2/3 w-2/3 border-2 border-gray-100  rounded-lg shadow-lg ">
<div className="bg-[url('background.png')]" >
<h3 className=' p-5 text-violet-500 font-bold  text-3xl font-serif'>Buy him  coffee </h3>
</div>
<div  className='p-4'>
<Button heading='100' ></Button>
<Button heading='500'></Button>
</div>



        </div>
      </div>
      <div className='col-span-1 flex justify-center items-center'>
        <Lottie animationData={animationData} loop={true} style={{ width: '540px', height: '530px' }} />
      </div>
    </div>
  </div>
</div>

    
  )
};

export default Document;
