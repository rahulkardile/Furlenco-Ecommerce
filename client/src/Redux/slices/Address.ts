import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InfoInterface {
  contact: {
    name: string;
    mobile: number;
  };
  address: {
    pin: number;
    address: string;
    town: string;
    city: string;
    state: string;
  };
  of: string;
}

interface Remove {
    id: string
}

type InfoType = {
  Address: InfoInterface[] | null;
};

const initialState: InfoType = {
  Address: [],
};

const AddressReducer = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<InfoInterface>) => {
      state.Address?.push(action.payload);
    },
    remove: (state, action: PayloadAction<Remove>)=>{
    }
  },
});

export default AddressReducer.reducer;
export const { addAddress, remove } = AddressReducer.actions;
