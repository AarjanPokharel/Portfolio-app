const API_BASE_URL =
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'http://127.0.0.1:8000';

export type Profile = {
  id: number;
  full_name: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  linkedin_url: string;
  github_url: string;
  profile_image_url: string | null;
  resume_file_url: string | null;
};

export type Education = {
  id: number;
  school_name: string;
  degree: string;
  field_of_study: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string;
  display_order: number;
};

export type Experience = {
  id: number;
  company_name: string;
  job_title: string;
  location: string;
  start_date: string;
  end_date: string | null;
  currently_working: boolean;
  description: string;
  display_order: number;
};

export type Skill = {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  display_order: number;
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  tech_stack: string;
  tech_stack_list: string[];
  github_url: string;
  live_url: string;
  image_url: string | null;
  featured: boolean;
};

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string | null;
  published_at: string | null;
};

export type BlogPostDetail = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ContactMessagePayload = {
  message_type: string;
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactMessageResponse = {
  id: number;
  message_type: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function getProfile(): Promise<Profile | null> {
  try {
    return await fetchFromApi<Profile>('/api/portfolio/profile/');
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return null;
  }
}

export async function getEducation(): Promise<Education[]> {
  return fetchFromApi<Education[]>('/api/portfolio/education/');
}

export async function getExperience(): Promise<Experience[]> {
  return fetchFromApi<Experience[]>('/api/portfolio/experience/');
}

export async function getSkills(): Promise<Skill[]> {
  return fetchFromApi<Skill[]>('/api/portfolio/skills/');
}

export async function getProjects(): Promise<Project[]> {
  return fetchFromApi<Project[]>('/api/portfolio/projects/');
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return fetchFromApi<BlogPost[]>('/api/blog/posts/');
}

export async function getBlogPost(slug: string): Promise<BlogPostDetail> {
  return fetchFromApi<BlogPostDetail>(`/api/blog/posts/${slug}/`);
}

export async function sendContactMessage(
  payload: ContactMessagePayload
): Promise<ContactMessageResponse> {
  const response = await fetch(`${API_BASE_URL}/api/contact/messages/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message ||
        errorData?.detail ||
        "Failed to send contact message."
    );
  }

  return response.json();
}

export function formatDisplayDate(dateString: string | null): string {
  if (!dateString) {
    return "Present";
  }

  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}