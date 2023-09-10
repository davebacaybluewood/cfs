import express from "express";
import { createOrder, captureOrder } from "../controllers/paymentController.js";
import { registerPaidUser } from "../services/userServices.js";

const router = express.Router();

router.route("/create-paypal-order").post(async (req, res) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const { cart } = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

router.route("/capture-paypal-order").post(async (req, res) => {
  try {
    const { orderID } = req.body;
    console.log(req.body);
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    await registerPaidUser(req, res);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

export default router;
