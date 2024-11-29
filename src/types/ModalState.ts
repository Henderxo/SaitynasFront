import type { Component } from "vue"
export interface ModalState{
    component: Component | null,
    componentProps?: Record<string|any, any>
}