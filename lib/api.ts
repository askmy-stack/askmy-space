// lib/api.ts

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  fork?: boolean;
}

export interface GitHubUser {
  avatar_url: string;
  login: string;
  bio: string | null;
  profile_url?: string;
}

const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_USERNAME = "askmy-stack";

// Language color mapping
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  Python: "#3776AB",
  Java: "#007396",
  Go: "#00ADD8",
  Rust: "#CE422B",
  Ruby: "#CC342D",
  PHP: "#777BB4",
  CSS: "#563D7C",
  HTML: "#E34C26",
  "C++": "#00599C",
  C: "#A8B9CC",
  Shell: "#89E051",
  Dockerfile: "#384D54",
  YAML: "#CB171E",
  JSON: "#292929",
};

export function getLanguageColor(language: string | null): string {
  if (!language) return "#8B7355";
  return LANGUAGE_COLORS[language] || "#8B7355";
}

/**
 * Fetch GitHub user profile information
 * @param username GitHub username
 * @returns User profile data
 */
export async function fetchGitHubUser(
  username: string = GITHUB_USERNAME
): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 }, // ISR: 1 hour
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return {
      avatar_url: data.avatar_url,
      login: data.login,
      bio: data.bio,
      profile_url: data.html_url,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub user:", error);
    return null;
  }
}

/**
 * Fetch GitHub repositories
 * @param username GitHub username
 * @param count Number of repos to fetch (default: 10, max: 100)
 * @returns Array of repositories sorted by stars (descending)
 */
export async function fetchGitHubRepos(
  username: string = GITHUB_USERNAME,
  count: number = 10
): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=stars&order=desc&per_page=${Math.min(count, 100)}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // ISR: 1 hour
      }
    );

    if (!response.ok) {
      console.error(`GitHub API error: ${response.statusText}`);
      return [];
    }

    const repos: GitHubRepo[] = await response.json();
    // Filter out forked repos and ensure we have descriptions
    return repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, count);
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}
