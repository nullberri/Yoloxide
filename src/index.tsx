import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { MainPage } from "pages/main"
import * as serviceWorker from "./serviceWorker"
import "ace-builds/webpack-resolver"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/theme-github"
import { StoreProvider } from "./store/store"
import { App } from "pages/app/app"

ReactDOM.render(
    <React.StrictMode>
        <StoreProvider>
            <App>
                <MainPage />
            </App>
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
