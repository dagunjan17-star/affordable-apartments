"use client";

const PageContent = ({ pageContent = [],area }) => {
  return (
    <section className="w-full px-4 sm:px-6 pb-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="">
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            About {area }
          </h2>

          <div className="space-y-5">
            {pageContent?.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-700 leading-8 text-base md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default PageContent;