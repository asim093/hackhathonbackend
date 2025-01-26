import bcrypt from "bcryptjs";
import { transporter } from "../config/mail-config.js";
import dotenv from "dotenv";
import sendMail from "../utils/email-send.js";
import Loan from "../Models/Loan.model.js";

dotenv.config();

// Generate a random 8-digit password
function generatePassword() {
  return Math.random().toString(36).slice(-8); // Generates a random string of 8 characters
}

export const createloan = async (req, res) => {
  try {
    // Log incoming request body for debugging
    console.log("Request body:", req.body);

    const { name, email, cnic, category, depositAmount, loanPeriod } = req.body;

    // Ensure these fields are numbers and not strings
    const deposit = parseFloat(depositAmount);
    const period = parseInt(loanPeriod, 10);

    if (isNaN(deposit) || isNaN(period)) {
      return res.status(400).json({ message: "Invalid deposit amount or loan period" });
    }

    const generatedPassword = generatePassword();

    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const maxLoan = 1000000;
    const remainingLoan = maxLoan - deposit;
    const monthlyInstallment = remainingLoan / (loanPeriod * 12);

    const htmlTemplate = `<h1>Loan Account Created</h1>
                          <p>Dear ${name},</p>
                          <p>Your loan account has been successfully created.</p>
                          <p>Your login details:</p>
                          <ul>
                            <li>Email: ${email}</li>
                            <li>Password: ${generatedPassword}</li>
                          </ul>
                          <p>Please log in and change your password as soon as possible.</p>`;

    await sendMail({
      email: [email],
      subject: "Loan Account Created",
      htmlTemplate,
    });

    const newLoan = new Loan({
      user: {
        name,
        email,
        password: hashedPassword,
        cnic,
      },
      loanDetails: {
        category,
        depositAmount: deposit,
        remainingLoan,
        monthlyInstallment,
        loanPeriod: period,
      },
    });

    await newLoan.save();

    res.status(201).json({
      message: "Loan created successfully",
      loan: newLoan,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating loan:", error);
    res.status(500).json({ message: "Error creating loan", error: error.message });
  }
};
