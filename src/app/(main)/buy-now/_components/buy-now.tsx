"use client"
import React, { useState } from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const BuyNow = () => {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [saveInfo, setSaveInfo] = useState(false);

  return (
    <div className='flex min-h-screen bg-gray-50'>
 
      <div className='w-full lg:w-[55%] p-8 lg:p-12 bg-white'>
        <div className='max-w-xl mx-auto'>
       

         <div className='flex justify-between items-center'>
          <div className='mb-6 flex items-center gap-3'>
            <div className='flex-shrink-0 mt-0.5'>
             <ShieldCheck fill='#14A752' stroke='white' size={50} />
            </div>
            <div>
              <p className='text-lg font-medium '>Authenticate this watch</p>
              <p className='text-xs  mt-1'>An additional of $200 will be charged to authenticate this watch</p>
            </div>
          </div>
          <Switch/>
</div>
          {/* Contact Section */}
          <div className='mb-6'>
            <h2 className='text-lg font-semibold mb-3'>Contact</h2>
            <input 
              type='email' 
              placeholder='Email'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Delivery Section */}
          <div className='mb-6'>
            <h2 className='text-lg font-semibold mb-3'>Delivery</h2>
            <div className='mb-4'>
              <select className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'>
                <option>Country/Region</option>
                <option>United States</option>
              </select>
            </div>
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <input 
                type='text' 
                placeholder='First Name'
                className='px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <input 
                type='text' 
                placeholder='Last Name'
                className='px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <input 
              type='text' 
              placeholder='Address'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input 
              type='text' 
              placeholder='Apartment, Suite, etc. (optional)'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <div className='grid grid-cols-3 gap-4 mb-4'>
              <input 
                type='text' 
                placeholder='City'
                className='px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <input 
                type='text' 
                placeholder='State'
                className='px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <input 
                type='text' 
                placeholder='Postal code (optional)'
                className='px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <input 
              type='tel' 
              placeholder='Phone No.'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <label className='flex items-center gap-2 cursor-pointer'>
              <input 
                type='checkbox' 
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
                className='w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
              />
              <span className='text-sm text-gray-700'>Save this information for next time</span>
            </label>
          </div>

          {/* Payment Section */}
          <div className='mb-6'>
            <h2 className='text-lg font-semibold mb-3'>Payment</h2>
            <div className='flex items-center gap-2 p-4 border border-gray-300 rounded-lg mb-4'>
              <input type='radio' name='payment' defaultChecked className='w-4 h-4 ' />
              <span className='text-sm font-medium'>Visa</span>
              <span className='text-sm text-gray-500'>****2345</span>
              <div className='ml-auto w-5 h-5 bg-green-500 rounded-full flex items-center justify-center'>
                <Check className='w-3 h-3 text-white' />
              </div>
            </div>
            <button className='text-sm text-blue-600 font-medium'>+ Add other</button>
          </div>

          {/* Billing Address Section */}
          <div className='mb-6'>
            <h2 className='text-lg font-semibold mb-3'>Billing Address</h2>
            <label className='flex items-center gap-2 p-4 border border-gray-300 rounded-lg cursor-pointer'>
              <input 
                type='radio' 
                name='billing'
                checked={sameAsShipping}
                onChange={() => setSameAsShipping(true)}
               className="w-5 h-5 checked:bg-white appearance-none border-gray-300 rounded-full border-4 checked:border-[#14A752]"
              />
              <span className='text-sm'>Same as shipping address</span>
            </label>
            <label className='flex items-center gap-2 p-4 border border-gray-300 rounded-lg cursor-pointer mt-3'>
              <input 
                type='radio' 
                name='billing'
                checked={!sameAsShipping}
                onChange={() => setSameAsShipping(false)}
               className="w-5 h-5 checked:bg-white appearance-none border-gray-300 rounded-full border-4 checked:border-[#14A752]"
              />
              <span className='text-sm'>Use a different billing address</span>
            </label>
          </div>

          {/* Pay Button */}
          <button className='w-full bg-gray-900 text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors'>
            Pay Now
          </button>
        </div>
      </div>

      <div className='hidden lg:block w-[45%]  bg-gray-50 p-12'>
        <div className=''>
          <div className='mb-6 flex justify-between bg-white p-2 rounded-xl'>
            <h3 className='text-sm font-semibold mb-1'>Watch reference ID</h3>
            <p className='text-xs text-gray-600'>#76622</p>
          </div>

          {/* Product */}
          <div className='flex gap-4 mb-6 pb-6 border-b border-gray-200'>
            <div className='relative'>
              <img 
                src='https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200&h=200&fit=crop'
                alt='Watch'
                className='w-20 h-20 rounded-lg object-cover'
              />

            </div>
            <div className='flex-1'>
              <p className='text-sm font-medium mb-1'>Audemars Piguet Royal Oak</p>
              <p className='text-xs text-gray-500'>Automatic</p>
            </div>
            <div className='text-sm font-medium'>$7765.76</div>
          </div>

          {/* Price Breakdown */}
          <div className='space-y-3 mb-6'>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600'>Total Amount</span>
              <span className='font-medium'>$7765.76</span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600'>Shipping</span>
              <span className='font-medium'>$120.50</span>
            </div>
            <div className='flex justify-between text-base font-semibold pt-3 border-t border-gray-200'>
              <span>TOTAL</span>
              <span>USD $7886.08</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;