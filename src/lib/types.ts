export interface User {
  id: string
  name?: string
  email: string
}

export interface Friend {
  id: string
}


export interface Friend {
  id: string
  name: string
  email?: string
  phone?: string
  birthday?: string
  notes?: string
}

export interface Session {
  user: {
    id: number;
    email: string;
    name: string;
  };
  token?: string;   // ← now optional
}