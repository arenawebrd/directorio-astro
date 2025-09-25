import pool from './postgres';
import type { Business } from '../types';

export async function getListings() {
  const query = 'SELECT * FROM listings ORDER BY province ASC, city ASC';
  try {
    const { rows: businesses } = await pool.query<Business>(query);
    return businesses;
  } catch (error) {
    console.error('Database error in getListings:', error);
    return [];
  }
}

export async function getFilters() {
  try {
    const cityQuery = 'SELECT DISTINCT province, city FROM listings WHERE province IS NOT NULL AND city IS NOT NULL ORDER BY province, city';
    const { rows: citiesResult } = await pool.query(cityQuery);

    const provinceToCities: Record<string, string[]> = {};
    citiesResult.forEach((item: any) => {
      if (item.province && item.city) {
        if (!provinceToCities[item.province]) {
          provinceToCities[item.province] = [];
        }
        if (!provinceToCities[item.province].includes(item.city)) {
          provinceToCities[item.province].push(item.city);
        }
      }
    });

    return { provinceToCities };
  } catch (error) {
    console.error('Database error in getFilters:', error);
    return { provinceToCities: {} };
  }
}

export async function getListingsByCity(city: string) {
  const query = 'SELECT * FROM listings WHERE city = $1 ORDER BY title ASC';
  try {
    const { rows: businesses } = await pool.query<Business>(query, [city]);
    return businesses;
  } catch (error) {
    console.error('Database error in getListingsByCity:', error);
    return [];
  }
}
