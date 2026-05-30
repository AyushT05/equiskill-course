import { CheckCircle2 } from "lucide-react"
import { features, pricingOptions } from "@/constants";
import BlurText from "./BlurText";

const Pricing = () => {
    return (
        <div id="pricing" className="mt-20">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 traking-wider">
                <BlurText
                    text="Pricing"
                    className="inline-block"
                    animateBy="words"
                    direction="top"
                    delay={100}
                />
            </h2>
            <div className="flex flex-wrap">
                {pricingOptions.map((option, index) => (
                    <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                        <div className="p-10 border border-neutral-700 rounded-xl">
                            <p className="text-4xl mb-8">
                                {option.title}
                                {option.title === "Pro" && (<span className="bg-gradient-to-r from-blue-300 to-blue-500 text-transparent bg-clip-text text-xl mb-4 ml-2">
                                    (Most popular)</span>
                                )}
                            </p>
                            <p className="mb-8">
                                <span className="text-5xl mt-6 mr-2">{option.price}</span>
                                <span className="text-neutral-400 tracking-tight" >/Month</span>
                            </p>
                            <ul>
                                {option.features.map((features, index) => (
                                    <li key={index} className="mt-8 flex items-center">
                                        <CheckCircle2 />
                                        <span className="ml-2">{features}</span>
                                    </li>
                                ))}
                            </ul>
                            <a href="#" className="inline-flex justify-center items-center text-center w-full h-12 p-5
                        mt-20 tracking-tight text-xl hover:bg-blue-300 border border-blue-300 rounded-lg transition duration-200">
                                Subscribe
                            </a>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Pricing
