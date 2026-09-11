import { chromium } from "playwright";

export const createBrowser = async () => {
    return chromium.launch({
        headless: true
    });
};