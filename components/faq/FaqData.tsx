/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import React from "react";
import ShippingTable from "./ShippingTable";
import {
  deliveryAccordion,
  paymentAccordion,
  productAccordion,
  sellAccordion,
  shippingData,
} from "./data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqData = ({ active }: { active: number }) => {
  return (
    <div className="pl-3">
      {active === 1 && (
        <div className="">
          <h3 className="text-3xl font-semibold">How to place an order</h3>
          <h6 className="py-4 text-lg">
            Place an order in a few simple steps:
          </h6>
          <div className="">
            <h3 className="text-xl font-semibold">
              Step 1: Browse and choose your product
            </h3>
            <ul className="list-disc list-outside pl-4 text-lg my-2 marker:text-[#B10C62]">
              <li className="">
                Browse the
                <Link href={"/"} className="text-[#B10C62] px-1 text-lg">
                  MayaBeauty WEBSITE
                </Link>
                or use the search bar to find the product you want to order.
              </li>
              <li>
                Click on the product to view more information and details.
              </li>
            </ul>
          </div>
          <div className="pt-4">
            <h3 className="text-xl font-semibold">
              Step 2: Add your product to your cart.
            </h3>
            <ul className="list-disc list-outside pl-4 text-lg my-2 marker:text-[#B10C62]">
              <li className="">
                Review the product content and Click on the “Add to Cart” button
              </li>
              <li>
                Select the desired quantity of the product in your cart and
                proceed to checkout.
              </li>
            </ul>
          </div>
          <div className="pt-4">
            <h3 className="text-xl font-semibold">
              Step 3: Complete the checkout
            </h3>
            <ul className="list-disc list-outside pl-4 text-lg my-2 marker:text-[#B10C62]">
              <li className="">
                Fill in your delivery address and choose your preferred delivery
                method.
              </li>
              <li>
                Review your order information and click on the “Confirm Delivery
                Details” button.
              </li>
            </ul>
          </div>
          <div className="pt-4">
            <h3 className="text-xl font-semibold">
              Step 4: Select your payment method and pay for your order
            </h3>
            <ul className="list-disc list-outside pl-4 text-lg my-2 marker:text-[#B10C62]">
              <li className="">Select your preferred payment method</li>
              <li>
                Click on "Confirm Payment Method" and complete the payment
                process.
              </li>
            </ul>
          </div>
          <div className="pt-4">
            <h3 className="text-xl font-semibold">
              Step 5: Review your order summary
            </h3>
            <ul className="list-disc list-outside pl-4 text-lg my-2 marker:text-[#B10C62]">
              <li>
                Check all order details, quantity, amount and click on " Confirm
                Order".
              </li>
              <li>
                Once your order is placed, a unique order number is generated,
                which can be used to track your order.{" "}
              </li>
            </ul>
          </div>
          <div className="pt-4">
            <p className="text-base">
              <span className="tex-lg font-semibold">Note:</span> To ensure a
              smooth order process, please ensure to provide accurate and
              complete delivery information and choose a payment method that is
              available in your location.
            </p>
            <p className="text-base pt-4 pb-2">
              We hope this guide has been helpful. Happy shopping
            </p>
          </div>
        </div>
      )}
      {active === 2 && (
        <div className="">
          <h3 className="text-3xl font-semibold">How to pay for your order</h3>

          <h5 className="text-lg py-3">
            <Link
              href={"/"}
              className="text-[#B10C62] pr-1 text-xl font-semibold"
            >
              MayaBeauty
            </Link>
            offers multiple payment options. Pay for the item Online or on
            delivery by using your card, bank transfer. You can also pay for
            your order using a voucher.
          </h5>
          <div className="py-2">
            <h4 className="text-lg font-semibold">Option 1: Pay On Delivery</h4>
            <p className="text-base">
              You can pay for your orders upon delivery in a variety of ways to
              accommodate your needs. Choose to pay in cash, or opt for a
              credit/debit card, bank transfer, or Mastercard payment.
            </p>
          </div>
          <div className="py-2">
            <h4 className="text-lg font-semibold">Option 2: Online Payment</h4>
            <p className="text-base">
              You can securely pay for your order on
              <span>
                <Link
                  href={"/"}
                  className="text-[#B10C62] px-0.5 text-base font-medium"
                >
                  MayaBeauty
                </Link>
              </span>
              using Mastercard, Visa, or Verve cards, as well as Paypal, or card
              payment.
            </p>
          </div>
          <p className="py-2 text-lg font-medium">
            Choose the payment option that works best for you for a hassle-free
            shopping experience.
          </p>
          <div className=" py-2">
            <h3 className="text-xl font-semibold pb-2">
              Paying for Your Order - A Step by Step Guide
            </h3>
            <ul className="list-disc list-outside pl-4 font-medium text-lg my-2 marker:text-[#B10C62]">
              <li>
                Step 1: Select the item of your choice and proceed to click on
                checkout.
              </li>
              <li>Step 2: Choose your payment method</li>
              <li>
                Step 3: Complete your payment
                <p className="text-base font-normal pl-2 pb-2">
                  For payment upon delivery, including cash on delivery,
                  credit/debit card payment, and bank transfer, simply wait for
                  your order to be delivered and choose your preferred payment
                  method.
                </p>
              </li>
              <li>
                Step 4: Confirm your payment
                <p className="text-base font-normal pl-2 pb-2">
                  Once your payment is complete, you will receive an order
                  confirmation email.
                </p>
              </li>
            </ul>
            <p className="text-lg leading-7 py-2">
              If you've chosen online payment, the payment confirmation page
              will also display your payment details. If you experience any
              issues with payment, please don't hesitate to reach out to our
              customer support team. We are here to help you and make sure that
              your shopping experience on{" "}
              <span className="font-medium text-[#B10C62] px-0.5">
                MayaBeauty
              </span>
              is as smooth as possible.
            </p>
            <p className="pt-3 text-lg">
              We hope this guide has been helpful. Happy shopping!
            </p>
          </div>
        </div>
      )}
      {active === 3 && (
        <div className="">
          <h3 className="text-3xl font-semibold">How to track your order</h3>

          <div className="py-3">
            <ul className="list-disc list-outside pl-4 font-medium text-lg my-2 marker:text-[#B10C62]">
              <li>
                Step 1: Log in to your
                <span>
                  <Link
                    href={"/login"}
                    className="text-[#B10C62] px-1 font-medium"
                  >
                    MayaBeauty
                  </Link>
                </span>
                account
              </li>
              <li>
                Step 2: Click on the
                <span>
                  <Link
                    href={"/orders"}
                    className="text-[#B10C62] px-1 font-medium"
                  >
                    Orders
                  </Link>
                </span>
                tab in your account dashboard.
              </li>
              <li>
                Step 3: Find the order you want to track and click on "See
                Details".
              </li>
              <li>
                Step 4: On the order details page, click on track my item to
                view the current status and you will have see the status of the
                order.
              </li>
            </ul>
            <p className="text-lg pt-2 font-medium">
              Stay updated on the status of your order and enjoy a seamless
              shopping experience by following these simple steps.
            </p>
            <div className="pt-3">
              <h3 className="text-lg font-semibold py-1">Delivery timelines</h3>
              <p className="text-lg pb-2">
                Business days are Monday - Friday (In addition to Saturday for
                Express and standard shipping orders delivered to Lagos, Ibadan
                & Abeokuta)
              </p>
              <p className="text-lg">
                The below delivery timelines are for orders placed before 2pm.
                Note that orders placed after 2pm are +1 day added to the
                delivery timelines.
              </p>
            </div>
            <div className="overflow-x-auto mt-10">
              <table className="min-w-full border-collapse border-b">
                <thead>
                  <tr>
                    <th className=" "> </th>
                    <th className="border p-2">EXPRESS SHIPPING</th>
                    <th className="border p-2">STANDARD SHIPPING</th>
                    <th className="border p-2">SHIPPED FROM OVERSEAS</th>
                    <th className="border p-2 ">POSTAL SERVICE</th>
                  </tr>
                </thead>
                <tbody>
                  {shippingData.map((data, index) => (
                    <ShippingTable
                      key={index}
                      location={data.location}
                      express={data.express}
                      standard={data.standard}
                      overseas={data.overseas}
                      postal={data.postal}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {active === 4 && (
        <div className="">
          <h3 className="text-3xl font-semibold">
            To cancel an item or an order
          </h3>
          <h5 className="text-lg font-medium pt-5 pb-3">
            Contact Customer Support on 08136908207
          </h5>
          <div className="mb-3 text-lg leading-7">
            <p className="py-3">
              <span className=" font-bold pr-1">Note:</span> You can only cancel
              an item or an order before it is shipped. Once your order has been
              shipped, it cannot be canceled by our customer service agents.
            </p>
            <p className="">
              If your order was prepaid, please note that the refund processing
              time may vary depending on the payment method:
            </p>
            <p className="py-3">
              If payment was made by card or bank transfer, your refund will be
              processed within 24 hours, and it may take 3–10 business days for
              the refund to reflect in your bank account.
            </p>
            <p>Thank you for shopping with us.</p>
          </div>
        </div>
      )}
      {active === 5 && (
        <div className="">
          <h3>Cancel Orders</h3>
        </div>
      )}
      {active === 6 && (
        <div className="">
          <Accordion type="single" collapsible className="w-full">
            {paymentAccordion.map((item) => {
              return (
                <div key={item.id}>
                  <AccordionItem key={item.id} value={item.question}>
                    <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {item.sub && <p className="text-lg pb-2">{item.sub}</p>}
                      {Array.isArray(item.answer) && (
                        <ul className="list-disc pl-5 text-lg marker:text-[#B10C62]">
                          {item.answer.map((answerItem, index) => (
                            <li key={index}>{answerItem}</li>
                          ))}
                        </ul>
                      )}
                      {item.afterA && (
                        <p
                          dangerouslySetInnerHTML={{ __html: item.afterA }}
                          className="mt-5 text-lg"
                        />
                      )}
                      {item.afterB && (
                        <p
                          dangerouslySetInnerHTML={{ __html: item.afterB }}
                          className="text-lg py-2"
                        />
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              );
            })}
          </Accordion>
        </div>
      )}
      {active === 7 && (
        <div className="">
          <Accordion type="single" collapsible className="w-full">
            {deliveryAccordion.map((item) => {
              return (
                <div key={item.id}>
                  <AccordionItem key={item.id} value={item.question}>
                    <AccordionTrigger className="text-xl text-left font-semibold hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {item.sub && <p className="text-lg pb-2">{item.sub}</p>}
                      {Array.isArray(item.answer) && (
                        <ul className="list-disc pl-5 text-lg marker:text-[#B10C62]">
                          {item.answer.map((answerItem, index) => (
                            <li key={index}>{answerItem}</li>
                          ))}
                        </ul>
                      )}
                      {item.afterA && (
                        <p
                          dangerouslySetInnerHTML={{ __html: item.afterA }}
                          className="mt-5 text-lg"
                        />
                      )}
                      {item.afterB && (
                        <p
                          dangerouslySetInnerHTML={{ __html: item.afterB }}
                          className="text-lg py-2"
                        />
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              );
            })}
          </Accordion>
        </div>
      )}
      {active === 8 && (
        <div className="">
          <h3>Returns and Refund Policy</h3>
        </div>
      )}
      {active === 9 && (
        <div className="">
          <Accordion type="single" collapsible className="w-full">
            {productAccordion.map((item) => {
              return (
                <div key={item.id}>
                  <AccordionItem key={item.id} value={item.question}>
                    <AccordionTrigger className="text-xl text-left font-semibold hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {item.sub && <p className="text-lg pb-2">{item.sub}</p>}
                      {Array.isArray(item.answer) && (
                        <ul className="list-disc pl-5 text-lg marker:text-[#B10C62]">
                          {item.answer.map((answerItem, index) => (
                            <li key={index}>{answerItem}</li>
                          ))}
                        </ul>
                      )}
                      {item.afterA && (
                        <p
                          dangerouslySetInnerHTML={{ __html: item.afterA }}
                          className="mt-5 text-lg"
                        />
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              );
            })}
          </Accordion>
        </div>
      )}
      {active === 10 && (
        <div className="">
          <div className="">
            <Accordion type="single" collapsible className="w-full">
              {sellAccordion.map((item) => {
                return (
                  <div key={item.id}>
                    <AccordionItem key={item.id} value={item.question}>
                      <AccordionTrigger className="text-xl text-left font-semibold hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        {item.sub && <p className="text-lg pb-2">{item.sub}</p>}
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                );
              })}
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqData;
