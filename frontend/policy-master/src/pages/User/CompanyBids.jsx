import React from 'react'
import "./CompanyBids.css";


const CompanyBids = () => {
  return (
    <div>
       <div>
            <div
                className=" main flex flex-col  rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-white md:max-w-xl md:flex-row">
                <img
                    className="h-30 w-full  object-contain"
                    src="https://d1e6cjojnyo6nm.cloudfront.net/provider_small_images/Ha4RC5JQ.jpg"
                    alt="" />
                <div className="flex flex-col justify-start p-6">
                    <h5
                        className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-500">
                        Card title
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-500">
                        This is a wider card with supporting text below as a natural lead-in
                        to additional content. This content is a little bit longer.
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500">
                        Last updated 3 mins ago
                    </p>
                    <div className='main_button' >
                        <button className='buttons'>
                            Buy Now
                        </button>
                        <button className='buttons'>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default CompanyBids
