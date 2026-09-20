const API_URL = "http://localhost:8081";

export const initiatePayment = async (email) => {
  const response = await fetch(
    `${API_URL}/api/payment/initiate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    }
  );

  // Read the response as TEXT first
  const text = await response.text();

  console.log("Backend response:", text);

  if (!response.ok) {
    throw new Error(
      text || "Unable to initiate payment."
    );
  }

  // Convert the text into JSON
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(
      "The backend returned an invalid response: " + text,
      { cause: error }
    );
  }
};