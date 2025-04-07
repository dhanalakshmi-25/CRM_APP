import React, { useEffect, useState } from "react";
import {
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeads,
  addLead,
  updateLead,
  deleteLead,
  updateCallStatus,
} from "../../store/app/leads";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { logout } from "../../store";
import { useNavigate } from "react-router-dom";

function TeleCaller() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leadsReducer || []);
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // "add" or "edit" or "status"
  const [selectedLead, setSelectedLead] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [callStatus, setCallStatus] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const handleOpenAddDialog = () => {
    setDialogMode("add");
    setFormData({ name: "", email: "", phone: "", address: "" });
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (lead) => {
    setDialogMode("edit");
    setSelectedLead(lead);
    setFormData({ address: lead.address });
    setOpenDialog(true);
  };

  const handleOpenStatusDialog = (lead) => {
    setDialogMode("status");
    setSelectedLead(lead);
    setCallStatus("");
    setResponse("");
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (dialogMode === "add") {
      const payload = {
        ...formData,
        added_by: userInfo.user.id,
      };
      dispatch(addLead(payload));
    } else if (dialogMode === "edit") {
      const payload = {
        id: selectedLead._id,
        address: formData.address,
      };
      dispatch(updateLead(payload));
    } else if (dialogMode === "status") {
      const payload = {
        id: selectedLead._id,
        status: callStatus,
        response,
        telecallerName: userInfo.user.name,
      };
      dispatch(updateCallStatus(payload));
    }
    setOpenDialog(false);
  };

  const handleDelete = (leadId) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      dispatch(deleteLead(leadId));
    }
  };

  const handleSignOut = async () => {
    // Replace with actual sign-out logic
    console.log("Signing out...");
    await dispatch(logout());
    navigate('/auth/login')

    // For example: dispatch(logout()); navigate("/login");
  };

  const statusResponses = {
    Connected: ["Discussed", "Callback", "Interested"],
    "Not Connected": ["Busy", "RNR", "Switched Off"],
  };

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleOpenEditDialog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleOpenStatusDialog(params.row)}
          >
            Update Status
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Typography variant="h5" gutterBottom>
        TeleCaller Page
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
        mb={2}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
        >
          Add New
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Box>

      <div style={{ height: 500 }}>
        <DataGrid columns={columns} rows={leads} getRowId={(row) => row._id} />
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>
          {dialogMode === "add"
            ? "Add Lead"
            : dialogMode === "edit"
            ? "Edit Address"
            : "Update Call Status"}
        </DialogTitle>
        <DialogContent>
          {dialogMode === "add" && (
            <>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                margin="dense"
              />
              <TextField
                fullWidth
                label="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                margin="dense"
              />
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                margin="dense"
              />
              <TextField
                fullWidth
                label="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                margin="dense"
              />
            </>
          )}

          {dialogMode === "edit" && (
            <TextField
              fullWidth
              label="Address"
              value={formData.address}
              onChange={(e) => setFormData({ address: e.target.value })}
              margin="dense"
            />
          )}

          {dialogMode === "status" && (
            <>
              <FormControl fullWidth margin="dense">
                <InputLabel>Call Status</InputLabel>
                <Select
                  value={callStatus}
                  onChange={(e) => setCallStatus(e.target.value)}
                  label="Call Status"
                >
                  <MenuItem value="Connected">Connected</MenuItem>
                  <MenuItem value="Not Connected">Not Connected</MenuItem>
                </Select>
              </FormControl>
              {callStatus && (
                <FormControl fullWidth margin="dense">
                  <InputLabel>Response</InputLabel>
                  <Select
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    label="Response"
                  >
                    {statusResponses[callStatus].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TeleCaller;
