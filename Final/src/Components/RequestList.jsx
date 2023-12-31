import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../Config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Button, CircularProgress } from '@nextui-org/react';
import PlaceDetails from '../Pages/PlaceDetails';

function RequestList() {

    if (!localStorage.getItem('isAdmin')) {
        window.open('/', '_self')
    }

    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])
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

 const handleclick = (id) => {
    navigate(`/PlaceDetails/${id}`);
};


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

        <p class="text-right font-extrabold uppercase p-10 mt-10">الطلبات</p>
            
            <div className='mb-20'>
                    <div class="mx-4 md:mx-10">
                
                <div class="overflow-x-auto rounded-lg shadow-lg">
                    <table class="table-fixed w-full ">
                        
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class=" py-4 px-6 text-right text-gray-600 font-bold">اسم المكان</th>
                                    {/* <th class=" py-4 px-6 text-right text-gray-600 font-bold">الحالة</th> */}
                                    <th class=" py-4 px-6 text-right text-gray-600 font-bold">تفاصيل</th>
                                </tr>
                            </thead>
            
                    {[...data].reverse().map((item)=>(
                        
                            <tbody class="bg-white">
                                <tr>
                                    <td class="py-4 px-6 border-b border-gray-200 max-sm:text-[13px] text-black text-right">
                                        {item.placeName}</td>

                                    <td class="py-4 px-6 border-b border-gray-200 flex flex-col gap-y-2 justify-center items-start">

                                         <Button color="primary" 
                                         onClick={() => handleclick(item.id)}>
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


