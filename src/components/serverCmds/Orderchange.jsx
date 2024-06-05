import { AddOrderStatus } from "./OrderaddStatus";
import { DeleteOrder } from "./Orderdelete";

export const ChangeOrder = async (a) => {
    // prima data se sterg toate comenzile
    await DeleteOrder();

    // acum se adayga date noi
    await a.map((item, index) => {
        AddOrderStatus(item.title, item.amount, item.clientsName,item.estimatedTime, item.status);
        return'';
    });
};
