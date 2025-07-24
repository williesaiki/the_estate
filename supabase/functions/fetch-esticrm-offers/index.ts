import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const company = Deno.env.get('ESTICRM_COMPANY');
    const token = Deno.env.get('ESTICRM_TOKEN');
    const officeId = Deno.env.get('ESTICRM_OFFICE_ID');

    if (!company || !token || !officeId) {
      console.error('Missing EstiCRM credentials');
      return new Response(
        JSON.stringify({ error: 'Missing EstiCRM API credentials' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const url = `https://client-api.esticrm.pl/apiClient/offer/list?company=${company}&token=${token}&office_id=${officeId}`;
    
    console.log('Fetching offers from EstiCRM:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('EstiCRM API error:', response.status, response.statusText);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch offers from EstiCRM' }), 
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    console.log('Successfully fetched offers:', data.length || 0, 'offers');

    // Parse query parameters for agent filtering
    const url_obj = new URL(req.url);
    const agentId = url_obj.searchParams.get('agent_id');
    
    let filteredOffers = data;
    
    // Filter by agent_id if provided
    if (agentId) {
      filteredOffers = data.filter((offer: any) => 
        offer.agent_id === agentId || offer.user_id === agentId
      );
      console.log(`Filtered offers for agent ${agentId}:`, filteredOffers.length, 'offers');
    }

    // Transform EstiCRM offers to our format
    const transformedOffers = filteredOffers.map((offer: any) => ({
      id: offer.id || offer.offer_id,
      title: offer.title || offer.name || 'Bez tytułu',
      location: offer.location || offer.address || 'Warszawa',
      price: parseFloat(offer.price) || 0,
      rooms: parseInt(offer.rooms) || parseInt(offer.room_count) || 1,
      area: parseFloat(offer.area) || parseFloat(offer.surface) || 50,
      floor: offer.floor,
      description: offer.description || offer.short_description || '',
      amenities: offer.amenities || [],
      image: offer.photos?.[0]?.url || offer.main_photo || '/placeholder.svg',
      agent_id: offer.agent_id || offer.user_id,
      status: offer.status
    }));

    return new Response(
      JSON.stringify(transformedOffers), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in fetch-esticrm-offers function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});