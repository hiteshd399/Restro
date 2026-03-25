import { Reservation } from "../models/reservation.js";
const send_reservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;

  console.log("Received body:", req.body);

  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return res.status(400).json({
      success: false,
      message: "Please Fill Full Reservation Form!",
    });
  }

  try {
    await Reservation.create({ firstName, lastName, email, date, time, phone });
    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
    });
  } catch (error) {
    console.error("DB Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ This line was accidentally deleted — add it back!
export default send_reservation;