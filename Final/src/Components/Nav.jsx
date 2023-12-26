import React from "react";
import { Input, Button } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
function Nav() {
  return (
    <>
      <nav className="bg-[#005B41] h-[13vh] flex justify-between py-4 px-8 items-center">
        <h1 className="text-white font-bold text-4xl">Logo</h1>
        <div className="w-[35rem] max-sm:w-[16rem]">
          <Input
            classNames={{
              base: " sm:max-w-[10rem] h-14 max-sm:hidden",
              mainWrapper: "h-full",
              input: "text-large",
              inputWrapper:
                "h-full font-normal text-default-500 bg-white w-[35rem] mr-10 max-sm:w-[4rem]",
            }}
            placeholder="بحث"
            size="lg"
            endContent={<SearchIcon size={22} />}
            type="search"
            fullWidth={true}
          />
        </div>
        <Button size="lg" className="text-black font-bold bg-white text-xl max-sm:text-sm ">
          تسجيل دخول
        </Button>
      </nav>
    </>
  );
}

export default Nav;
