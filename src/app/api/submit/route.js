export async function POST(req) {
  try {
    const body = await req.json();

    const googleRes = await fetch(
      "https://script.google.com/macros/s/AKfycbxvBaxxo-uEEaFscKthMVcNu9wi-hu5qbs8uNt99xyrmfPNyRs8aBVNeQi4-evZYAqwdQ/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const text = await googleRes.text();

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      // console.error("Google returned non-JSON:", text);
      return Response.json(
        { success: false, error: "Invalid response from Google Script" },
        { status: 500 }
      );
    } 

    return Response.json(result);

  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}