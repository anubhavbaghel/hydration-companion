import { generateReminders } from '@/logic/generateReminders';
import { scheduleHydrationReminders } from '@/notifications/scheduleHydrationReminders';
import { deleteAppData } from '@/logic/removeUserData';
import { loadHydrationData, saveHydrationData } from '@/storage/hydrationdata';
import { loadUserData, saveUserData } from '@/storage/userstorage';
import { createContext, useContext, useEffect, useState } from 'react';

const HydrationContext = createContext<any>(null);

export const HydrationProvider = ({ children }: { children: React.ReactNode }) => {
    const [userData, setUserData] = useState<any>(null);
    const [hydrationData, setHydrationData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Load data and handle daily reset
    useEffect(() => {
        (async () => {
            const [u, h] = await Promise.all([loadUserData(), loadHydrationData()]);
            
            if (u && h) {
                const isNewDay = h.lastUpdated && new Date(h.lastUpdated).toDateString() !== new Date().toDateString();
                if (isNewDay) {
                    const freshReminders = generateReminders(u.wakeTime, u.bedTime, h.dailyGoal, h.waterPerReminder);
                    const dailyReset = { ...h, waterDrank: 0, reminders: freshReminders, lastUpdated: new Date().toISOString() };
                    
                    setHydrationData(dailyReset);
                    await saveHydrationData(dailyReset);
                    await scheduleHydrationReminders(dailyReset); // Reschedule for the new day
                } else {
                    setHydrationData(h);
                }
            } else {
                setHydrationData(h);
            }
            setUserData(u);
            setLoading(false);
        })();
    }, []);

    const updateUserData = async (data: any) => {
        setUserData(data);
        await saveUserData(data);
    };

    const updateHydrationData = async (data: any) => {
        const updated = { ...data, lastUpdated: new Date().toISOString() };
        setHydrationData(updated);
        await saveHydrationData(updated);
    };

    const updateWater = async (amount?: number) => {
        if (!hydrationData) return;
        const updated = {
            ...hydrationData,
            waterDrank: (hydrationData.waterDrank || 0) + (amount ?? hydrationData.waterPerReminder),
            lastUpdated: new Date().toISOString()
        };
        setHydrationData(updated);
        await saveHydrationData(updated);
    };

    const resetApp = async () => {
        await deleteAppData();
        setUserData(null);
        setHydrationData(null);
    };

    return (
        <HydrationContext.Provider value={{ userData, hydrationData, loading, setUserData: updateUserData, setHydrationData: updateHydrationData, updateWater, resetApp }}>
            {children}
        </HydrationContext.Provider>
    );
};

export const useHydrationProvider = () => {
    const context = useContext(HydrationContext);
    if (!context) throw new Error('useHydrationProvider must be used within a HydrationProvider');
    return context;
};
