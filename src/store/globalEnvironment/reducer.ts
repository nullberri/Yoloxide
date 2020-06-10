import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"
import { YololVariable } from "shared/models/yoloxide"

export const globalEnvironmentAdapter = createEntityAdapter<YololVariable>()

export const { reducer, actions } = createSlice({
    reducers: {
        addVariable: globalEnvironmentAdapter.addOne,
        removeVarable: globalEnvironmentAdapter.removeOne,
        setEnvironment: globalEnvironmentAdapter.setAll,
        resetEnvironment: globalEnvironmentAdapter.removeAll,
    },
    extraReducers: {},
    initialState: globalEnvironmentAdapter.getInitialState(),
    name: "globalEnvironment",
})
