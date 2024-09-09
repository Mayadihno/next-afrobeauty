import { ICONS } from "@/utils/icons";

export const faqCard = [
  {
    id: 1,
    text: "Place an Order",
    icons: ICONS.order,
  },
  {
    id: 2,
    text: "Pay for your Order",
    icons: ICONS.mastercard,
  },
  {
    id: 3,
    text: "Track your Order",
    icons: ICONS.track,
  },
  {
    id: 4,
    text: "Cancel an Order",
    icons: ICONS.cancel,
  },
  {
    id: 5,
    text: "Create a Return",
    icons: ICONS.repeat,
  },
];

export const faqAccordion = [
  {
    id: 6,
    title: "Payments",
    icons: ICONS.card,
  },
  {
    id: 7,
    title: "Delivery",
    icons: ICONS.delivery,
  },
  {
    id: 8,
    title: "Returns & Refunds",
    icons: ICONS.repeat,
  },
  {
    id: 9,
    title: "Products",
    icons: ICONS.package,
  },
  {
    id: 10,
    title: "Sell on MayaBeauty",
    icons: ICONS.shop,
  },
];

export const shippingData = [
  {
    location: "Lagos",
    express: "1 - 2 BUSINESS DAY(S)",
    standard: "3 - 4 BUSINESS DAY(S)",
    overseas: "11 - 15 BUSINESS DAY(S)",
    postal: "22 - 28 BUSINESS DAY(S)",
  },
  {
    location: "Abeokuta, Ibadan",
    express: "3 - 4 BUSINESS DAY(S)",
    standard: "5 - 6 BUSINESS DAY(S)",
    overseas: "15 - 18 BUSINESS DAY(S)",
    postal: "22 - 28 BUSINESS DAY(S)",
  },
  {
    location: "Abuja, Akure, Benin, Ilorin, Port Harcourt",
    express: "4 - 6 BUSINESS DAY(S)",
    standard: "6 - 8 BUSINESS DAY(S)",
    overseas: "16 - 20 BUSINESS DAY(S)",
    postal: "22 - 28 BUSINESS DAY(S)",
  },
  {
    location: "Other Cities",
    express: "6 - 8 BUSINESS DAY(S)",
    standard: "9 - 11 BUSINESS DAY(S)",
    overseas: "16 - 20 BUSINESS DAY(S)",
    postal: "22 - 28 BUSINESS DAY(S)",
  },
];

export const paymentAccordion = [
  {
    id: 1,
    question: "What payment methods are accepted on MayaBeauty?",
    sub: "We accept a variety of payment methods including:",
    answer: [
      "Pay on Delivery allows for payment in cash, or with a credit/debit card, bank transfer, or Mastercard upon delivery.",
      "MayaBeauty accepts payment through Mastercard, Visa cards, and bank transfers.",
    ],
  },
  {
    id: 2,
    question: "How secure is my payment information on MayaBeauty?",
    answer: [
      "MayaBeauty prioritizes customer payment security with encryption, and secure servers. Regular monitoring and auditing are also performed to maintain a secure environment for transactions'",
    ],
  },
  {
    id: 3,
    question: "What do I do if my payment is declined?",
    sub: "If your payment is declined, you can check the following to resolve the issue:",
    answer: [
      "Check the  spelling and billing information you entered for accuracy.",
      "Ensure that your credit card has sufficient funds or that your bank account has enough balance.",
      "Make sure your card has not expired.",
    ],
    afterA:
      "If you've checked the above and your payment is still declined, you can contact our customer service for assistance via our livechat.",
    afterB:
      "Note: It is recommended to keep the details of the error message that appears during the declined transaction to provide to our customer service for a faster resolution.",
  },
  {
    id: 4,
    question: "Can i pay cash on delivery for my orders",
    answer: [
      "Yes, you can pay for your orders in cash upon delivery on MayaBeauty. You can choose to pay in cash or opt for other payment options such as a credit/debit card, bank transfer, or Mastercard payment - all without the need to enter payment information beforehand.",
    ],
  },
  {
    id: 5,
    question:
      "What should I do if I have been charged twice for the same order? ",
    sub: "If you have been charged twice for the same order, you can contact our customer service for assistance in resolving the issue. They can be reached through the Live Chat.Please provide the following information to our customer service when reporting a double charge:",
    answer: [
      "our name and email address used to place the order.",
      "Order number and date of purchase.",
      "Details of the double charge (amount, date, and transaction number).",
    ],
    afterA:
      "MayaBeauty customer service will assist you in resolving the issue and arranging for a refund if applicable.",
  },
  {
    id: 6,
    question: "How do I know if my payment has been processed successfully?",
    sub: "You can check the status of your payment by following these steps:",
    answer: [
      "Step 1: Go to the Orders section in your account dashboard.",
      "Step 2: Find the order in question and check its status. If the payment has been processed successfully, the order status should be Confirmed.",
    ],
    afterA:
      "You will also receive a confirmation email from MayaBeauty after a successful payment. If you do not receive a confirmation email, or if you have any concerns about your payment, you can contact our customer service via our livechat.",
  },
  {
    id: 7,
    question:
      "Can I cancel my order and get a refund after payment has been made?",
    answer: [
      "If the order hasn't been shipped yet, you can cancel your order and get a refund.",
    ],
  },
  {
    id: 8,
    question: "How long does it take for my payment to be processed?",
    answer: [
      "Most payments on MayaBeauty are processed immediately when completed. However, specific processing times may vary depending on the payment method.",
      "To ensure that your payment is processed quickly, we recommend that you double-check all the information before completing the checkout. If you are experiencing an issue with your payment, please contact our customer service team for further assistance.",
    ],
  },
];

