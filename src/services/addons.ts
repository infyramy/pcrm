import type { Addon } from "@/types/form";

export interface CreateAddonRequest {
  name: string;
  price: number;
  description?: string;
  maxQuantity: number;
}

export interface UpdateAddonRequest {
  name?: string;
  price?: number;
  description?: string;
  maxQuantity?: number;
  isActive?: boolean;
}

export interface AddonListResponse {
  addons: Addon[];
  total: number;
  page: number;
  limit: number;
}

// Mock data for add-ons
const mockAddons: Addon[] = [
  {
    id: "1",
    name: "Drone Photography",
    price: 300,
    description: "Aerial shots and unique perspectives from above",
    maxQuantity: 1,
    isActive: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Photo Album",
    price: 150,
    description: "Premium printed photo album with 50 pages",
    maxQuantity: 3,
    isActive: true,
    createdAt: new Date("2024-01-16"),
  },
  {
    id: "3",
    name: "Extra Hour",
    price: 200,
    description: "Additional hour of photography coverage",
    maxQuantity: 5,
    isActive: true,
    createdAt: new Date("2024-01-17"),
  },
  {
    id: "4",
    name: "Video Highlights",
    price: 500,
    description: "Short highlight video of your session",
    maxQuantity: 1,
    isActive: true,
    createdAt: new Date("2024-01-18"),
  },
  {
    id: "5",
    name: "Makeup Artist",
    price: 250,
    description: "Professional makeup artist for the session",
    maxQuantity: 1,
    isActive: true,
    createdAt: new Date("2024-01-19"),
  },
  {
    id: "6",
    name: "Props Package",
    price: 80,
    description: "Collection of themed props for your shoot",
    maxQuantity: 2,
    isActive: true,
    createdAt: new Date("2024-01-20"),
  },
];

export const addonService = {
  // Get all addons (mock implementation)
  async getAddons(page = 1, limit = 50): Promise<AddonListResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedAddons = mockAddons.slice(startIndex, endIndex);
    
    return {
      addons: paginatedAddons,
      total: mockAddons.length,
      page,
      limit,
    };
  },

  // Get a single addon by ID (mock implementation)
  async getAddon(id: string): Promise<Addon> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const addon = mockAddons.find(a => a.id === id);
    if (!addon) {
      throw new Error(`Addon with id ${id} not found`);
    }
    return addon;
  },

  // Create a new addon (mock implementation)
  async createAddon(data: CreateAddonRequest): Promise<Addon> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newAddon: Addon = {
      id: Date.now().toString(),
      name: data.name,
      price: data.price,
      description: data.description,
      maxQuantity: data.maxQuantity,
      isActive: true,
      createdAt: new Date(),
    };
    
    mockAddons.push(newAddon);
    return newAddon;
  },

  // Update an existing addon (mock implementation)
  async updateAddon(id: string, data: UpdateAddonRequest): Promise<Addon> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const addonIndex = mockAddons.findIndex(a => a.id === id);
    if (addonIndex === -1) {
      throw new Error(`Addon with id ${id} not found`);
    }
    
    const updatedAddon = {
      ...mockAddons[addonIndex],
      ...data,
      updatedAt: new Date(),
    };
    
    mockAddons[addonIndex] = updatedAddon;
    return updatedAddon;
  },

  // Delete an addon (mock implementation)
  async deleteAddon(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const addonIndex = mockAddons.findIndex(a => a.id === id);
    if (addonIndex === -1) {
      throw new Error(`Addon with id ${id} not found`);
    }
    
    mockAddons.splice(addonIndex, 1);
  },
}; 