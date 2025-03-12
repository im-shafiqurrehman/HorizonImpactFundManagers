import { useSelector } from "react-redux";

interface AuthState {
  auth: {
    user: unknown; // Replace 'any' with the correct user type if possible
  };
}

export default function UserAuth() {
  const { user } = useSelector((state: AuthState) => state.auth);

  return !!user; // Cleaner way to return boolean
}
