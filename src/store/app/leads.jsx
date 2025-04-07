
import { createSlice } from "@reduxjs/toolkit";
// import { setError } from "./auth";
import { API_CONFIG } from "../../config";
import axios from "axios";

const initialState = {
  leads: [],
  selectLead: null,
  error: null,
};

const leadsSlice = createSlice({
  name: "Telecaller",
  initialState,
  reducers: {
    setLeads: (state, action) => {
      console.log(action.payload);
      state.leads = action.payload;
    },
    setSelectedLeads: (state, action) => {
      state.selectLead = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLeads, setSelectedLeads, setError } = leadsSlice.actions;

export const fetchLeads = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_CONFIG.BASE_API_URL}${API_CONFIG.LEADS_API_URL}`
    );
    console.log("res:", response);
    // const data = await response.json();
    dispatch(setLeads(response.data));
  } catch (err) {
    console.log(err);
    dispatch(setError(err));
  }
};

export const findLeadByid = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_CONFIG.BASE_API_URL}${API_CONFIG.LEADS_API_URL}/${id}`
    );
    // const data = await response.json();
    dispatch(setSelectedLeads(response.data));
  } catch (err) {
    console.log(err);
    dispatch(setError(err));
  }
};

export const addLead = (payload) => async (dispatch) => {
  try {
    console.log(payload);
    const response = await axios.post(
      `${API_CONFIG.BASE_API_URL}${API_CONFIG.LEADS_API_URL}`,
      payload
    );
    // const data = await response.json();
    dispatch(setSelectedLeads(response.data));
    dispatch(fetchLeads());
  } catch (err) {
    console.log(err);
    dispatch(setError(err));
  }
};

export const updateLead = (payload) => async (dispatch) => {
  try {
    console.log("updateLead:", payload);
    const response = await axios.put(
      `${API_CONFIG.BASE_API_URL}${API_CONFIG.LEADS_API_URL}/${payload.id}`,
      { address: payload.address }
    );
    // const data = await response.json();
    dispatch(setSelectedLeads(response.data));
    dispatch(fetchLeads());
  } catch (err) {
    console.log(err);
    dispatch(setError(err));
  }
};

export const deleteLead = (id) => async (dispatch) => {
  try {
    console.log(id);
    const response = await axios.delete(
      `${API_CONFIG.BASE_API_URL}${API_CONFIG.LEADS_API_URL}/${id}`
    );
    dispatch(fetchLeads());
    // const data = await response.json();
    // dispatch(setSelectedLeads(data));
  } catch (err) {
    console.log(err);
    dispatch(setError(err));
  }
};

export const updateCallStatus = (payload) => async (dispatch) => {
  try {
    console.log(payload)
    const response = await axios.put(
      `${API_CONFIG.BASE_API_URL}${API_CONFIG.LEADS_API_URL}/${payload.id}/status`,
      payload
    );

    // const data = await response.json();
    dispatch(setSelectedLeads(response.data));
    dispatch(fetchLeads());
  } catch (err) {
    console.log(err);
    dispatch(setError(err));
  }
};

export default leadsSlice.reducer;
