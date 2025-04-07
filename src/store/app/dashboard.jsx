import { createSlice } from "@reduxjs/toolkit";
// import { API_CONFIG } from "../../../config";
import axios from "axios";
import { API_CONFIG } from "../../config";

const initialState = {
  metrics: null,
  error: null,
  callTrends: null,
  activities: '',
  calldetails:''
};

const dashboardSlice = createSlice({
  name: "Telecaller",
  initialState,
  reducers: {
    setMetrics: (state, action) => {
      state.metrics = action.payload;
    },
    setCallTrends: (state, action) => {
      state.callTrends = action.payload;
    },
    setActivites: (state, action) => {
        state.activities = action.payload;
      },
      setCallDetails: (state, action) => {
        state.calldetails = action.payload;
      },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { setMetrics, setError ,setCallTrends ,setActivites ,setCallDetails} = dashboardSlice.actions;

export const fetchDashboardMetrics = () => async (dispatch) => {

    console.log("hiiiiiiiiiiiiiiiiiiiiiii");
    
  try {
    const response = await axios.get(
      `${API_CONFIG.BASE_API_URL}${API_CONFIG.DASHBOARD_METRICS_URL}`
    );
    // const data = await response.json();
    dispatch(setMetrics(response.data));
    console.log("respon" , response.data);
    
  } catch (err) {
    console.log(err);
    dispatch(setError(err));
  }
};

export const callTrendDetails = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_CONFIG.BASE_API_URL}${API_CONFIG.CALL_TRENDS}`
    );
    // const data = await response.json();
    dispatch(setCallTrends(response.data));
  } catch (err) {
    console.log(err);
    dispatch(setError(err));
  }
};


export const recentActivities = () => async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_API_URL}${API_CONFIG.RECENT_ACTIVITIES}`
      );
      // const data = await response.json();
      dispatch(setActivites(response.data));
    } catch (err) {
      console.log(err);
      dispatch(setError(err));
    }
  };


  export const connectedCalls = () => async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_API_URL}${API_CONFIG.CONNECTED_CALLS}`
      );
      // const data = await response.json();
      dispatch(setCallDetails(response.data));
    } catch (err) {
      console.log(err);
      dispatch(setError(err));
    }
  };

export default dashboardSlice.reducer;
