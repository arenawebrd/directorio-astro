import type { APIRoute } from 'astro';
import pool from '../../lib/postgres';

export const GET: APIRoute = async () => {
  try {
    const categoryQuery = 'SELECT DISTINCT category FROM listings WHERE category IS NOT NULL ORDER BY category';
    const provinceQuery = 'SELECT DISTINCT province FROM listings WHERE province IS NOT NULL ORDER BY province';
    const cityQuery = 'SELECT DISTINCT province, city FROM listings WHERE province IS NOT NULL AND city IS NOT NULL ORDER BY province, city';

    const [
      { rows: categories },
      { rows: provinces },
      { rows: citiesResult }
    ] = await Promise.all([
      pool.query(categoryQuery),
      pool.query(provinceQuery),
      pool.query(cityQuery)
    ]);

    const uniqueCategories = categories.map(c => c.category);
    const uniqueProvinces = provinces.map(p => p.province);

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

    return new Response(JSON.stringify({
      uniqueCategories,
      uniqueProvinces,
      provinceToCities
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Database error in /api/filters:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch filter data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
