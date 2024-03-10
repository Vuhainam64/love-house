import { Link } from "react-router-dom";
import { Logo } from "../../assets";

function DBFooter() {
  return (
    <div className="w-full border-t bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 py-2 gap-2">
        {/* First Section */}
        <div className="flex items-center justify-center">
          <p className="text-sm text-gray-600 text-center">
            © Copyright 2024. All Rights Reserved
          </p>
        </div>

        {/* Second Section */}
        <div className="flex items-center justify-center">
          <Link to={"/"}>
            <img src={Logo} alt="logo" className="h-14" />
          </Link>
        </div>

        {/* Third Section */}
        <div className="flex items-center justify-center">
          <ul className="flex space-x-8">
            <li>
              <Link
                to={"/privacy-policy"}
                className="text-gray-600 transition-colors duration-300 hover:text-blue-600"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to={"/terms-conditions"}
                className="text-gray-600 transition-colors duration-300 hover:text-blue-600"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DBFooter;
