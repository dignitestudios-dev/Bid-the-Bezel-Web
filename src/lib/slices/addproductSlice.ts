import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WatchDetailPayload } from "@/features/products/schema";

interface AddProductState {
    watchDetails: any;
    watchId: string | null;
}

const initialState: AddProductState = {
    watchDetails: null,
    watchId: null,
};

const addProductSlice = createSlice({
    name: "addProduct",
    initialState,
    reducers: {
        setWatchDetails(state, action: PayloadAction<WatchDetailPayload>) {
            state.watchDetails = action.payload;
        },
        setWatchId(state, action: PayloadAction<string>) {
            state.watchId = action.payload;
        },
        clearProductData(state) {
            state.watchDetails = null;
            state.watchId = null;
        },
    },
});

export const { setWatchDetails, setWatchId, clearProductData } = addProductSlice.actions;
export default addProductSlice.reducer;
