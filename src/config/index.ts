import dotenv from "dotenv"
import path from "path"
dotenv.config({path: path.join(__dirname,'../../.env')})

export default {
    fileLogsDir: process.env.LOGS_DIR || './logs',
    isDev: process.env.NODE_ENV === 'development',
    cakeOrdersPath: process.env.CAKE_ORDERS_PATH || 'src/data/cake orders.csv',
    petOrdersPath: process.env.PET_ORDERS_PATH || 'src/data/pet orders.json',
    toyOrdersPath: process.env.TOY_ORDERS_PATH || 'src/data/toy orders.xml',
    furnitureOrdersPath: process.env.FURNITURE_ORDERS_PATH || 'src/data/furniture orders.xml',
    bookOrdersPath: process.env.BOOK_ORDERS_PATH || 'src/data/book orders.json',
    clothingOrdersPath: process.env.CLOTHING_ORDERS_PATH || 'src/data/clothing orders.csv',
}