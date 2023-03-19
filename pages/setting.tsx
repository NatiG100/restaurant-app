import Body from "../components/Body";
import IconButton from "../components/UIElements/IconButton";
import LabledInput from "../components/UIElements/LabledInput";
import {MdModeEdit as EditIcon} from 'react-icons/md'
import { useMutation, useQuery } from "react-query";
import { fetchSetting, TypeFetchSettingResponse, TypeUpdateSetting, updateSetting } from "../services/SettingService";
import { TypeCustomeErrorResponse, TypeMultiDataResponse } from "../types/types";
import Loading from "../components/UIElements/Loading";
import {useEffect} from 'react'
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Auth from "../components/hoc/Auth";

export default function Setting(){
    const {data,error,isLoading,refetch} = useQuery<
      TypeFetchSettingResponse,
      TypeCustomeErrorResponse
    >('fetchApplicationSetting',fetchSetting);

    useEffect(()=>{
      if(error){
        toast(error.message,{type:"error"});
      }
      else if(data){
        setValue("frontendWebDomain",data.data.frontendWebDomain);
        setValue("taxRate",data.data.taxRate);
        localStorage.setItem("frontendWebDomain",data.data.frontendWebDomain)
        toast(data.message);
      }
    },[data,error]);
    const {handleSubmit,formState:{errors},register,setValue} = useForm<TypeUpdateSetting>();
    
    const {
      mutate,
      error:updateError,
      data:updateData,
      isLoading:isUpdateLoading
    } = useMutation<
      TypeMultiDataResponse,
      TypeCustomeErrorResponse,
      TypeUpdateSetting
    >(updateSetting);
    useEffect(()=>{
      refetch();
      if(updateError){
        toast(updateError.message,{type:"error"});
      }
      else if(updateData){
        toast(updateData?.message,{type:"success"});
      }
    },[updateError,updateData]);
    const onSubmit = (data:TypeUpdateSetting)=>{
      mutate(data);
    }
    if(isLoading) return <Loading type="full"/>
    return (
        <Body title="Setting">
          <div className="w-full  max-w-xl p-8 rounded-lg shadow-sm bg-white">
            <div className="w-full max-w-sm flex flex-col gap-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <LabledInput
                  fullWidth
                  label={"Tax Rate"}
                  inputProps={{
                    placeholder:"Enter Tax Rate (%)",
                    type:"number",
                    ...register("taxRate",{required:"Tax rate is required"})
                  }}
                  error={errors.taxRate?.message}
                />
                <LabledInput
                  fullWidth
                  label={"Website Domain"}
                  inputProps={{
                    placeholder:"Enter your Website url",
                    type:"url",
                    ...register("frontendWebDomain",{required:"Website domain is required"})
                  }}
                  error={errors.frontendWebDomain?.message}
                />
                <Auth requiredPrevilage="Setting">
                  <IconButton
                    size="lg"
                    color="success"
                    className="w-full m-0 mt-8"
                    iconStart={<EditIcon/>}
                    buttonProps={{disabled:isUpdateLoading}}
                  >Edit Setting</IconButton>
                </Auth>
              </form>
            </div>
          </div>
        </Body>
    );
}