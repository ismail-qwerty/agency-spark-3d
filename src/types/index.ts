export interface Project {
  client: string;
  category: string;
  year: string;
  rating: number;
  quote: string;
  color: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  tools: string[];
  duration: string;
}

export interface TeamMember {
  name: string;
  role: string;
  badge: string;
  initials: string;
  image?: string;
  bio: string;
  email: string;
  isLead: boolean;
  skills: string[];
  experience: string;
  linkedin?: string;
}
