export const scrapeSeries = async (page) => {
    await page.goto("https://example.com");

    const pageTitle = await page.title();

    return {
        pageTitle
    };
};