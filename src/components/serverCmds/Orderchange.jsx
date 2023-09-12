import { AddOrderStatus } from "./OrderaddStatus";
import { DeleteOrder } from "./Orderdelete";

export const ChangeOrder = async (a) => {
    // First, delete all orders
    await DeleteOrder();

    // Now, perform operations to add new data
    await a.map((item, index) => {
        AddOrderStatus(item.title, item.amount, item.clientsName,item.estimatedTime, item.status);
        return'';
    });
};
