import { StateCreator } from 'zustand';

export interface Address {
  id: number;
  type: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

export interface AddressSlice {
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: number) => void;
  setDefaultAddress: (id: number) => void;
}

export const createAddressSlice: StateCreator<AddressSlice> = (set) => ({
  addresses: [],
  
  addAddress: (address) => set((state) => ({
    addresses: [...state.addresses, { ...address, id: Date.now() }]
  })),
  
  deleteAddress: (id) => set((state) => ({
    addresses: state.addresses.filter(addr => addr.id !== id)
  })),
  
  setDefaultAddress: (id) => set((state) => ({
    addresses: state.addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }))
  }))
});