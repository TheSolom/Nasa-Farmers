import Location from '../data-access/location.model.js';

export const addLocation = async (locationData) => {
    return Location.create(locationData);
};

export const getUserLocations = async (userId) => {
    const MAX_LOCATIONS = 10;

    return Location.find({ userId }).sort({ createdAt: -1 }).limit(MAX_LOCATIONS);
};
