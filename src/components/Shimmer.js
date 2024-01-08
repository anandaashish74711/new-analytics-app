import React from 'react';

const Shimmer = () => {
  return (
    <div className="Restaurant-list flex-wrap">
      <div className="flex flex-wrap">
        {Array(16)
          .fill('')
          .map((_, index) => (
            <div key={index} className="shimmer md:w-1/4 w-1/2">
           
                <div className="container px-5 py-2 mx-auto h-min">
                  <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden  ">
                    <div className="lg:h-48 bg-gray-400 md:h-36  items-center  object-cover object-center animate-pulse "></div>
                   
                      
                    
                      <p className="leading-relaxed mb-3 w-1/2 h-3 animate-pulse bg-gray-400 py-2"></p>
                      <p className="leading-relaxed mb-3 w-2/3 h-3 animate-pulse bg-gray-400"></p>

                      <div className="flex items-center flex-wrap py-2">
                        <a className="bg-indigo-300 h-4 animate-pulse mt-2 w-32 inline-flex items-center md:mb-2 lg:mb-0"></a>

                      </div>
                    </div>
               
                </div>
             
            </div>
          ))}
      </div>
    </div>
  );
};

export default Shimmer;