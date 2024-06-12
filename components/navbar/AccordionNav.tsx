import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import {
  accessories,
  foods,
  hair,
  hairCare,
  kids,
  lounge,
  skinCare,
} from "@/utils/config/data";

const sections = [
  { title: "Skin Care", items: skinCare },
  { title: "Hair Care", items: hairCare },
  { title: "Hair", items: hair },
  { title: "Kids", items: kids },
  { title: "Accessories", items: accessories },
  { title: "Lounge", items: lounge },
  { title: "Food", items: foods },
];

const AccordionNav = () => {
  return (
    <div className="w-full text-base mt-4 font-ebgaramond">
      <div className="relative navbar mb-4 w-full border-b-1 border-t-0 border-l-0 border-r-0 border">
        <Link href="/" className="focus:outline-none ">
          Home
        </Link>
      </div>
      <div className="relative navbar mb-4 w-full border-b-1 border-t-0 border-l-0 border-r-0 border">
        <Link href="/brands" className="focus:outline-none ">
          Brands
        </Link>
      </div>
      <div className="mt-[-12px]">
        {sections.map((section, index) => (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="!no-underline">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-white font-ebgaramond text-base text-black w-full">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      href={item.link}
                      key={item.id}
                      className={`block py-2 border-b-1 border-t-0 border-l-0 border-r-0 border font-urbanist ${
                        itemIndex === section.items.length - 1
                          ? "border-b-0"
                          : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default AccordionNav;
