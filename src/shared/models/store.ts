import { EntityState } from "@reduxjs/toolkit"
import { YololVariable } from "./yoloxide"
import { Device } from "./device"

export interface Store {
    globalEnvironment: EntityState<YololVariable>
    devices: EntityState<Device>
}
