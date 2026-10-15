import axios from "axios";

export const getMpesaToken = async () => {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

    console.log("KEY:", consumerKey);
    console.log("SECRET:", consumerSecret);

    const auth = Buffer.from(
      `${consumerKey}:${consumerSecret}`
    ).toString("base64");

    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    return response.data.access_token;

  } catch (error) {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    console.log("MESSAGE:", error.message);

    res.status(500).json(error.response?.data || error.message);
  }
};