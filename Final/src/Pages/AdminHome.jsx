import React from "react";
import {Tabs, Tab} from "@nextui-org/react";


function AdminHome() {
  const [selected, setSelected] = React.useState("Dashboard");

  return (
    <>

<div className="flex flex-col w-full  bg-[#FAFAFB]">
          <Tabs
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
            fullWidth="true"
            color="success"
          >
            <Tab 
             key="dashboard"
             title="لوحة المعلومات"
             className={`text-lg font-bold p-5
              ${ selected === "dashboard" ? "text-green-900" : "" } max-sm:text-sm`}
             >
              
            </Tab>
            <Tab key="new-request"
             title="الطلبات"
             className="text-lg font-bold p-5 max-sm:text-sm"
             >
              {/* request table */}
            </Tab>
          </Tabs>
    </div>

        
    </>
  )
}

export default AdminHome






