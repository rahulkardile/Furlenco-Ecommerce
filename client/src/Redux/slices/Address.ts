import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InfoInterface } from "../../typeScript/FromData";
import toast from "react-hot-toast";

type InfoType = {
  Address: InfoInterface | null;
};

const initialState: InfoType = {
  Address: null,
};

const AddressReducer = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<InfoInterface>) => {
      state.Address = action.payload;
      toast.success("Address Successfully Added!");
    },
    removeAddress: (state)=>{
        state.Address = null;
    }
  },
});

export default AddressReducer.reducer;
export const { addAddress, removeAddress } = AddressReducer.actions;
