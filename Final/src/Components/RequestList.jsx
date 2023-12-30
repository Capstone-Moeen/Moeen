import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../Config/firebase';
import { collection, getDocs } from 'firebase/firestore';

function RequestList() {

    if (!localStorage.getItem('isAdmin')) {
        window.open('/', '_self')
    }

    const [isLoggIn, setIsLoggIn] = React.useState(localStorage.getItem('isLoggIn'))
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
      };

    const del = (id)=>{
        
    }


  return (
    <>
        <p class="text-right font-extrabold uppercase p-10 mt-10">الطلبات</p>
            
            <div className='mb-20'>
                    <div class="shadow-lg rounded-lg mx-4 md:mx-10">
                
                <div class="overflow-x-auto">
                    <table class="table-fixed w-full">
                        
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

                                    {/* <td class="py-4 px-6 border-b border-gray-200">
                                        {item.status === 'waiting' && <span class="bg-yellow-500 text-white py-1 px-2 rounded-full text-xs">قيد المعالجة</span>}
                                        {item.status === 'approved' && <span class="bg-green-500 text-white py-1 px-2 rounded-full text-xs">مقبول</span>}
                                       
                                        
                                    </td> */}

                                    <td class="py-4 px-6 border-b border-gray-200 flex flex-col gap-y-2 justify-center items-start">
                                        <button className='bg-gray-500 p-1 rounded-md w-16 text-white' 
                                        onClick={()=>{navigate(``)}}>تفاصيل</button></td>
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