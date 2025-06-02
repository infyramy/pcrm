interface User {
  id: string;
  email: string;
  fullname: string;
  user_type: "superadmin" | "studio" | "photographer" | "affiliate";
  avatar: string;
}

export const exampleUsers: User[] = [
  {
    id: "super_1",
    email: "admin@gmail.com",
    fullname: "John Admin",
    user_type: "superadmin",
    avatar: "https://i.pravatar.cc/300?img=1",
  },
  {
    id: "studio_1",
    email: "studio@gmail.com",
    fullname: "Sarah Studio",
    user_type: "studio",
    avatar: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: "photo_1",
    email: "pg@gmail.com",
    fullname: "Mike Photographer",
    user_type: "photographer",
    avatar: "https://i.pravatar.cc/300?img=3",
  },
  {
    id: "aff_1",
    email: "aff@gmail.com",
    fullname: "Lisa Partner",
    user_type: "affiliate",
    avatar: "https://i.pravatar.cc/300?img=4",
  },
];

// Helper function to get a user by role
export const getUserByRole = (role: User["user_type"]): User | undefined => {
  return exampleUsers.find((user) => user.user_type === role);
};

// Helper function to get mock credentials for a user
export const getMockCredentials = (user: User) => {
  return {
    email: user.email,
    password: "abc123", // Example password, in real app would be hashed
  };
};
