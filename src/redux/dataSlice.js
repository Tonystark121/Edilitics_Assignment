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
        error:null,
        sortType:'default',
        theme:'light'
    },

    reducers:{
        sortAscending: (state) => {
            state.sortType = 'ascending'
        },
        sortDescending: (state) => {
            state.sortType = 'descending'
        },
        Unorderd: (state) => {
            state.sortType = 'default'
        },
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }
    },
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

export const {sortAscending, sortDescending, Unorderd, addData, toggleTheme} = fetchDataSlice.actions
export default fetchDataSlice.reducer;