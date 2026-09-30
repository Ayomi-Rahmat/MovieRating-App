const API_URL = "http://localhost:8081";


// ========================================
// INITIATE PAYMENT
// ========================================

export const initiatePayment = async (email) => {

  const token =
    localStorage.getItem("movieRatingToken");


  const response = await fetch(
    `${API_URL}/api/payment/initiate`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        ...(token
          ? {
              Authorization:
                `Bearer ${token}`,
            }
          : {}),
      },

      body: JSON.stringify({
        email,
      }),
    }
  );


  const text =
    await response.text();


  if (!response.ok) {

    let message = text;

    try {

      const error =
        JSON.parse(text);

      message =
        error.message ||
        text;

    } catch {
      // Keep original response
    }


    throw new Error(
      message ||
      "Unable to initiate payment."
    );
  }


  try {

    return JSON.parse(text);

  } catch {

    throw new Error(
      "Backend returned an invalid payment response."
    );
  }
};


// ========================================
// VERIFY PAYMENT
// ========================================

export const verifyPayment = async (
  paymentReference
) => {

  const token =
    localStorage.getItem("movieRatingToken");


  const response = await fetch(
    `${API_URL}/api/payment/verify?paymentReference=${encodeURIComponent(
      paymentReference
    )}`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",

        ...(token
          ? {
              Authorization:
                `Bearer ${token}`,
            }
          : {}),
      },
    }
  );


  const text =
    await response.text();


  if (!response.ok) {

    let message = text;

    try {

      const error =
        JSON.parse(text);

      message =
        error.message ||
        text;

    } catch {
      // Keep original response
    }


    throw new Error(
      message ||
      "Unable to verify payment."
    );
  }


  try {

    return JSON.parse(text);

  } catch {

    throw new Error(
      "Backend returned an invalid verification response."
    );
  }
};