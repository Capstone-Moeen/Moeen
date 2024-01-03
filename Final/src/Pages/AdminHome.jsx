import React from 'react'
import Nav from '../Components/Nav'
import {Tabs, Tab} from "@nextui-org/react";
import RequestList from '../Components/RequestList';
import PlacesList from '../Components/PlacesList';
import { ToastContainer, toast } from 'react-toastify';
import LineChart from '../Components/LineChart';
import RatingBarChart from '../Components/BarChart';

function AdminHome() {

  if (!localStorage.getItem('isAdmin')) {
    window.open('/', '_self')
  }
    
  const [selected, setSelected] = React.useState("Dashboard");

  return (
    <>
      <Nav/>
          <ToastContainer toastStyle={{ backgroundColor: "#FAFAFB" }}></ToastContainer>
        <div className="flex flex-col w-full  bg-[#FAFAFB] p-5">
          <Tabs
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
            fullWidth="true"
            color="success"
          >
            {/* first tap  */}
            <Tab 
             key="dashboard"
             title="لوحة المعلومات"
             className={`text-lg font-bold p-5
              ${ selected === "dashboard" ? "text-green-900" : "" } max-sm:text-sm`}
             >
              احصائيات الموقع
              <div className='flex flex-wrap'>
                <div className='w-[50%] max-sm:w-[100%]'>
                  <LineChart />
                </div>

                <div className='w-[50%] max-sm:w-[100%]'>
                  <RatingBarChart />
                </div>
              </div>
              <hr />
              <PlacesList />
            </Tab>

            {/* second tap  */}
            <Tab key="new-request"
             title="الطلبات"
             className="text-lg font-bold p-5 max-sm:text-sm"
             >
              {/* request table :3 */}
              <RequestList />
            </Tab>
          </Tabs>
    </div>

        
    </>
  )
}

export default AdminHome






