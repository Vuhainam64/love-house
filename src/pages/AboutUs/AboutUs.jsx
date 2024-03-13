import { Link } from "react-router-dom";

import { FiShare2 } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";
import { FaRegPenToSquare } from "react-icons/fa6";
import { IoAnalyticsSharp, IoShieldCheckmark } from "react-icons/io5";
import { MdConstruction, MdOutlineMessage } from "react-icons/md";
import { RiHandCoinLine, RiPencilRuler2Line } from "react-icons/ri";
import { GiHomeGarage } from "react-icons/gi";

import { About, BackgroundPattern,  Process } from "../../assets";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function AboutUs() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <section className="bg-gradient-to-b relative from-white to-gray-100 py-12 sm:py-16 lg:py-20 xl:py-24">
          <div className="absolute inset-0">
            <img
              src={BackgroundPattern}
              alt="Background"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative -mb-32 md:-mb-52 lg:-mb-72">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight">
                Easy to build{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">
                  {" "}
                  a House
                </span>
              </h1>
              <p className="mt-4 sm:mt-5 text-base leading-7 sm:text-xl sm:leading-9 font-medium text-gray-500">
                If you have problems about the house you can easily send us
                feedback now <span className="font-bold">it's free</span>
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  to={"/"}
                  className="mr-1 v-btn py-2 px-4
                  bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-orange-200
                  text-white transition ease-in duration-200 text-center text-base font-medium focus:outline-none focus:ring-2
                  focus:ring-offset-2 rounded-lg flex items-center hover:no-underline"
                >
                  <span className="no-underline mx-auto">
                    Create a house NOW{" "}
                  </span>
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 w-3 h-3 inline"
                  >
                    <path
                      d="M1 11L11 1M11 1H1M11 1V11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </Link>
              </div>
              <div className="justify-center flex gap-2 mt-10">
                <div className="flex items-center text-gray-400 text-sm">
                  <AiOutlineCheck className=" text-orange-600" />{" "}
                  <span>Unlimited forms</span>
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <AiOutlineCheck className=" text-orange-600" />{" "}
                  <span> Unlimited fields </span>
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <AiOutlineCheck className=" text-orange-600" />{" "}
                  <span>Unlimited responses</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <img
                  src={About}
                  alt="About"
                  className="w-full shadow-2xl rounded-xl block max-w-2xl lg:max-w-5xl"
                />
              </div>
              <div className="flex items-center border rounded-xl shadow-2xl">
                <p className="text-xl p-4">
                  Welcome to LOVEHOUSE Construction Services – Where Dreams Take
                  Shape! At LOVEHOUSE, we are dedicated to turning your dream
                  home into a reality. With years of experience in the
                  construction industry, our team of skilled professionals is
                  committed to providing top-notch services that bring your
                  vision to life. Whether you're envisioning a modern
                  masterpiece, a cozy family home, or a stylish urban retreat,
                  LOVEHOUSE is here to make it happen. We prioritize quality
                  craftsmanship, attention to detail, and a customer-centric
                  approach to ensure that your home is not just a structure but
                  a reflection of your lifestyle and personality.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col items-center justify-center pt-64 px-40">
          <div className="font-semibold text-2xl uppercase">
            Vision, mission and core values
          </div>
          <p className="py-2 text-gray-500 text-xl">
            Love House Origin of prosperity
          </p>
          {/* vision  */}
          <div className="flex  bg-white shadow-md border p-8 m-4">
            <div className="uppercase font-semibold text-orange-400 text-xl px-4">
              Vision
            </div>
            <div className="pl-20">
              Love house becomes the top choice of domestic and foreign
              customers in the fields of Architecture - Construction - Interior.
              Taking quality as a guideline, constantly innovating and
              perfecting, developing sustainably, and building a strong
              enterprise system.
            </div>
          </div>

          <div className="flex  bg-white shadow-md border p-8 m-4">
            <div className="uppercase font-semibold text-orange-400 text-xl px-4">
              Mission
            </div>
            <div className="pl-20">
              Love house becomes the top choice of domestic and foreign
              customers in the fields of Architecture - Construction - Interior.
              Taking quality as a guideline, constantly innovating and
              perfecting, developing sustainably, and building a strong
              enterprise system.
            </div>
          </div>

          <div className="flex  bg-white shadow-md border p-8 m-4">
            <div className="uppercase font-semibold text-orange-400 text-xl px-4">
              Core values
            </div>
            <div className="pl-20">
              Love House “L - Me”, builds a house for you like building a house
              for YOURSELF. Love House is committed to creating beautiful,
              durable projects with quick progress. Dedicated and professional
              consulting, design, and construction services. Dynamic, creative
              and effective working environment. Skilled, united and friendly
              staff.
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center pt-10 px-40">
          <div className="font-semibold text-2xl uppercase">
            WORKING PROCESS
          </div>
          <p className="py-2 text-gray-500 text-xl">
            Responsibility - Fast - Effective.
          </p>

          <div className="flex items-center justify-center">
            <div className="group">
              <div className="relative flex items-center justify-center">
                <img
                  src={Process}
                  alt="process"
                  className="group-hover:scale-110"
                />
                <div
                  className="absolute flex items-center justify-center w-[55%] h-[75%] group-hover:w-[60%] 
                group-hover:h-[85%] bg-[#87b844] rounded-full"
                >
                  <MdOutlineMessage className="text-3xl text-white group-hover:text-4xl" />
                </div>
              </div>
              <p className="flex items-center justify-center">Discussion &</p>
              <p className="flex items-center justify-center">Consulting</p>
            </div>

            <div className="group">
              <div className="relative flex items-center justify-center">
                <img
                  src={Process}
                  alt="process"
                  className="group-hover:scale-110"
                />
                <div
                  className="absolute flex items-center justify-center w-[55%] h-[75%] group-hover:w-[60%] 
                group-hover:h-[85%] bg-[#87b844] rounded-full"
                >
                  <RiHandCoinLine className="text-3xl text-white group-hover:text-4xl" />
                </div>
              </div>
              <p className="flex items-center justify-center">Survey &</p>
              <p className="flex items-center justify-center">Quote</p>
            </div>

            <div className="group">
              <div className="relative flex items-center justify-center">
                <img
                  src={Process}
                  alt="process"
                  className="group-hover:scale-110"
                />
                <div
                  className="absolute flex items-center justify-center w-[55%] h-[75%] group-hover:w-[60%] 
                group-hover:h-[85%] bg-[#87b844] rounded-full"
                >
                  <RiPencilRuler2Line className="text-3xl text-white group-hover:text-4xl" />
                </div>
              </div>
              <p className="flex items-center justify-center">Design as</p>
              <p className="flex items-center justify-center">Required</p>
            </div>

            <div className="group">
              <div className="relative flex items-center justify-center">
                <img
                  src={Process}
                  alt="process"
                  className="group-hover:scale-110"
                />
                <div
                  className="absolute flex items-center justify-center w-[55%] h-[75%] group-hover:w-[60%] 
                group-hover:h-[85%] bg-[#87b844] rounded-full"
                >
                  <GiHomeGarage className="text-3xl text-white group-hover:text-4xl" />
                </div>
              </div>
              <p className="flex items-center justify-center">Prepare</p>
              <p className="flex items-center justify-center">Construction</p>
            </div>

            <div className="group">
              <div className="relative flex items-center justify-center">
                <img
                  src={Process}
                  alt="process"
                  className="group-hover:scale-110"
                />
                <div
                  className="absolute flex items-center justify-center w-[55%] h-[75%] group-hover:w-[60%] 
                group-hover:h-[85%] bg-[#87b844] rounded-full"
                >
                  <MdConstruction className="text-3xl text-white group-hover:text-4xl" />
                </div>
              </div>
              <p className="flex items-center justify-center">Construction &</p>
              <p className="flex items-center justify-center">Installation</p>
            </div>

            <div className="group">
              <div className="relative flex items-center justify-center">
                <img
                  src={Process}
                  alt="process"
                  className="group-hover:scale-110"
                />
                <div
                  className="absolute flex items-center justify-center w-[55%] h-[75%] group-hover:w-[60%] 
                group-hover:h-[85%] bg-[#87b844] rounded-full"
                >
                  <IoShieldCheckmark className="text-3xl text-white group-hover:text-4xl" />
                </div>
              </div>
              <p className="flex items-center justify-center">Handover &</p>
              <p className="flex items-center justify-center">Warranty</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-gray-50 ">
          <div className="bg-white pt-10 pb-8">
            <div className="md:max-w-5xl md:mx-auto w-full">
              <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 pb-8">
                <div className="mb-16 max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
                  <h2 className="mb-6 font-sans text-4xl font-semibold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                    The easiest way to build house. <br /> And it's{" "}
                    <span className="text-orange-600">100% free!</span>
                  </h2>
                  <p className="text-base text-gray-700 md:text-lg">
                    Need to buy a house? Need design ideas? Do you need to
                    calculate costs? Create a form in 2 minutes and start
                    receiving submissions.
                  </p>
                </div>
                <div className="flex flex-wrap items-center mt-16">
                  <div className="w-full md:w-1/2 lg:w-5/12 md:pr-4">
                    <FaRegPenToSquare className="text-orange-600 text-4xl" />
                    <h4 className="my-5 text-2xl font-medium">1. Create</h4>
                    <p className="text-base">
                      {" "}
                      Create a form in 2 minutes. More than 10 input types,
                      images, logic and much more.{" "}
                    </p>
                    <div className="mb-8">
                      <div className="flex mt-4 items-center">
                        <AiOutlineCheck className="text-orange-600 mr-4" />{" "}
                        Build a simple form in minutes.
                      </div>
                    </div>
                    <div className="mb-8">
                      <div className="flex mt-4 items-center">
                        <AiOutlineCheck className="text-orange-600 mr-4" /> No
                        coding needed.
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 lg:w-7/12 flex items-center justify-center relative md:pl-8">
                    <img
                      src="https://files.fullstack.edu.vn/f8-prod/public-images/65b0c4d6340bd.png"
                      alt="cover-product"
                      className="block rounded-2xl w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center mt-16 md:flex-row-reverse">
                  <div className="w-full md:w-1/2 lg:w-5/12 md:pl-4">
                    <FiShare2 className="text-orange-600 text-4xl" />
                    <h4 className="my-5 text-2xl font-medium">2. Caculator</h4>
                    <p className="text-base">
                      {" "}
                      Your form has a unique link that you can resolve
                      everywhere. Send the link, or even embed the form on your
                      website.{" "}
                    </p>
                    <div className="mb-8">
                      <div className="flex mt-4 items-center">
                        <AiOutlineCheck className="text-orange-600 mr-4" />{" "}
                        Share the link to your form
                      </div>
                      <div className="flex mt-4 items-center">
                        <AiOutlineCheck className="text-orange-600 mr-4" />{" "}
                        Embed the form on your website
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 lg:w-7/12 flex items-center justify-center relative md:pr-8">
                    <img
                      src="https://files.fullstack.edu.vn/f8-prod/public-images/65b0c4f883cf8.png"
                      alt="cover-product"
                      className="block rounded-2xl w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center mt-16">
                  <div className="w-full md:w-1/2 lg:w-5/12 md:pr-4">
                    <IoAnalyticsSharp className="text-orange-600 text-4xl" />
                    <h4 className="my-5 text-2xl font-medium">
                      3. Get Results
                    </h4>
                    <p className="text-base">
                      Receive your form submissions. Receive notifications, send
                      confirmations. Export submissions and check your form
                      analytics.
                    </p>
                    <div className="mb-8">
                      <div className="flex mt-4 items-center">
                        <AiOutlineCheck className="text-orange-600 mr-4" />{" "}
                        Build a simple form in minutes.
                      </div>
                    </div>
                    <div className="mb-8">
                      <div className="flex mt-4 items-center">
                        <AiOutlineCheck className="text-orange-600 mr-4" /> No
                        coding needed.
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 lg:w-7/12 flex items-center justify-center relative md:pl-8">
                    <img
                      src="https://files.fullstack.edu.vn/f8-prod/public-images/65b0c52bb19f0.png"
                      alt="cover-product"
                      className="block rounded-2xl w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
