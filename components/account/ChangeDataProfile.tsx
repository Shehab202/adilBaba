import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axiosClient from "@/lib/axiosClient";
import toast from "react-hot-toast";

export default function ChangeDataProfile({
    label,
    data,
    keyData,
    setRefresh
}:{
    label: string,
    data: string,
    keyData: string,
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [filed, setFiled] = useState<string|null>(data || null)

  const changeData = async (e: any) => {
    const api = await axiosClient()
    try {
        await api.post("/profile", {
          _method: "PATCH",
          [keyData] : e
        })
        toast.success("Done")
        setRefresh((prev) => !prev)
        setDisabled((prev) => !prev)
    } catch (error) {
        toast.error("Error")
    }
  }


  return (
    <div className="space-y-2">
      <Label htmlFor={label.split(' ').join("-")} className="text-xl capitalize">
        {label}
      </Label>
      <div className="flex gap-4">
        <Input
          disabled={disabled}
          id={label.split(' ').join("-")}
          defaultValue={filed || ""}
          onChange={(e) =>
            setFiled(e.target.value)
          }
        />
        {disabled ? (
          <Button
            variant="link"
            className="underline"
            onClick={() =>
              setDisabled((prev) => !prev)
            }
          >
            Change
          </Button>
        ) : (
          <Button
            variant="link"
            className="underline"
            onClick={() => changeData(filed)}
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
}
