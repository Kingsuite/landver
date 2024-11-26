'use client'

import { useEffect, useState } from "react";
import {Button} from "@/components/Button/Button";
import { Header } from "@/components/Headers/Header";
import { useAccount, useBalance } from "@starknet-react/core";
import { useLandverContract } from "@/hooks/useLandverContract";
import { useBlockies } from "@/hooks/useBlockies";
import Image from "next/image";

import { SectionHeader } from "@/components/Headers/SectionHeader";
import { TableHeader } from "@/components/table/TableHeader";
import { TableRow } from "@/components/table/TableRow";

import { useEvents } from "@/hooks/useEvents";
import { EventCard } from "@/components/Card/EventCard";



export function DashboardClientView() {

  const { address } = useAccount(); // status --> "connected" | "disconnected" | "connecting" | "reconnecting";
  const { data: balanceData } = useBalance({
    address: address,
  });

  const balance = balanceData?.formatted?.slice(0,4) || ""

  const { contract:landRegisterContract, abi:landRegisterABI } = useLandverContract({ name:"landRegister" })
  const [landsOwned, setLandsOwned] = useState<number|null>(null)
  const [landsAddresses, setLandsAdresses] = useState<string[]|null>(null)
  const { events: recentEvents } = useEvents({
    name:"landRegister",
    triggerRefetch:[address],
    filters: {
      events: [
        'LandRegistered',
        'LandTransfered',
        'LandVerified',
        'LandUpdated',
        'LandInspectorSet',
        'InspectorAdded',
        'InspectorRemoved',
        'InspectorRemoved',
        'ListingCreated',
        'ListingCancelled',
        'ListingPriceUpdated',
        'LandSold',
        ]
    }
  })

  useEffect(()=>{
    (async()=>{
      try {
        if(address){
          const result:string[] = await landRegisterContract.get_lands_by_owner(address)
          setLandsOwned(result.length)
          setLandsAdresses(result)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [address])


  return (
    <div className="">
      <Header title="Overview" hasCreateButton={true} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-6">
        <div className="w-full bg-[#6E62E5] rounded-xl">
          <div className="min-h-56 p-4 flex flex-col gap-6 items-start">
            <p className="text-xl md:text-4xl text-white font-medium">Discover, transfer and register your lands</p>
            <Button variant="white">Discover Now</Button>
          </div>
        </div>
        <Card mainIconColor="green" value={`${landsOwned}`} landIds={landsAddresses||[]} unit={""} subtitle="Total Owned Land" buttonMessage={"View Details"} hasIconsMap={true} />
        <Card mainIconColor="blue" value={balance} landIds={landsAddresses||[]} unit={balanceData?.symbol||""} subtitle="My Balance" buttonMessage={"Top Up Balance"} hasIconsMap={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5 px-6 mb-10 lg:mb-0">
        <div className="w-full bg-white rounded-xl lg:col-span-2 p-4 container_scrollable">
          <div className="h-96">
            <SectionHeader title="Best Seller" titleSize={"xl"} buttonMessage="View all" />
          
            <TableHeader 
              items={[
                { label:"NO", fixedWidth:70, },
                { label:"Land ID" },
                { label:"BUYER/LAND NAME" },
                { label:"PRICE" },
                { label:"DATE", alignText:"right" },
              ]}
              />            

          {
            [1,2,3,4,5,6].map((item, index) => {
              return (
                <TableRow 
                  key={"uniquetablerowkeu"+index}
                  items={[
                    { value:index+1, fixedWidth:70, },
                    { value:"56037-XDER" },
                    { value:"TRSS-123" },
                    { value:"0.2345" },
                    { value:"20/11/24", alignText:"right" },
                  ]}
                  headers={["NO", "LAND ID", "BUYER/LAND NAME", "PRICE", "DATE"]}
                />
              )
            })
          }
          <div className="h-10" />
        </div>
        </div>
        <div className="w-full bg-white rounded-xl p-4 container_scrollable">
          <div className="h-96">
            <SectionHeader title="Recent Activities" titleSize={"xl"} buttonMessage="View all" />
            <div className="h-10"></div>
            {
              recentEvents.map((event, index)=>{
                return (
                  <EventCard event={event} index={index} key={"dashboardrecentsactivities1e2"+index} />
                )
              })
            }
            <div className="h-10"></div>
          </div>
        </div>
      </div>

    </div>
  );
}


const LandImage = ({ landAddress }:{landAddress:string}) => {
  const { blockiesImageSrc } = useBlockies({ address:landAddress }) 
  return <Image src={blockiesImageSrc} alt="ether" fill style={{ objectFit:"cover", objectPosition:"center" }} />
}


const Card = ({ value, unit, subtitle, buttonMessage, hasIconsMap, landIds, mainIconColor}:{ value:string, unit:string, subtitle:string, buttonMessage:string, hasIconsMap:boolean, landIds:string[], mainIconColor:"blue"|"green" }) => {
  
  const landIdsToShow = landIds.length > 6 ? landIds.slice(0,6) : landIds

  return (
    <div className="w-full bg-white rounded-xl">
        <div className="min-h-56 p-4 flex flex-col gap-6 relative">
            <div className="flex gap-2 items-end">
              <p className="text-xl md:text-4xl font-bold">{ value ?? "-" }</p>
              <p className="text-xl md:text-xl font-base">{ unit }</p>
            </div>
            <p className="text-xl md:text-xl font-sm text-gray-500">{ subtitle }</p>
            <div className="relative h-[30px]">
              {
                (!!landIds&&hasIconsMap) && landIdsToShow.map((landId, index)=>{
                  const imageRandomizer = "adffhhyethtvegq" 

                  return(
                    <div key={"land-circles-on-dashboard"+index} style={{ position:"absolute", left:22*index }}>
                      <div className="w-[30px] h-[30px] bg-gray-300 rounded-full overflow-hidden relative">
                        <LandImage landAddress={landId+imageRandomizer} />
                      </div>
                    </div>
                  )
                })
              }
            </div>

            <Button variant="whiteWithBorder" >
              { buttonMessage }
            </Button>
            <div className="absolute top-7 right-4 w-[60px] h-[60px] rounded-full flex justify-center items-center" style={{ backgroundColor:mainIconColor==="blue"?"#F2FAFD":"#F4FDF9" }}>
              <div className="relative w-[40px] h-[40px] rounded-full">
                {
                  mainIconColor === "blue"&&<Image src={"/icons/common/stack-green.svg"} alt="ether" fill style={{ objectFit:"cover", objectPosition:"center" }} />
                }
                {
                  mainIconColor === "green"&&<Image src={"/icons/common/stack-blue.svg"} alt="ether" fill style={{ objectFit:"cover", objectPosition:"center" }} />
                }
              </div>
            </div>
        </div>
      </div>
  )
}