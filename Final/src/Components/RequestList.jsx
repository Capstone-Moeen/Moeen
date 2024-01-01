import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../Config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Button, CircularProgress } from '@nextui-org/react';
import {Input} from "@nextui-org/react";

function RequestList() {

    if (!localStorage.getItem('isAdmin')) {
        window.open('/', '_self')
    }

    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])
    const [search, setSearch] = React.useState('');
    const navigate = useNavigate()

    React.useEffect(()=>{
        getData()
    }, [])

    const getData = async () => {
        const query = await getDocs(collection(db, "placeRequest"));
        const data = query.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const filterdData = data.filter((item)=>
            item.Status === 'waiting'
        )
        setData(filterdData);
        setLoading(false)
      };

    //   

 const handleDetails = (id) => {
    navigate(`/PlaceDetails/${id}`);
}

const filteredData = data.filter((item) =>
      item.placeName.includes(search)
    )

  return (
    <>

{loading && (
        <div className="w-full h-[100vh] max-sm:h-screen bg-black opacity-35 z-20 absolute top-0 left-0 flex justify-center 
        items-center ">
          <CircularProgress
            className="z-50"
            color="primary"
            label="Proccesing"
          ></CircularProgress>
        </div>
      )}

        <p class="text-right font-extrabold uppercase p-10 mt-10 max-sm:py-5 max-sm:px-0">الطلبات</p>
            
        <Input
                className={`text-black rounded-lg font-medium border-none
                placeholder-gray-400 text-sm text-right w-[50%] lg:w-[35%]
                px-10 mb-9 max-sm:py-5 max-sm:px-0`}
                color="black"
                variant="bordered"
                type="search" 
                label="بحث" 
                value={search}
                onChange={(event)=>{setSearch(event.target.value)}}

               />  

            <div className='mb-20'>
                    <div class="mx-4 md:mx-10 max-sm:mx-0">
                
                <div class="overflow-x-auto rounded-lg shadow-lg">
                    <table class="table-fixed w-full ">
                        
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class=" py-4 px-6 text-center text-gray-600 font-bold">اسم المكان</th>
                                    {/* <th class=" py-4 px-6 text-right text-gray-600 font-bold">الحالة</th> */}
                                    <th class=" py-4 px-6 text-center text-gray-600 font-bold"> تفاصيل المكان  </th>
                                </tr>
                            </thead>
            
                    {filteredData.length === 0 || filteredData.length === '' ? 
                    <div className='p-5'>لا يوجد نتائج</div>
                    :
                    [...data].reverse().map((item)=>(
                        
                            <tbody class="bg-white">
                                <tr>
                                    <td class="py-4 px-6 border-b border-gray-200 max-sm:text-[13px] text-black text-right">
                                        {item.placeName}</td>

                                    <td class="py-4 px-6 border-b border-gray-200 flex flex-col gap-y-2 justify-center items-center">

                                         <Button 
                                            size="lg max-sm:sm"
                                           variant="flat"
                                           className="  text-white bg-[#005B41]  
                                           text-lg max-sm:text-base "
                                          onClick={() => handleDetails(item.id)}>
                                          تفاصيل
                                        </Button>
                                        </td>
                                    </tr>
                            </tbody>      
                    ))}
                    </table>
                </div>
                
                        </div>
                        </div>
                   
    </>
  )
}

export default RequestList


