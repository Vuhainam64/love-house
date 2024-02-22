import React, { createContext, useState, useEffect } from "react";

import { getAllProjects } from "../../../constants/apiProject";

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [price, setPrice] = useState("Price range (any)");
  const [houses, setHouses] = useState([]);
  const [loadingg, setLoadingg] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProjects();

        const allCountries =
          result?.result?.data?.map((item) => item.sampleProject.location) ||
          [];
        const uniqueCountries = ["Location (any)", ...new Set(allCountries)];

        setCountries(uniqueCountries);

        setHouses(result?.result?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingg(false); // Set loading to false after the data is fetched
      }
    };

    fetchData();
  }, []);

  // const handleClick = async () => {
  //   try {
  //     const result = await getAllProjects();  
  
  //     const isDefault = (str) => {
  //       return str.split(' ').includes('(any)');
  //     };
  
  //     const minPrice = parseInt(price.split(' ')[0]);
  //     const maxPrice =  parseInt(price.split(' ')[2]);

  //     const newHouses = result?.result?.data?.filter((house) => {
  //       const housePrice = parseInt(house?.sampleProject?.estimatePrice);

  //       if(
  //         house?.sampleProject?.location === country &&
  //         housePrice >= minPrice &&
  //         housePrice <= maxPrice
  //       ) {
  //         return house;
  //       }

  //       if( isDefault(country) && isDefault(price)){
  //         return house;
  //       }

  //       if(!isDefault(country) && isDefault(price)){
  //         return house?.sampleProject?.location === country;
  //       }

  //       if(!isDefault(price) && isDefault(country)){
  //         if(housePrice >= minPrice && housePrice <= maxPrice){
  //           return house
  //         }
  //       }

  //       if(!isDefault(country) && !isDefault(price)){
  //         if(housePrice >= minPrice && housePrice <= maxPrice){
  //           return house?.sampleProject?.location === country;
  //         }
  //       }
  //     }) || [];

      
  //     setTimeout (() => {
  //       return newHouses.length < 1 ? setHouses([]) : setHouses(newHouses)
  //     }, 1000)
  //     console.log(newHouses);
    
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  
  // };

  const handleClick = React.useCallback(async () => {
    try {
      const result = await getAllProjects();
      const isDefaultCountry = country === "Location (any)";
      const isDefaultPrice = price === "Price range (any)";

      const minPrice = parseInt(price.split(' ')[0]);
      const maxPrice =  parseInt(price.split(' ')[2]);
  
      const newHouses = result?.result?.data?.filter((house) => {
        const housePrice = parseInt(house?.sampleProject?.estimatePrice);
  
        if (
          (isDefaultCountry || house?.sampleProject?.location === country) &&
          (isDefaultPrice ||
            (housePrice >= minPrice && housePrice <= maxPrice))
        ) {
          return house;
        }
      }) || [];
  
      setHouses(newHouses);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [country, price]);
  
  
  useEffect(() => {
    let isMounted = true;

    setTimeout(() => {
      if (isMounted) {
        setLoadingg(false);
      }
    }, 1000);

    return () => {
      isMounted = false;
    };
  }, [houses]);

  

  return (
    <HouseContext.Provider
      value={{ country, setCountry, countries, setCountries, price, setPrice, handleClick ,houses,loadingg }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
