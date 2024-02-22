import React, { useState, useEffect, useContext } from "react";

import { RiWallet3Line, RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

import { Menu } from "@headlessui/react";

import { HouseContext } from "./HouseContext";


export default function PriceRangeDropdown() {
  const { price, setPrice } = useContext(HouseContext);


  const [isOpen, setIsOpen] = useState(false);

  const prices = [
    {
      value: 'Price range (any)',
    },
    {
      value: '1.000.000.000 - 3.000.000.000',
    },
    {
      value: '3.000.000.000 - 5.000.000.000',
    },
  ]

  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <RiWallet3Line className="dropdown-icon-primary" />
        <div>
          <div className="text-[15px] font-medium leading-tight">{price}</div>
          <div className="text-[13px]">Choose price range</div>
          
        </div>
        {isOpen ? (
            <RiArrowUpSLine className="dropdown-icon-secondary" />
          ) : (
            <RiArrowDownSLine className="dropdown-icon-secondary" />
          )}
      </Menu.Button>

      <Menu.Items className="dropdown-menu">
            {prices.map((price, index) => {
              return(
                <Menu.Item
                onClick={() => setPrice(price.value)}
                className="cursor-pointer hover:text-baseGreen transition"
                as='li'
                key={index}>
                  {price.value}
                </Menu.Item>
              )
            })}
      </Menu.Items>
    </Menu>
  );
}
