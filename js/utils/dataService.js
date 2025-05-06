/**
 * Data Service
 * Centralized service for fetching and managing data from JSON files
 */

// Cache for loaded data to prevent multiple fetches
const dataCache = {
    navigation: null,
    recentProjects: null,
    pastProjects: null,
    header: null,
    summary: null,
    contact: null
};

/**
 * Fetches data from a JSON file
 * @param {string} path - Path to the JSON file
 * @returns {Promise<Object>} - Promise resolving to the parsed JSON data
 */
async function fetchData(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${path}:`, error);
        throw error;
    }
}

/**
 * Gets navigation data
 * @returns {Array} - Navigation items
 */
export function getNavigation() {
    if (!dataCache.navigation) {
        dataCache.navigation = require('../../data/navigation.json');
    }
    return dataCache.navigation;
}

/**
 * Gets recent projects data
 * @returns {Object} - Recent projects data
 */
export function getRecentProjects() {
    if (!dataCache.recentProjects) {
        dataCache.recentProjects = require('../../data/projects/recent.json');
    }
    return dataCache.recentProjects;
}

/**
 * Gets past projects data
 * @returns {Object} - Past projects data
 */
export function getPastProjects() {
    if (!dataCache.pastProjects) {
        dataCache.pastProjects = require('../../data/projects/past.json');
    }
    return dataCache.pastProjects;
}

/**
 * Gets header data
 * @returns {Object} - Header data
 */
export function getHeader() {
    if (!dataCache.header) {
        dataCache.header = require('../../data/header.json');
    }
    return dataCache.header;
}

/**
 * Gets summary data
 * @returns {Object} - Summary data
 */
export function getSummary() {
    if (!dataCache.summary) {
        dataCache.summary = require('../../data/summary.json');
    }
    return dataCache.summary;
}

/**
 * Gets contact data
 * @returns {Object} - Contact data
 */
export function getContact() {
    if (!dataCache.contact) {
        dataCache.contact = require('../../data/contact.json');
    }
    return dataCache.contact;
}

/**
 * Preloads all data for faster access
 * @returns {Promise<void>}
 */
export async function preloadAllData() {
    getNavigation();
    getRecentProjects();
    getPastProjects();
    getHeader();
    getSummary();
    getContact();
    console.log('All data preloaded');
}
