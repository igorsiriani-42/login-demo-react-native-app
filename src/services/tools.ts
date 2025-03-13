/**
 * Puts the process on hold for a given time
 * 
 * @param ms milliseconds to be put on hold
 * @returns a promise that resolves when the time has passed
 */
export function delay(ms: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
}