import React from 'react'
import Nav from '../Components/Nav'
import { Tooltip, Button } from "@nextui-org/react";
import {Checkbox} from "@nextui-org/react";
import { useState } from 'react';
import imageMap from '../Assets/MapPins/ImageMap.png'
import { SendIcon } from '../Assets/Icons/SendIcon';
import { AddIcon } from '../Assets/Icons/AddIcon';



export default function NewRequest() {
    const [isSelected, setIsSelected] = useState(false);

  return (
    <div className='overflow-visible text-right bg-[#FAFAFB]'>
    <Nav/>

    <div className='w-full flex justify-center h-full items-center p-10'>
        <div className='flex flex-col justify-start  items-center text-center w-full'>
            <h1 className='font-extrabold text-[2rem] text-black'>طلب إضافة مكان جديد</h1>
            <p className='text-md pt-3 w-[50%] text-black max-sm:w-full '>
            *الرجاء تعبئة الأستبيان بمعلومات صحيحة ودقيقة، سيتم مراجعة جميع المعلومات قبل أضافة المكان. 
            </p>

         <div className='flex flex-col w-[50%] justify-center items-center pt-5 gap-5 max-sm:w-full '>

            <label className="form-control w-full ">
             <div className="label">
               <span className="label-text-alt font-medium text-xl text-black">اسم المكان</span>
             </div>
             <input type="text" placeholder=" ادخل اسم المكان" className="input input-bordered w-full bg-white " />
           </label>


           <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-medium text-xl text-black ">تصنيف المكان</span>
             </div>
             <select className="select select-bordered text-lg text-black bg-white  ">
               <option disabled selected >اختر التصنيف</option>
               <option>مطعم</option>
               <option>منتزه</option>
               <option>مقهى</option>
               <option>تسوق</option>
               <option>أخرى</option>
             </select>
          </label>

           <label className="form-control w-full ">
             <div className="label">
               <span className="label-text-alt font-medium text-xl text-black">المنطقة </span>
             </div>
             <input type="text" placeholder=" ادخل اسم المنطقة" className="input input-bordered w-full bg-white " />
           </label>

           <label className="form-control w-full ">
             <div className="label">
               <span className="label-text-alt font-medium text-xl text-black">المدينة </span>
             </div>
             <input type="text" placeholder=" ادخل اسم المدينة" className="input input-bordered w-full bg-white " />
           </label>

        <div className='flex flex-col w-full text-start gap-4 pt-3 px-2 max-sm:gap-2'>

          <h1 className='font-medium text-xl text-black'>الخدمات المقدمة</h1>

          <div className='w-full flex gap-44 px-3 max-sm:gap-5'>
            <div className=' flex flex-col gap-3'>
              <Checkbox isSelected={isSelected} onValueChange={setIsSelected}  color="default"  className=" font-medium text-xl text-black"> مواقف المقعدين </Checkbox>
              <Checkbox defaultSelected color="default"  className=" font-medium text-xl text-black"> المنحدرات  </Checkbox>
              <Checkbox defaultSelected color="default"  className=" font-medium text-xl text-black">  طاولات الطعام </Checkbox>
            </div>

            <div className=' flex flex-col gap-3'>
              <Checkbox defaultSelected color="default"  className=" font-medium text-xl text-black"> دورات المياه  </Checkbox>
              <Checkbox defaultSelected color="default"  className=" font-medium text-xl text-black"> المصاعد  </Checkbox>
              <Checkbox defaultSelected color="default"  className=" font-medium text-xl text-black">  ابواب اوتوماتيكة  </Checkbox>
            </div>

          </div>
          </div>

          <div className='flex flex-col w-full text-start gap-3 pt-3 px-2'>
          <h1  className='font-medium text-xl text-black' >اختر الموقع على الخريطة</h1>
          <img src={imageMap} ></img>
          </div>

          <div className='flex flex-col w-full text-start gap-3 pt-3 px-2'>
          <h1  className='font-medium text-xl text-black' > إضافة صور للمكان </h1>
          <div className='border border-gray-400 w-full grid grid-cols-3 rounded-md justify-center items-center py-2 relative'>
            <div className=' grid justify-center items-center gap-2'>
            <img src='https://www.al-watan.com/uploads%2Fimported_images%2Fdata%2F20170209%2Fimages%2F11_1_1.jpg' className='bg-[#80808021] w-44 h-44 rounded-md max-sm:w-20 max-sm:h-20 ' alt='image1'/>
            <img src='' className='bg-[#80808021] w-44 h-44 rounded-md max-sm:w-20 max-sm:h-20' alt='image4'/>
            </div>
            <div className=' grid justify-center items-center gap-2'>
            <img src='https://firstglass.om/wp-content/uploads/2022/06/Automatic-Hinged-Door-2.jpg' className='bg-[#80808021] w-44 h-44 rounded-md max-sm:w-20 max-sm:h-20 ' alt='image1'/>
            <img src='' className='bg-[#80808021] w-44 h-44 rounded-md max-sm:w-20 max-sm:h-20 ' alt='image5'/>
            </div>
            <div className=' grid justify-center items-center gap-2'>
            <img src='' className='bg-[#80808021] w-44 h-44 rounded-md max-sm:w-20 max-sm:h-20 ' alt='image3'/>
            <img src='' className='bg-[#80808021] w-44 h-44 rounded-md max-sm:w-20 max-sm:h-20 ' alt='image6'/>
            </div>
            <Tooltip showArrow={true} content="اضف صورة">
            <Button
            className="bg-[#005B41] w-fit absolute top-[45%] right-[45%] max-sm:top-[40%] max-sm:right-[40%] "
            endContent={<AddIcon size={20}/>}
            size="sm"
          >    
          </Button>
          </Tooltip>
          </div>
          
          </div>

          <div className='flex flex-col w-full text-start pt-3 px-2 '>
          <Checkbox defaultSelected color="default"  className=" font-medium text-xl text-black"> 
            أوافق على  
           <span className='text-[#005B41]'> الشروط والأحكام </span> 
           وسياسة 
           <span className='text-[#005B41]'> الخصوصية </span>
           </Checkbox>
           </div>


           <Button
            className=" flex justify-center items-center bg-[#005B41] text-white font-bold text-xl w-full mt-3 max-sm:text-base"
            endContent={<SendIcon size={24} />}
            size="lg"
          >    
          ارسال
          </Button>


            
       </div>

        </div>
    </div>    
    </div>
  )
}
