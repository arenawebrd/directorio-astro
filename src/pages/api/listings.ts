import type { APIRoute } from 'astro';
import pool from '../../lib/postgres';
import type { Business } from '../../types';

export const GET: APIRoute = async ({ url }) => {
  const searchParams = new URLSearchParams(url.search);
  const searchTerm = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  const provinceFilter = searchParams.get('province') || '';
  const cityFilter = searchParams.get('city') || '';

  let query = 'SELECT * FROM listings';
  const values = [];
  const conditions = [];

  if (searchTerm) {
    conditions.push(`(title ILIKE $${values.length + 1} OR description ILIKE $${values.length + 1} OR category ILIKE $${values.length + 1} OR province ILIKE $${values.length + 1} OR city ILIKE $${values.length + 1})`);
    values.push(`%${searchTerm}%`);
  }
  if (categoryFilter) {
    conditions.push(`category = $${values.length + 1}`);
    values.push(categoryFilter);
  }
  if (provinceFilter) {
    conditions.push(`province = $${values.length + 1}`);
    values.push(provinceFilter);
  }
  if (cityFilter) {
    conditions.push(`city = $${values.length + 1}`);
    values.push(cityFilter);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY province ASC, city ASC';

  try {
    const { rows: businesses } = await pool.query<Business>(query, values);
    return new Response(JSON.stringify(businesses), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Database error in /api/listings:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch listings' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
