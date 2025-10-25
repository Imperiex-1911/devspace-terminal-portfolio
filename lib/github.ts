interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string
  company: string
  blog: string
  location: string
  email: string
  bio: string
  twitter_username: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string
  language: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  size: number
  created_at: string
  updated_at: string
  pushed_at: string
  topics: string[]
  license?: {
    name: string
    spdx_id: string
  }
}

interface GitHubContribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface GitHubStats {
  totalContributions: number
  currentStreak: number
  longestStreak: number
  averagePerDay: number
  mostActiveDay: string
  mostActiveMonth: string
}

export class GitHubAPI {
  private baseURL = 'https://api.github.com'
  private token: string | null = null

  constructor(token?: string) {
    this.token = token || null
  }

  private async request<T>(endpoint: string): Promise<T> {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'devspace-terminal'
    }

    if (this.token) {
      headers['Authorization'] = `token ${this.token}`
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, { headers })
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getUser(username: string): Promise<GitHubUser> {
    return this.request<GitHubUser>(`/users/${username}`)
  }

  async getUserRepos(username: string, options: {
    sort?: 'created' | 'updated' | 'pushed' | 'full_name'
    direction?: 'asc' | 'desc'
    per_page?: number
    page?: number
  } = {}): Promise<GitHubRepo[]> {
    const params = new URLSearchParams()
    
    if (options.sort) params.append('sort', options.sort)
    if (options.direction) params.append('direction', options.direction)
    if (options.per_page) params.append('per_page', options.per_page.toString())
    if (options.page) params.append('page', options.page.toString())

    const queryString = params.toString()
    const endpoint = `/users/${username}/repos${queryString ? `?${queryString}` : ''}`
    
    return this.request<GitHubRepo[]>(endpoint)
  }

  async getRepo(username: string, repoName: string): Promise<GitHubRepo> {
    return this.request<GitHubRepo>(`/repos/${username}/${repoName}`)
  }

  async getContributions(username: string, year: number = new Date().getFullYear()): Promise<GitHubContribution[]> {
    // Note: This is a simplified implementation
    // In a real app, you'd need to use the GitHub GraphQL API or a service like GitHub Contributions API
    const contributions: GitHubContribution[] = []
    const startDate = new Date(year, 0, 1)
    const endDate = new Date(year, 11, 31)
    
    // Generate mock data for demonstration
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const count = Math.floor(Math.random() * 20)
      const level = count === 0 ? 0 : Math.min(4, Math.ceil(count / 5)) as 0 | 1 | 2 | 3 | 4
      const dateString = d.toISOString().split('T')[0]
      
      if (dateString) {
        contributions.push({
          date: dateString,
          count,
          level
        })
      }
    }

