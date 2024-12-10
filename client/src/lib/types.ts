export interface Subscriber {
  id: number;
  email: string;
  createdAt: Date;
}

export interface Booking {
  id: number;
  email: string;
  ticketType: 'REG' | 'VIP' | 'GOLD' | 'PREMIUM';
  quantity: number;
  totalAmount: number;
  createdAt: Date;
}