export const deliveryAccordion = [
  {
    id: 1,
    question: "When will my order be delivered?",
    answer: [
      "Your order will be delivered on or before the delivery date stipulated at the checkout page and in the confirmation email sent. To learn more about our delivery timeline, click here.",
    ],
  },
  {
    id: 2,
    question: "How can I track my delivery?",
    sub: "To check the delivery status of your order, you can follow these steps:",
    answer: [
      " Step 1: Log in to your account.",
      "Step 2: Click on the My Account button and select ORDERS from the dropdown menu.",
      "Step 3: Locate the order for which you want to check the delivery status and click on the See Details button.",
      "Step 4: On the order details page, you will be able to see the delivery status under the Order Information section. The delivery status will indicate if the order has been shipped, is in transit, or has been delivered.",
      "Step 5: If the delivery status is Shipped, you can click on the Track Package button to view the delivery tracking information.",
      "Step 6: If you have any concerns about the delivery status, you can contact MayaBeauty's customer service team by clicking on the Help button at the top right of the page and selecting Live Chat from the dropdown menu.",
    ],
    afterA:
      "Note: When you place an order, you are provided with a delivery timeline. ",
    afterB: "On the day of delivery, the delivery agent will also call you.",
  },
  {
    id: 3,
    question: "What if I am not available to receive my delivery?",
    sub: "If you are not available to receive your delivery, you have the following options:",
    answer: [
      "Contact the delivery agent to reschedule the delivery for a more convenient time. (Note that the item can only be kept for a limited time before it is canceled as failed delivery.)",
      "If you are unable to arrange for an alternative delivery, you can contact our customer service team to request a rescheduling of the delivery. You can reach them by clicking on the Help button at the top right of the page and selecting Live Chat from the drop down menu.",
    ],
    afterA:
      "Note: It is not possible to change the delivery address once an order is placed. MayaBeauty will make a total of 2 attempts to deliver the package before canceling your order. You will be notified before they make the second attempt, so it's important to remain available to avoid order cancellation.",
  },
  {
    id: 4,
    question: "Can I change my delivery address after placing an order?",
    sub: "Once the order has been placed, it is not possible to make changes to the delivery information.",
    answer: [
      "It is important to carefully review and confirm the accuracy of your delivery information, such as your address and phone number, before placing an order on MayaBeauty. To make sure that your order is delivered properly, please double-check your delivery information on the checkout page.",
    ],
  },
  {
    id: 5,
    question: "What is the delivery fee?",
    answer: [
      "The delivery fee is the cost incurred by MayaBeauty and its logistics partners for delivering your order to the selected address. The delivery fee amount can vary based on factors such as your geographic location, the delivery method chosen, the shipment method, and the size or category of the product ordered. You can review the delivery fee before placing your order on the product page and during the checkout process.",
    ],
  },
  {
    id: 6,
    question:
      "What do I do if my delivery has not arrived within the estimated time frame?",
    sub: "If your delivery has not arrived within the estimated time frame, you can follow these steps:",
    answer: [
      "Check the order information page in your MayaBeauty account for any updates on the delivery status.",
      "Monitor communication sent through push notifications, emails, and the APP INBOX for any updates on the delivery status of your order.",
      "Contact the delivery agent by using the contact information provided in the email sent to you when your package is “out for delivery”.",
      "If you are unable to reach the delivery agent, or if the delivery status has not been updated, you can reach out to MayaBeauty's customer service team for assistance via our live chat.",
    ],
    afterA:
      "Note: We will work with you to ensure that your delivery arrives as soon as possible, so it is important to reach out to us if you have any concerns or questions regarding the delivery of your order.",
  },
  {
    id: 7,
    question: "Who do I contact if there is a problem with my delivery?",
    sub: "To contact MayaBeauty regarding a problem with your delivery, you have the following options:",
    answer: [
      "Live Chat support on the website.",
      "Calling the phone support line at 01 888 1106 (available Monday to Sunday, 8am to 8pm)",
    ],
  },
  {
    id: 8,
    question: "What happens if my delivery is damaged upon arrival?",
    answer: [
      "In case your delivery arrives damaged, reach out to our customer service team through Live Chat with details about the damage. Our customer service representatives will assist you in resolving the issue and, if eligible, arrange for a refund. Remember to promptly inspect your delivery upon arrival and report any damages.",
    ],
  },
  {
    id: 9,
    question:
      "I am unhappy with the service from the delivery associate. How can I share my feedback?",
    answer: [
      "We take customer satisfaction seriously. If you’re unhappy with the service provided by our delivery agent please contact us via our livechat to report the incident, so we can take the necessary corrective actions.",
    ],
  },
  {
    id: 10,
    question:
      "I ordered multiple products and only received one/a few. Why didn’t I receive my entire order at once?",
    sub: "Items from different vendors are shipped separately to ensure that there is no delay in fulfilling your order. You wil receive all your items within the delivery period mentioned on the product pages of each of these items. You can check the status of your order here anytime or by following these simple steps:",
    answer: [
      "Log into your MayaBeauty account",
      "Select ‘Account’ in the upper right/left hand menu.",
      " Select ‘Orders’.",
      "Find the item you would like to track and click ‘See details’",
      " Select the “track item” to display delivery details",
      "You will also receive delivery updates through email, app notifications, and app inbox, so you can easily track your order and know when it will be delivered.",
    ],
  },
  {
    id: 11,
    question:
      "Can I open my package before making a payment or reject/return my item to the delivery associate at the time of delivery?",
    answer: [
      "Payment has to be made before packages may be opened. Not to worry though when you shop on MayaBeauty you can always return an item as long as you meet the return eligibility criteria. More information can be found here.",
    ],
  },
  {
    id: 12,
    question:
      "I found the package open and the seal broken on delivery. What should I do?",
    answer: [
      "You must refuse delivery of an open package, as we cannot guarantee the conformity of the product received. We will not accept returns of unsealed products if you change your mind.",
    ],
  },
  {
    id: 13,
    question:
      "Can I ask to change the delivery of my package from ‘door delivery' to collection at a MayaBeauty Pick up Station?",
    answer: [
      "Once an order has been placed, the delivery method cannot be changed. We recommend you verify the delivery details including timelines, and shipping fees on the checkout page prior to placing your order.",
    ],
  },
];

