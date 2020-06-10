import { getDefaultMiddleware, configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { Store } from "../shared/models/store"
import { reducer as globalEnvironment } from "./globalEnvironment"
import { reducer as devices, actions as deviceActions } from "./devices"
import logger from "redux-logger"
import React from "react"
import { createDevice } from "shared/util"

const reducer = { globalEnvironment, devices }

const middleware = [...getDefaultMiddleware()]as any

export const store = configureStore<Store>({
    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== "production",
})

store.dispatch(deviceActions.addDevice(createDevice()))

export const StoreProvider: React.FC = (props) => {
    const { children } = props
    return <Provider store={store}>{children}</Provider>
}
