{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Import the 'node-fetch' library (you'll install this soon).\
const fetch = require('node-fetch');\
\
// This is the main function Netlify will run when this URL is accessed.\
exports.handler = async (event, context) => \{\
    // Only allow POST requests (our script sends POST).\
    if (event.httpMethod !== 'POST') \{\
        return \{ statusCode: 405, body: 'Method Not Allowed' \};\
    \}\
\
    // Get the API key securely from Netlify's settings.\
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;\
\
    if (!GEMINI_API_KEY) \{\
        console.error("API Key not found in environment variables.");\
        return \{ statusCode: 500, body: 'Server Error: API Key not configured.' \};\
    \}\
\
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$\{GEMINI_API_KEY\}`;\
\
    try \{\
        // Get the 'prompt' from the data our script sent.\
        const \{ prompt \} = JSON.parse(event.body);\
        if (!prompt) \{\
            return \{ statusCode: 400, body: 'Bad Request: Prompt is required.' \};\
        \}\
\
        // Prepare the data structure Gemini expects.\
        const payload = \{ contents: [\{ role: "user", parts: [\{ text: prompt \}] \}] \};\
\
        // Make the actual call to the Gemini API.\
        const response = await fetch(GEMINI_API_URL, \{\
            method: 'POST',\
            headers: \{ 'Content-Type': 'application/json' \},\
            body: JSON.stringify(payload)\
        \});\
\
        const data = await response.json();\
\
        // If Gemini returns an error, pass it along.\
        if (!response.ok) \{\
            console.error("Gemini API Error Response:", data);\
            return \{ statusCode: response.status, body: JSON.stringify(data) \};\
        \}\
\
        // If successful, send Gemini's response back to our script.js.\
        return \{ statusCode: 200, headers: \{ 'Content-Type': 'application/json' \}, body: JSON.stringify(data) \};\
\
    \} catch (error) \{\
        console.error('Proxy Function Internal Error:', error);\
        return \{ statusCode: 500, body: JSON.stringify(\{ error: 'Internal Server Error.' \}) \};\
    \}\
\};}