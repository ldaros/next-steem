import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const steamUrlBuilder = {
  library: (objectID: string) =>
    `https://steamcdn-a.akamaihd.net/steam/apps/${objectID}/header.jpg`,
  libraryHero: (objectID: string) =>
    `https://steamcdn-a.akamaihd.net/steam/apps/${objectID}/library_hero.jpg`,
  logo: (objectID: string) =>
    `https://cdn.cloudflare.steamstatic.com/steam/apps/${objectID}/logo.png`,
  cover: (objectID: string) =>
    `https://cdn.cloudflare.steamstatic.com/steam/apps/${objectID}/library_600x900.jpg`,
  icon: (objectID: string, clientIcon: string) =>
    `https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${objectID}/${clientIcon}.ico`,
};

export const randomPrice = () => Math.floor(Math.random() * 100) + 1;