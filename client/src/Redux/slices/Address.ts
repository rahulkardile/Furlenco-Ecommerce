import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InfoInterface } from "../../typeScript/FromData";
import toast from "react-hot-toast";

interface Remove {
    id: string
}

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
    remove: (state, action: PayloadAction<Remove>)=>{
        
    }
  },
});

export default AddressReducer.reducer;
export const { addAddress, remove } = AddressReducer.actions;
