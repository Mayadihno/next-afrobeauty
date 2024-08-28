import dbConnect from "@/lib/db";
import { UserModel } from "@/models/userModel";
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

export const POST = async (request: NextRequest) => {
  const { email } = await request.json();
  if (!email) {
    return ErrorMessage("Email is required", 400);
  }
  await dbConnect();
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return ErrorMessage("User not found", 404);
    }
    const generateToken = () => {
      const min = 100000; // Minimum 6-figure number
      const max = 999999; // Maximum 6-figure number
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const token = generateToken();
    // Render EmailTemplate to HTML string
    const htmlTemplate = `
         <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
  <h2 style="text-align: center; margin-bottom: 20px;">Reset Your Password, ${
    user.name.split(" ")[0]
  }</h2>
  <p style="margin-bottom: 10px;">We received a request to reset your password. Please use the following token to create a new password:</p>
  <div style="text-align: center; margin-bottom: 20px;">
    <span style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Token: ${token}</span>
  </div>
  <p style="margin-bottom: 10px;">Your account details:</p>
  <ul style="list-style: none; padding: 0; margin-bottom: 20px;">
    <li><strong>User ID:</strong> ${user.name}</li>
    <li><strong>Email:</strong> ${user.email}</li>
  </ul>
  <p style="margin-top: 20px; font-size: 14px; color: #666;">If you did not request a password reset, please ignore this email.</p>
</div>
 `;

    // Send email using nodemailer
    await transporter.sendMail({
      from: "mayadihno@gmail.com",
      to: user.email,
      subject: "Verify your Account",
      html: htmlTemplate,
    });

    return new NextResponse(
      JSON.stringify({ message: "Email sent successfully", token }),
      { status: 200 }
    );
  } catch (error) {}
};
