const API_URL = "https://staging.nutshells.id/api/v1"; 
let TOKEN: string | null = null;
let ROLE: string | null = null
let ID: string | null = null
let DATA: string | null = null
if (typeof localStorage !== "undefined") {
  TOKEN = localStorage.getItem("token");
  ROLE = localStorage.getItem("role");
  ID = localStorage.getItem("id")

}


export  {ROLE, TOKEN, ID, DATA, API_URL}