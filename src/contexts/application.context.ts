import { createContext } from 'preact';

export type ApplicationType = {
    loading: boolean;
}

export type ApplicationContextType = {
    application: ApplicationType,
    setApplication: (application: any) => void;
}

export const ApplicationContext = createContext<ApplicationContextType>({ 
    application: {
        loading: true
    },
    setApplication: () => (application: ApplicationType) => console.warn('no application provider')
});