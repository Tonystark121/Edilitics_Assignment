import {configureStore} from '@reduxjs/toolkit'
import covidDataReducer from './dataSlice.js'

// A single store subscribed by all component to fetch their state, containing all reduces list as object.


const store = configureStore({
    reducer:{
        covidData: covidDataReducer
    }
})

export default store