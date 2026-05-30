import { CheckCircle2 } from "lucide-react";
const codeImg = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
import { checklistItems } from "@/constants";
import BlurText from "./BlurText"; // Import BlurText component

const Workflow = () => {
  return (
    <div id="workflow" className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
        <BlurText
          text="Accelerate Your "
          className="inline-block"
          animateBy="words"
          direction="top"
          delay={100}
        />
        <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
          <BlurText
            text=" Learning Experiences"
            className="inline-block"
            animateBy="words"
            direction="top"
            delay={200}
          />
        </span>
      </h2>


      <div className="flex flex-wrap justify-center">
        <div className="p-2 w-full lg:w-1/2">
          <img src={codeImg} alt="code" className="w-full h-auto pt-6" />
        </div>
        <div className="pt-12 w-full lg:w-1/2">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex items-start mb-8">
              <div className="text-blue-400 mx-6 bg-900 h-10 w-10 p-2 flex justify-center items-center rounded-full">
                <CheckCircle2 />
              </div>
              <div className="ml-4">
                <h5 className="mt-1 mb-2 text-xl font-semibold">{item.title}</h5>
                <p className="text-md text-neutral-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workflow;