export const productAccordion = [
  {
    id: 1,
    question: "What types of products does MayaBeauty offer?",
    answer: [
      "MayaBeauty is Nigeria's leading online store, providing customers with an extensive selection of products in multiple categories. From electronics, apparel and home décor to health and beauty products. Whether you're looking for a new laptop, phone, or fashion accessories, MayaBeauty has something for everyone.",
    ],
  },
  {
    id: 2,
    question: "How do I search for a specific product?",
    answer: [
      "You can search for a specific product on MayaBeauty by using the search bar located at the top of the website. Enter the name of the product you are looking for into the search bar, and then click the 'search' button. You will be presented with a list of results which match your search criteria. You can then browse through the list to find the exact product you are looking for. Additionally, you can narrow down your search results by selecting filters such as price range, brand and more.",
    ],
  },
  {
    id: 3,
    question: "How can I view product details and specifications?",
    answer: [
      "Product details and specifications for items sold on MayaBeauty can be easily accessed by clicking on the product's listing. Once you have selected the desired item, scroll down to the bottom of the page where you will find a detailed description of the product's features and specifications. The product's details also include a list of images for the product, ratings and reviews from other customers, and a list of related items.",
    ],
  },
  {
    id: 4,
    question: "How do I know if a product is in stock?",
    answer: [
      "You can simply visit the product page and look for the In Stock label. If the product is currently in stock, you will see the In Stock label. If the product is not in stock, the label will not be present. If you need to check the availability of a specific item, you can also use the search bar on the MayaBeauty website. Enter the product name or SKU number to see if it is in stock. If the product is available, you will also see the In Stock label on the product page.",
    ],
  },
  {
    id: 5,
    question: "How can I provide feedback or write a review for a product?",
    sub: "Just follow these steps: ",
    answer: [
      "Step 1: Go to your account in the top right corner of the main page.",
      "Step 2: Choose “Pending Reviews”.",
      "Step 3: Find the item you purchased and select “Write a Review”.",
      "Step 4: Provide your honest feedback regarding the product and submit it",
    ],
    afterA:
      "Your feedback will be visible to other customers and can help them make informed decisions when purchasing from MayaBeauty.",
  },
  {
    id: 6,
    question: "Why do I see different prices for the same product?",
    answer: [
      "MayaBeauty has thousands of sellers and it is normal that same item is sold by multiple sellers. This allows you to choose your preferred seller considering their ratings and offer. When a product is sold by different sellers you will find the alternatives available on the product page.",
    ],
  },
  {
    id: 7,
    question:
      "I ordered multiple products and only received one/a few. Why didn’t I receive my entire order at once?",
    sub: "Items from different vendors are shipped separately to ensure that there is no delay in fulfilling your order. You wil receive all your items within the delivery period mentioned on the product pages of each of these items. You can check the status of your order here anytime or by following these simple steps:",
    answer: [
      "Log into your MayaBeauty account",
      "Select ‘Account’ in the upper right/left hand menu",
      "Select ‘Orders’",
      "Find the item you would like to track and click ‘See details’",
      "Select the “track item” to display delivery details",
      "ou also receive delivery updates via email Account mailbox and App notifications to make it easy to know when your order will be delivered.",
    ],
    afterA:
      "We will also send regular updates via email My Account Inbox or App push notifications.",
  },
  {
    id: 8,
    question: "I am having trouble adding products to my cart. What do I do?",
    answer: [
      "If you are having trouble adding products to your cart please make sure that you have made all relevant size and color selections. If you still have problems this may mean that the item you are trying to buy is sold out.",
      "For additional support contact us at 07006000000. Our hours of operations are 8am - 8pm on Mondays to Sundays.",
    ],
  },
  {
    id: 9,
    question:
      "I see you are selling some packaging material such as boxes, wrapping plastic etc. How can I go about purchasing these items?",
    answer: [
      "Please note such products carrying the tag For MayaBeauty Vendors Only are reserved to eligible MayaBeauty sellers only, to ensure we deliver your orders in a packaging that meets our standard and your expectations. Therefore, you are not entitled to purchase such products unless you have an active MayaBeauty seller account.",
    ],
  },
];

