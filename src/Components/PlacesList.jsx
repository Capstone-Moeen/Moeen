import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../Config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Button, CircularProgress } from '@nextui-org/react';
import PlaceDetails from '../Pages/PlaceDetails';
import RatingMoeenPopUp from './RatingMoeenPopUp';
import {Input} from "@nextui-org/react";

function PlacesList() {

    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])
    const navigate = useNavigate()
    const [search, setSearch] = React.useState('');

    React.useEffect(()=>{
        getData()
    }, [])

    const getData = async () => {
        const query = await getDocs(collection(db, "AcceptedPlaces"));
        const data = query.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        
        setData(data);
        setLoading(false)
      };

      const handleUpdate =(id)=>{
        navigate(`/Dashboard/Update/${id}`);
      }

      const filteredData = data.filter((item) =>
      item.placeName.includes(search)
    )
  
  // for Rating in model
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  return (
    <> 
    {loading && (
        <div className="w-full h-[100vh] max-sm:h-screen bg-black 
        opacity-35 z-20 absolute top-0 left-0 flex justify-center 
        items-center ">
          <CircularProgress
            className="z-50"
            color="primary"
            label="Proccesing"
          ></CircularProgress>
        </div>
      )}

      
      <p class="text-right font-extrabold uppercase p-10 mt-10 max-sm:py-5 
        max-sm:px-0">الاماكن</p>  

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
                                <tr class="bg-gray-100 ">
                                    <th class=" py-4 px-6 text-center text-gray-600 font-bold">اسم المكان</th>
                                    {/* <th class=" py-4 px-6 text-right text-gray-600 font-bold">الحالة</th> */}
                                    <th class=" py-4 px-6 text-center text-gray-600 font-bold">خيارات</th>

                                </tr>
                            </thead>
            
                    {filteredData.length === 0 || filteredData.length === '' ? 
                    <div className='p-5'>لا يوجد نتائج</div>
                    :
                    [...filteredData].reverse().map((item, index)=>(
                        
                      <tbody class="bg-white" key={index}>
                          <tr>
                              <td class="py-4 px-6 border-b border-gray-200 max-sm:text-[13px] text-black text-right">
                                  {item.placeName}</td>

                              <td class="py-4 px-6 border-b border-gray-200 flex  gap-3 justify-evenly max-sm:flex-col ">

                                   <Button
                                    size="lg max-sm:sm"
                                     variant="flat"
                                     className="  text-white bg-[#005B41]  
                                     text-lg max-sm:text-base "
                                     onClick={() => handleUpdate(item.id)}>
                                      تحديث
                                  </Button>

                                  <Button 
                                   size="lg max-sm:sm"
                                   variant="flat"
                                   className=" text-[#005B41] bg-[#E4EFE7]
                                    text-lg max-sm:text-base "
                                    onClick={openModal}
                                    >
                                   تقييم
                                  </Button>


                                  </td>
                              </tr>
                      </tbody>  
              ))}
                    </table>
                </div>
                
          </div>
       </div>
       <RatingMoeenPopUp isOpen={isModalOpen} openModal={openModal}  />
    </>
  )
}

export default PlacesList