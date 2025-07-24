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
    console.log('Raw API response:', JSON.stringify(data, null, 2));

    // EstiCRM może zwracać różne struktury - sprawdzamy co dostajemy
    let offersArray = [];
    
    if (Array.isArray(data)) {
      offersArray = data;
    } else if (data && Array.isArray(data.data)) {
      offersArray = data.data;
    } else if (data && Array.isArray(data.offers)) {
      offersArray = data.offers;
    } else if (data && Array.isArray(data.results)) {
      offersArray = data.results;
    } else {
      console.error('Unexpected API response structure:', data);
      return new Response(
        JSON.stringify({ error: 'Invalid API response structure', received: data }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    console.log('Successfully fetched offers:', offersArray.length, 'offers');

    // Parse query parameters for agent filtering
    const url_obj = new URL(req.url);
    const agentId = url_obj.searchParams.get('agent_id');
    
    let filteredOffers = offersArray;
    
    // Filter by agent_id if provided
    if (agentId) {
      filteredOffers = offersArray.filter((offer: any) => 
        offer.agent_id === agentId || offer.user_id === agentId
      );
      console.log(`Filtered offers for agent ${agentId}:`, filteredOffers.length, 'offers');
    }

    // Transform EstiCRM offers to our format
    const transformedOffers = filteredOffers.map((offer: any) => {
      console.log('Transforming offer:', JSON.stringify(offer, null, 2));
      
      // Parse amenities from tagList
      let amenities = [];
      if (offer.tagList) {
        amenities = offer.tagList.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0);
      }
      
      // Get best title
      const title = offer.portalTitle || offer.portalWwwTitle || offer.typeName || 'Mieszkanie';
      
      // Get best location
      const location = offer.locationPlaceName || 
                      `${offer.locationCityName || 'Warszawa'}${offer.locationPrecinctName ? ` ${offer.locationPrecinctName}` : ''}`;
      
      // Parse description and clean HTML
      let description = offer.description || offer.descriptionWebsite || '';
      if (description) {
        // Remove HTML tags
        description = description.replace(/<[^>]*>/g, '').replace(/&[^;]*;/g, ' ').trim();
        // Take first 200 characters
        description = description.substring(0, 200) + (description.length > 200 ? '...' : '');
      }

      // Get photos - check different possible photo fields
      let imageUrl = '/placeholder.svg';
      if (offer.photos && Array.isArray(offer.photos) && offer.photos.length > 0) {
        imageUrl = offer.photos[0].url || offer.photos[0].path || offer.photos[0];
      } else if (offer.main_photo) {
        imageUrl = offer.main_photo;
      } else if (offer.gallery && Array.isArray(offer.gallery) && offer.gallery.length > 0) {
        imageUrl = offer.gallery[0].url || offer.gallery[0].path || offer.gallery[0];
      }
      
      const transformed = {
        id: offer.id || offer.offer_id || offer.estateOfferUuid,
        title: title,
        location: location,
        price: parseFloat(offer.price) || 0,
        rooms: offer.apartmentRoomNumber || parseInt(offer.rooms) || parseInt(offer.room_count) || 1,
        area: parseFloat(offer.areaTotal) || parseFloat(offer.area) || parseFloat(offer.surface) || 50,
        floor: offer.apartmentFloor || offer.floor,
        description: description,
        amenities: amenities,
        image: imageUrl,
        agent_id: offer.contactId || offer.agent_id || offer.user_id,
        agent_name: `${offer.contactFirstname || ''} ${offer.contactLastname || ''}`.trim() || 'Pośrednik',
        agent_phone: offer.contactPhone,
        agent_email: offer.contactEmail,
        status: offer.status
      };
      
      console.log('Transformed offer:', JSON.stringify(transformed, null, 2));
      return transformed;
    });

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