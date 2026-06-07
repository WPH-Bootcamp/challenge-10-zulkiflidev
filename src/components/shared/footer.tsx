import React from 'react'
import Logo from './logo'
import Socialmedia from '../ui/socialmedia'

function Footer() {
  return (
    <div className="bg-neutral-950 w-full">
        <div className="max-w-[1600px] mx-auto flex flex-row flex-wrap md:flex-nowrap px-4 
                        md:px-24 lg:px-32 gap-8 md:gap-16 justify-between items-start w-full">

            <div className="flex flex-col flex-1 py-16 gap-4 items-start">
                <Logo />
                <p className="text-neutral-25 text-md">
                  Enjoy homemade flavors & chef’s signature dishes, freshly prepared every day. 
                  Order online or visit our nearest branch.
                </p>
                <p className="text-neutral-25 text-md font-bold pt-8">Follow on Social Media</p>
                <Socialmedia />
            </div>

            <div className="flex flex-col flex-1 py-16 gap-4 items-start md:items-center">
                <div className="flex flex-col gap-4 items-start">
                    <p className="text-neutral-25 font-bold">Explore</p>
                    <p className="text-neutral-25 text-md">All Food</p>
                    <p className="text-neutral-25 text-md">Nearby</p>
                    <p className="text-neutral-25 text-md">Discount</p>
                    <p className="text-neutral-25 text-md">Best Seller</p>
                    <p className="text-neutral-25 text-md">Delivery</p>
                    <p className="text-neutral-25 text-md">Lunch</p>
                </div>
            </div>

            <div className="flex flex-col flex-1 py-16 gap-4 items-start md:items-center">
                <div className="flex flex-col gap-4 items-start">
                    <p className="text-neutral-25 font-bold">Help</p>
                    <p className="text-neutral-25 text-md">How to Order</p>
                    <p className="text-neutral-25 text-md">Payment Methods</p>
                    <p className="text-neutral-25 text-md">Track My Order</p>
                    <p className="text-neutral-25 text-md">FAQ</p>
                    <p className="text-neutral-25 text-md">Contact us</p>
                </div>
            </div>
          
        </div>
    </div>
  )
}

export default Footer