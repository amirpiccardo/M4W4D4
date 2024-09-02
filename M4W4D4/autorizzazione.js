export const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQxODJkZTRlMWE5MjAwMTU1Mjg1NDYiLCJpYXQiOjE3MjUxOTAxNDIsImV4cCI6MTcyNjM5OTc0Mn0.1q2IRJimRjKb5ZEZ5i5g0axvYDTqRLz0Cm8x0axWxBU";

export function getHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`
    };
}
