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

const Faqdata = ({ active }: { active: number }) => {
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
                which can be used to track your order.
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
              We hope this guide has been helpful. Happy shopping!
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
            <p className="text-lg pt-2 font-medium leading-7">
              This will show you the current location of your order and the
              estimated delivery date. You can also contact the courier service
              directly if you have any questions or concerns about your
              delivery. The courier's contact information is usually included in
              your order details or the shipping confirmation email.
            </p>
            <p className="pt-3 text-lg">
              We hope this guide has been helpful. Happy shopping!
            </p>
          </div>
        </div>
      )}
      {active === 4 && (
        <div className="">
          <h3 className="text-3xl font-semibold">
            Shipping Methods, Costs, and Delivery Time
          </h3>

          <div className="py-3">
            <h3 className="text-xl font-semibold">Shipping Methods:</h3>
            {/* <ShippingTable data={shippingData} /> */}
            <h3 className="text-xl font-semibold">Costs</h3>
            <p className="py-3 text-lg">
              Shipping costs are calculated based on the total weight of your
              order and the delivery location. The shipping cost will be
              calculated and displayed at checkout before you confirm your
              order.
            </p>
            <h3 className="text-xl font-semibold">Delivery Time Estimations</h3>
            <ul className="list-disc list-outside pl-4 text-lg my-2 marker:text-[#B10C62]">
              <li>
                For orders within Kenya, delivery usually takes 1-3 business
                days.
              </li>
              <li>
                For international orders, delivery usually takes 7-14 business
                days, depending on the destination.
              </li>
              <li>
                Orders placed after 2 PM EAT will be processed the following
                business day.
              </li>
            </ul>
            <p className="text-lg leading-7 py-3">
              Please note that delivery times are estimates and may vary due to
              factors such as customs processing, local holidays, and other
              unforeseen delays. You will receive a shipping confirmation email
              with tracking information once your order has been dispatched.
            </p>
            <p className="pt-3 text-lg">
              We hope this guide has been helpful. Happy shopping!
            </p>
          </div>
        </div>
      )}
      {active === 5 && (
        <div className="">
          <h3 className="text-3xl font-semibold">
            Selling on{" "}
            <span className="font-medium text-[#B10C62]">MayaBeauty</span>
          </h3>
          <div className="py-3">
            <h4 className="text-xl font-semibold">Become a Seller:</h4>
            <p className="py-3 text-lg">
              We welcome sellers from all over the world to join our platform.
              To become a seller on
              <span className="font-medium text-[#B10C62] px-0.5">
                MayaBeauty
              </span>
              and list your products, follow these steps:
            </p>
            <ul className="list-disc list-outside pl-4 text-lg my-2 marker:text-[#B10C62]">
              <li>Step 1: Sign up for a seller account</li>
              <li>
                Step 2: List your products, set your prices, and choose your
                shipping options.
              </li>
              <li>
                Step 3: Promote your products to attract buyers and boost your
                sales.
              </li>
              <li>
                Step 4: Fulfill your orders and ship them to your customers.
              </li>
              <li>
                Step 5: Manage your orders, inventory, and customer inquiries.
              </li>
              <li>Step 6: Track your earnings and request payouts.</li>
            </ul>
          </div>
          <div className="py-3">
            <h4 className="text-xl font-semibold">Seller Fees:</h4>
            <p className="text-lg leading-7">
              We offer competitive seller fees, which are calculated based on
              the type of products you sell, and the total value of your sales.
              You can find detailed information about our seller fees and
              pricing in the seller dashboard once you sign up.
            </p>
          </div>
          <div className="py-3">
            <h4 className="text-xl font-semibold">Seller Support:</h4>
            <p className="text-lg leading-7">
              Our dedicated seller support team is here to help you with any
              questions or issues you may have. You can reach out to us via
              email, live chat, or phone for assistance.
            </p>
            <p className="pt-3 text-lg">
              We hope this guide has been helpful. Happy selling!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function FaqAccordion({ active }: { active: number }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full md:w-[90%] 3xl:w-[80%] mx-auto"
      defaultValue={active.toString()}
    >
      <AccordionItem value="1">
        <AccordionTrigger>
          <h4 className="text-2xl font-semibold py-2">Placing an Order</h4>
        </AccordionTrigger>
        <AccordionContent>
          <Faqdata active={1} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionTrigger>
          <h4 className="text-2xl font-semibold py-2">Payment Methods</h4>
        </AccordionTrigger>
        <AccordionContent>
          <Faqdata active={2} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="3">
        <AccordionTrigger>
          <h4 className="text-2xl font-semibold py-2">Order Tracking</h4>
        </AccordionTrigger>
        <AccordionContent>
          <Faqdata active={3} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="4">
        <AccordionTrigger>
          <h4 className="text-2xl font-semibold py-2">
            Shipping & Delivery Information
          </h4>
        </AccordionTrigger>
        <AccordionContent>
          <Faqdata active={4} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="5">
        <AccordionTrigger>
          <h4 className="text-2xl font-semibold py-2">Selling on MayaBeauty</h4>
        </AccordionTrigger>
        <AccordionContent>
          <Faqdata active={5} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
