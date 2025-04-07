export const API_CONFIG = {
  BASE_API_URL: import.meta.env.VITE_BASE_API_URL ,
  // AUTHORIZE_API_URL: '/api/auth/local',
  AUTHORIZE_API_URL: "/api/auth/login",
  REGISTER_API_URL: "/api/auth/register",

  //leads
  LEADS_API_URL: "/api/leads",

  DASHBOARD_METRICS_URL: "/api/leads/dashboard/calls",
  CALL_TRENDS: "/api/leads/dashboard/call-trends",
  RECENT_ACTIVITIES:"/api/leads/dashboard/recent-activities",
  CONNECTED_CALLS:"/api/leads/dashboard/connected-calls"
};
