import type { APIRoute } from 'astro';
import pool from '../../lib/postgres';
import type { Business } from '../../types';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();
    const businessData: Partial<Business> = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      address: formData.get('address') as string,
      neighborhood: formData.get('neighborhood') as string,
      city: formData.get('city') as string,
      province: formData.get('province') as string,
      zip: formData.get('zip') as string,
      country_code: formData.get('country_code') as string,
      phone: formData.get('phone') as string,
      website: formData.get('website') as string,
      map_url: formData.get('map_url') as string,
      latitude: parseFloat(formData.get('latitude') as string) || undefined,
      longitude: parseFloat(formData.get('longitude') as string) || undefined,
      rating: parseFloat(formData.get('rating') as string) || undefined,
      rating_count: parseInt(formData.get('rating_count') as string) || undefined,
      place_id: formData.get('place_id') as string,
      feature_id: formData.get('feature_id') as string,
      monday: formData.get('monday') as string,
      tuesday: formData.get('tuesday') as string,
      wednesday: formData.get('wednesday') as string,
      thursday: formData.get('thursday') as string,
      friday: formData.get('friday') as string,
      saturday: formData.get('saturday') as string,
      sunday: formData.get('sunday') as string,
    };

    // Parse JSON fields
    const attributesStr = formData.get('attributes') as string;
    if (attributesStr) {
      try {
        businessData.attributes = JSON.parse(attributesStr);
      } catch (e) {
        console.error('Invalid attributes JSON');
      }
    }

    const placeTopicsStr = formData.get('place_topics') as string;
    if (placeTopicsStr) {
      try {
        businessData.place_topics = JSON.parse(placeTopicsStr);
      } catch (e) {
        console.error('Invalid place_topics JSON');
      }
    }

    const peopleAlsoSearchStr = formData.get('people_also_search') as string;
    if (peopleAlsoSearchStr) {
      try {
        businessData.people_also_search = JSON.parse(peopleAlsoSearchStr);
      } catch (e) {
        console.error('Invalid people_also_search JSON');
      }
    }

    const columns = Object.keys(businessData).join(', ');
    const values = Object.values(businessData);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

    const query = `INSERT INTO listings (${columns}) VALUES (${placeholders})`;

    await pool.query(query, values);

    return redirect('/listings');
  } catch (error) {
    if (error instanceof Error) {
      return new Response(`Error adding business: ${error.message}`, { status: 400 });
    }
    return new Response('Internal server error', { status: 500 });
  }
};
