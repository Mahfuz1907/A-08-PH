export interface Bookings {
    _id: string;
    studioId: string;
    studioTitle: string;
    studioImage: string;
    ["hourly-rate"]: number;
    bookingDate: string;
    startTime: string;
    endTime: string;
    userName: string;
    userEmail: string
    status: string;
}

export interface Category{
    _id: string,
    title: string, 
    slug: string,
    description: string,
    icon: string, 
    count: string,
    imageUrl: string
}

export interface Studio {
  _id: string;
  title: string;
  category: string;
  "hourly-rate": number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  amenities: string;
  description: string;
  hostName: string;
  hostEmail: string
}

export interface User{
    _id?: string
    name?: string,
    email?: string,
    emailVerification?: boolean,
    image?: string,
    createdAt?: string,
    updateAt?: string
}