import {orders} from '@wix/ecom';

export async function getOrder(_id: string): Promise<orders.Order> {
    //https://dev.wix.com/docs/sdk/backend-modules/ecom/orders/get-order
    const order =  await orders.getOrder(_id);
    return order;
}

export function getBuyerPhoneNumber(order: orders.Order): string | null | undefined {
    if(order.billingInfo) return order.billingInfo?.contactDetails?.phone;
    else if(order.shippingInfo) return order.recipientInfo?.contactDetails?.phone;
    else{
        console.log(`No phone number found in order ${JSON.stringify(order)}`);
        return null;
    }
}

export function getBuyerLanguage(order: orders.Order): string | null | undefined {
    return order.buyerLanguage
}