    return contributions
  }

  async getStats(username: string): Promise<GitHubStats> {
    const contributions = await this.getContributions(username)
    
    const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0)
    
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    
    for (const day of contributions) {
      if (day.count > 0) {
        tempStreak++
        longestStreak = Math.max(longestStreak, tempStreak)
      } else {
        tempStreak = 0
      }
    }
    
    // Calculate current streak from the end
    for (let i = contributions.length - 1; i >= 0; i--) {
      const contribution = contributions[i]
      if (contribution && contribution.count > 0) {
        currentStreak++
      } else {
        break
      }
    }
    
    const averagePerDay = totalContributions / 365
    
    // Find most active day and month
    const dayStats = new Array(7).fill(0)
    const monthStats = new Array(12).fill(0)
    
    contributions.forEach(day => {
      const date = new Date(day.date)
      dayStats[date.getDay()] += day.count
      monthStats[date.getMonth()] += day.count
    })
    
    const mostActiveDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
      dayStats.indexOf(Math.max(...dayStats))
    ] || 'Monday'
    
    const mostActiveMonth = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ][monthStats.indexOf(Math.max(...monthStats))] || 'January'

    return {
      totalContributions,
      currentStreak,
      longestStreak,
      averagePerDay: Math.round(averagePerDay * 10) / 10,
      mostActiveDay,
      mostActiveMonth
    }
  }

  async searchRepos(query: string, options: {
    sort?: 'stars' | 'forks' | 'help-wanted-issues' | 'updated'
    order?: 'asc' | 'desc'
    per_page?: number
    page?: number
  } = {}): Promise<{ items: GitHubRepo[] }> {
    const params = new URLSearchParams()
    params.append('q', query)
    
    if (options.sort) params.append('sort', options.sort)
    if (options.order) params.append('order', options.order)
    if (options.per_page) params.append('per_page', options.per_page.toString())
    if (options.page) params.append('page', options.page.toString())

    return this.request<{ items: GitHubRepo[] }>(`/search/repositories?${params.toString()}`)
  }

  async getLanguages(username: string, repoName: string): Promise<Record<string, number>> {
    return this.request<Record<string, number>>(`/repos/${username}/${repoName}/languages`)
  }

  async getReadme(username: string, repoName: string): Promise<string> {
    try {
      const response = await this.request<{ content: string }>(`/repos/${username}/${repoName}/readme`)
      return atob(response.content)
    } catch {
      return 'No README available'
    }
  }

  // Utility methods
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  getLanguageColor(language: string): string {
    const colors: Record<string, string> = {
      'JavaScript': '#f7df1e',
      'TypeScript': '#3178c6',
      'Python': '#3776ab',
      'Java': '#f89820',
      'C++': '#00599c',
      'C#': '#239120',
      'Go': '#00add8',
      'Rust': '#dea584',
      'PHP': '#777bb4',
      'Ruby': '#cc342d',
      'Swift': '#fa7343',
      'Kotlin': '#7f52ff',
      'HTML': '#e34f26',
      'CSS': '#1572b6',
      'SCSS': '#cf649a',
      'Sass': '#cf649a',
      'Less': '#1d365d',
      'Vue': '#4fc08d',
      'React': '#61dafb',
      'Angular': '#dd0031',
      'Svelte': '#ff3e00',
      'Dart': '#0175c2',
      'R': '#276dc3',
      'MATLAB': '#e16737',
      'Shell': '#89e051',
      'PowerShell': '#012456',
      'Dockerfile': '#2496ed',
      'YAML': '#cb171e',
      'JSON': '#000000',
      'Markdown': '#083fa1',
      'TeX': '#3d6117',
      'Assembly': '#6e4c13',
      'C': '#a8b9cc',
      'Objective-C': '#438eff',
      'Perl': '#39457e',
      'Lua': '#000080',
      'Haskell': '#5d4f85',
      'Clojure': '#5881d8',
      'Erlang': '#a90533',
      'Elixir': '#6e4a7e',
      'F#': '#b845fc',
      'Scala': '#c22d40',
      'OCaml': '#3be133',
      'Racket': '#3c5caa',
      'Scheme': '#1e4a72',
      'Prolog': '#74283c',
      'Mercury': '#ff2b2b',
      'Ada': '#02f88c',
      'Fortran': '#4d41b1',
      'COBOL': '#005ca5',
      'Pascal': '#e3f171',
      'Delphi': '#ee1f35',
      'Visual Basic': '#945db7',
      'VBA': '#867db1',
      'VBScript': '#15dcdc',
      'JScript': '#f7df1e',
      'ActionScript': '#882b0f',
      'ColdFusion': '#ed2cd6',
      'Lisp': '#4fb185',
      'Smalltalk': '#596706',
      'Tcl': '#e4cc98',
      'Awk': '#c30e9b',
      'Sed': '#64b970',
      'Makefile': '#427819',
      'CMake': '#064f8c',
      'Gradle': '#02303a',
      'Maven': '#c71a36',
      'Ant': '#a9157e',
      'Nix': '#7e7eff',
      'NixOS': '#5277c3',
      'Guix': '#3d68b0',
      'Homebrew': '#fbb040',
      'Chocolatey': '#80b5e3',
      'Scoop': '#ff6b35',
      'Winget': '#0078d4',
      'Snap': '#77216f',
      'Flatpak': '#4a86cf',
      'AppImage': '#f7a000',
      'PKGBUILD': '#1793d1',
      'ebuild': '#9279a3',
      'Portfile': '#beccae',
      'Formula': '#fbb040',
      'Cask': '#fbb040',
      'Tap': '#fbb040',
      'Bottle': '#fbb040',
      'Cellar': '#fbb040',
      'Caskroom': '#fbb040',
      'Home': '#fbb040',
      'libexec': '#fbb040',
      'srv': '#fbb040',
      'opt': '#fbb040',
      'mnt': '#fbb040',
      'media': '#fbb040',
      'cdrom': '#fbb040',
      'floppy': '#fbb040',
      'tape': '#fbb040',
      'net': '#fbb040',
      'proc': '#fbb040',
      'sys': '#fbb040',
      'dev': '#fbb040',
      'run': '#fbb040',
      'lost+found': '#fbb040',
      'root': '#fbb040',
      'home': '#fbb040',
      'boot': '#fbb040',
      'lib32': '#fbb040',
      'libx32': '#fbb040'
    }
    
    return colors[language] || '#586069'
  }
}

// Export a default instance
export const githubAPI = new GitHubAPI()

