import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL = 'https://api.covidtracking.com/v1/states/current.json'

export const fetchCovidData = createAsyncThunk('fetchData/fetchCovidData', async () => {
    const response = await fetch(URL);
    return response.json();
})


const fetchDataSlice = createSlice({
    name:'fetchData',
    initialState:{
        data:[],
        status:'idle',
        error:null
    },

    reducers:{},
    extraReducers:(builder) => {
        builder 
            .addCase(fetchCovidData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCovidData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchCovidData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            
    }
})


export default fetchDataSlice.reducer;