import { GuestbookEntry, LoadingState } from '../types';

// In a real app, this would be a Server Action in 'app/actions.ts'
// using db.insert(guestbook).values({...})
const MOCK_DELAY = 800;

export const fetchEntries = async (): Promise<GuestbookEntry[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem('guestbook_entries');
      if (stored) {
        resolve(JSON.parse(stored));
      } else {
        // Seed data
        const seed: GuestbookEntry[] = [
          { id: 1, name: "Charles", message: "Love the aesthetic! Clean transitions.", created_at: new Date(Date.now() - 86400000).toISOString(), signature: "#ff00ff" },
          { id: 2, name: "Sarah", message: "Aimal, this portfolio is sick. Linux forever.", created_at: new Date(Date.now() - 172800000).toISOString(), signature: "#00ffff" },
        ];
        localStorage.setItem('guestbook_entries', JSON.stringify(seed));
        resolve(seed);
      }
    }, MOCK_DELAY);
  });
};

export const addEntry = async (name: string, message: string): Promise<GuestbookEntry> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem('guestbook_entries') || '[]');
      const newEntry: GuestbookEntry = {
        id: Date.now(),
        name,
        message,
        created_at: new Date().toISOString(),
        signature: Math.random() > 0.5 ? '#b8bb26' : '#cc241d' // Random accent color
      };
      
      const updated = [newEntry, ...stored];
      localStorage.setItem('guestbook_entries', JSON.stringify(updated));
      resolve(newEntry);
    }, MOCK_DELAY);
  });
};