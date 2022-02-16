export class ThemeService {
  static saveThemeToLS(theme: 'light' | 'dark' | 'auto'): void {
    localStorage.setItem('theme', theme);
  }

  static getThemeFromLS(): 'light' | 'dark' | 'auto' {
    return localStorage.getItem('theme') as 'light' | 'dark' | 'auto';
  }

  static getThemeByTime(): 'light' | 'dark' {
    const time = new Date().getHours();
    if (time >= 8 && time <= 19) {
      return 'light';
    } else {
      return 'dark';
    }
  }
}
