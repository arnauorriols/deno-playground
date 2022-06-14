import type { ObjectId } from 'https://deno.land/x/web_bson@v0.2.2/src/objectid.ts';

export interface ICountService {
	/**
	 * Increase count
	 *
	 * @param {number | undefined} incrementAmount Optional amount to increase count by (default = 1)
	 */
	addToCount: (incrementAmount?: number) => void;
	getCount: () => number;
}

export interface IMongoService {
	/**
	 * This method fetches all documents in the `pages` collection
	 */
	fetchPages(): Promise<IPage[]>;
	/**
	 * This method sets up the pages collection, including any default documents needed within
	 */
	init(): Promise<void>;
}

export interface INameService {
	/**
	 * Get the current name value
	 */
	getName: () => string;
	// name: string;
	/**
	 * Set the current name value
	 *
	 * @param {string} newName New value for the name
	 */
	setName: (newName: string) => void;
}

export interface IPage {
	_id?: ObjectId;
	name: string;
	count: number;
	path: string;
}
