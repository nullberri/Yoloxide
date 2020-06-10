import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import {Device} from "shared/models/device"

export const deviceAdapter = createEntityAdapter<Device>()

export const { reducer, actions } = createSlice({
    reducers: {
        addDevice: deviceAdapter.addOne,
        removeDevice: deviceAdapter.removeOne,
        updateDevice: deviceAdapter.updateOne,
    },
    extraReducers: {},
    initialState: deviceAdapter.getInitialState(),
    name: "devices",
})
