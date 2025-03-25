'use client';

import { useEffect, useState } from 'react';
import MassageShopsCatalog from '@/components/MassageShopsCatalog';
import { LinearProgress, Button } from '@mui/material';
import Link from 'next/link';
import getMassageshops from '@/libs/getMassageShops';
import getUserProfile from '@/libs/getUserProfile';
import { useSession } from 'next-auth/react';

export default function MassageShopPage() {
  const { data: session } = useSession();
  const [massageShops, setMassageShops] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchShops = async () => {
    if (!session?.user?.token) return;
    setLoading(true);
    const shops = await getMassageshops();
    if (session) {
      const prof = await getUserProfile(session.user.token);
      setProfile(prof.data);
    }
    setMassageShops(shops);
    setLoading(false);
  };

  useEffect(() => {
    fetchShops();
  }, [session]);

  if (loading) return <LinearProgress />;
  if (!massageShops || !profile) return null;

  return (
    <main className="min-h-screen relative top-[70px] bg-[#3D5E40] px-10 py-8">
      {profile && profile.role === 'admin' && (
        <div className="flex justify-end pr-4 mb-2">
          <Link href="/createShop">
            <Button
              sx={{
                width: '120px',
                height: '50px',
                backgroundColor: '#89A178',
                color: 'white',
                borderRadius: '30px',
                fontWeight: '100',
                fontSize: '13px',
                '&:hover': { backgroundColor: '#6e8c6c' },
                fontFamily: 'Inria Serif, serif',
              }}
            >
              Create Shop
            </Button>
          </Link>
        </div>
      )}
      <MassageShopsCatalog massageJSON={massageShops} />
    </main>
  );
}
