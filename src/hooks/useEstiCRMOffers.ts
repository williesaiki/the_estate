import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface EstiCRMOffer {
  id: string;
  title: string;
  location: string;
  price: number;
  rooms: number;
  area: number;
  floor?: string;
  description: string;
  amenities: string[];
  image: string;
  images?: string[]; // Array of additional images
  agent_id: string;
  agent_name?: string;
  agent_phone?: string;
  agent_email?: string;
  status: number;
  latitude?: number;
  longitude?: number;
  type?: string; // Property type from EstiCRM
}

export const useEstiCRMOffers = (agentId?: string) => {
  const [offers, setOffers] = useState<EstiCRMOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = agentId ? `?agent_id=${agentId}` : '';
        const { data, error: funcError } = await supabase.functions.invoke(
          'fetch-esticrm-offers',
          {
            method: 'GET',
          }
        );

        if (funcError) {
          throw new Error(funcError.message);
        }

        if (!data) {
          throw new Error('No data received from API');
        }

        let filteredOffers = data;
        
        // Filter by agent_id on frontend if needed
        if (agentId) {
          filteredOffers = data.filter((offer: EstiCRMOffer) => 
            offer.agent_id === agentId
          );
        }

        setOffers(filteredOffers);
      } catch (err) {
        console.error('Error fetching EstiCRM offers:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [agentId]);

  return { offers, loading, error, refetch: () => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: funcError } = await supabase.functions.invoke(
          'fetch-esticrm-offers',
          {
            method: 'GET',
          }
        );

        if (funcError) {
          throw new Error(funcError.message);
        }

        let filteredOffers = data;
        
        if (agentId) {
          filteredOffers = data.filter((offer: EstiCRMOffer) => 
            offer.agent_id === agentId
          );
        }

        setOffers(filteredOffers);
      } catch (err) {
        console.error('Error fetching EstiCRM offers:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }};
};