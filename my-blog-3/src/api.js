// src/api.js
import axios from 'axios';

const API = axios.create({
  // यहाँ अपना लंबा URL सिर्फ एक बार लिखें
  baseURL: process.env.REACT_APP_BACKEND_URL || 'https://your-backend-app.onrender.com'
});

export default API;
