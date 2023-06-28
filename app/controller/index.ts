import { Application } from "express"
import userController from "./userController.js"
import getController from "./getController.js"
import productController from "./productController.js"

const exportArr = [userController, getController, productController]

export default (app: Application) => {
    exportArr.forEach(controller => controller(app))
}