export const sellAccordion = [
  {
    id: 1,
    question: "What is MayaBeauty Marketplace?",
    sub: "MayaBeauty Marketplace is an e-commerce platform that allows businesses and individuals to sell their products online to a large customer base.",
  },
  {
    id: 2,
    question: "How do I become a MayaBeauty Marketplace seller?",
    sub: "To become a MayaBeauty Marketplace seller, you need to register as a vendor on the MayaBeauty website, submit your product catalog, and start selling.",
  },
  {
    id: 3,
    question: "What kind of products can I sell on MayaBeauty Marketplace?",
    sub: "You can sell a wide range of products, including fashion, electronics, home and appliances, health and beauty, and many others.",
  },
  {
    id: 4,
    question: "Is it free to sell on MayaBeauty Marketplace?",
    sub: "Opening a store on MayaBeauty is absolutely free. You can open a store at any time and start selling as quickly as you can upload your products online; though there are fees and commissions for delivered products.",
  },
  {
    id: 5,
    question:
      "What are the payment options for selling on MayaBeauty Marketplace?",
    sub: "MayaBeauty Marketplace supports a variety of payment options, including cash on delivery, bank transfers, mobile and online payments.",
  },
  {
    id: 6,
    question: "How do I list my products on MayaBeauty Marketplace?",
    sub: "To list your products on MayaBeauty Marketplace, you need to create a seller account, complete the new seller training, provide product details, and upload product images.",
  },
  {
    id: 7,
    question:
      "How does MayaBeauty Marketplace handle customer returns and refunds?",
    sub: "MayaBeauty Marketplace has a returns and refund policy in place to handle customer complaints and ensure a smooth customer experience.",
  },
  {
    id: 8,
    question:
      "What support does MayaBeauty Marketplace provide to its sellers?",
    sub: "MayaBeauty Marketplace provides a variety of support services to its sellers, including training, account management, marketing support, and vendor support service.",
  },
  {
    id: 9,
    question: "How does MayaBeauty Marketplace handle shipping and delivery?",
    sub: "MayaBeauty Marketplace handles all the shipping and delivery towards the customer for all products that are sold on the platform.",
  },
  {
    id: 10,
    question: "How do I get paid for sales made on MayaBeauty Marketplace?",
    sub: "Sellers receive payments for their sales on MayaBeauty Marketplace through bank transfers or mobile money payments.",
  },
];
