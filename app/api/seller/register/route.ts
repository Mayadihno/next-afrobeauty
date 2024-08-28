import dbConnect from "@/lib/db";
import { sellerModel } from "@/models/sellerModel";
import { tokenModel } from "@/models/tokenModel";
import { ErrorMessage } from "@/utils/ErrorMessage";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: "mayadihno@gmail.com",
    pass: "iiexolijglwkmwdq",
  },
});

export const POST = async (req: NextRequest) => {
  try {
    const { fullName, email, shopName, shopAddress, phone } = await req.json();
    await dbConnect();

    const user = await sellerModel.findOne({ email });

    if (user) {
      return ErrorMessage("User already exists with this email address", 400);
    }

    const generateToken = () => {
      const min = 100000; // Minimum 6-figure number
      const max = 999999; // Maximum 6-figure number
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const token = generateToken();

    const newToken = new tokenModel({ email, token });
    await newToken.save();

    // Render EmailTemplate to HTML string
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="text-align: center; margin-bottom: 20px;">Verify Your Email, ${
          fullName.split(" ")[0]
        }</h2>
        <p style="margin-bottom: 10px;">Thank you for registering. Please use the following token to verify your seller account:</p>
        <div style="text-align: center; margin-bottom: 20px;">
          <span style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Token: ${token}</span>
        </div>
        <p style="margin-bottom: 10px;">Your account details:</p>
        <ul style="list-style: none; padding: 0; margin-bottom: 20px;">
          <li><strong>Full Name:</strong> ${fullName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Shop Name:</strong> ${shopName}</li>
          <li><strong>Shop Address:</strong> ${shopAddress}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
        <p style="margin-top: 20px; font-size: 14px; color: #666;">If you did not register for an account, please ignore this email.</p>
      </div>
    `;

    // Send email using nodemailer
    await transporter.sendMail({
      from: "mayadihno@gmail.com",
      to: email,
      subject: "Verify your Account",
      html: htmlTemplate,
    });

    return new NextResponse(
      JSON.stringify({
        message: "Please check your email for activation token",
      }),
      { status: 200 }
    );
  } catch (error) {
    return ErrorMessage("An error occurred while processing your request", 500);
  }
};
