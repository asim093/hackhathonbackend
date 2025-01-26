import bcrypt from "bcryptjs";
import { transporter } from "../config/mail-config.js";
import dotenv from "dotenv";
import sendMail from "../utils/email-send.js"; // Keep this import
import { Loan } from "../Models/Loan.model.js";

dotenv.config();

// Generate a random 8-digit password
function generatePassword() {
  return Math.random().toString(36).slice(-8); // Generates a random string of 8 characters
}

export const createloan = async (req, res) => {
  try {
    const { name, email, cnic, category, depositAmount, loanPeriod } = req.body;

    const generatedPassword = generatePassword();

    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const maxLoan = 1000000;
    const remainingLoan = maxLoan - depositAmount;
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

    // Create the loan document
    const newLoan = new Loan({
      user: {
        name,
        email,
        password: hashedPassword,
        cnic,
      },
      loanDetails: {
        category,
        depositAmount,
        remainingLoan,
        monthlyInstallment,
        loanPeriod,
      },
    });

    await newLoan.save();

    res.status(201).json({
      message: "Loan created successfully",
      loan: newLoan,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating loan", error: error.message });
  }
};
