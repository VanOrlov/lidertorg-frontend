export enum orderStatus {
    NEW = 'Новый',
    PROCESSED = "Обработан",
    ON_THE_WAY = "В пути",
    DELIVERED = "Доставлен",
    CANCELED = "Отменён"
}

export enum currency {
    RUB = "RUB",
    USD = "USD",
    EUR = "EUR"
}

export enum paymentMethod {
    CARD = "Карта",
    CASH = "Наличными",
    ONLINE = "Онлайн"
}

export enum paymentStatus {
    PAID = "Оплачен",
    NOT_PAID = "Не оплачен",
    WAITING_FOR_PAYMENT = "Ожидает оплаты"
}

export enum deliveryMethod {
    COURIER = "Курьер",
    MAIL_POST = "Почта/Транспортная компания",
    SELF_DELIVERY = "Самовывоз"
}