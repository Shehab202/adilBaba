import { Search, SlidersHorizontal } from "lucide-react";
import InputWithIcon from "../global/InputIcon";

export default function SubHeaderInput() {
    return (
      <>
        <div className="flex w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12 justify-center">
          <InputWithIcon
            className="bg-white"
            startIcon={<Search />}
            endIcon={<SlidersHorizontal />}
          />
        </div>
      </>
    );
  }