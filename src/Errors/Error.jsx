import React from 'react'
import { Input, Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';


function Error() {

  const navigate = useNavigate()
  return (
    <>
      
      <div class="flex items-center justify-center h-screen p-16 bg-gray-50">
    <div class="container flex flex-col items-center ">
        <div class="flex flex-col gap-6 max-w-md text-center">
            <h2 class="font-extrabold text-9xl text-black">
                <span class="sr-only">Error</span>404
            </h2>
            <p class="text-2xl md:text-3xl dark:text-gray-400">عذرا، الصفحة غير موجودة</p>
                                    <Button
                                    className="mt-5 tracking-wide font-semibold bg-[#005B41] text-white w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    size='lg'
                                    onClick={()=>{navigate('/')}}
                                >
                                    <span className="ml-">  الرئيسية </span>
                                </Button>
        </div>
    </div>
</div>

    </>
  )
}

export default Error