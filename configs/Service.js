import axios from "axios";

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

const getVideos = async (query) => {
    const youtubeApiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

    if (!youtubeApiKey) {
        throw new Error("YouTube API Key is missing.");
    }

    const params = {
        part: 'snippet',
        q: query,
        maxResults: 5,
        type: 'video',
        key: youtubeApiKey,  // Correct usage of API Key
    };

    try {
        const resp = await axios.get(`${YOUTUBE_BASE_URL}/search`, { params });
        console.log(resp);
        return resp.data.items;
    } catch (error) {
        console.error("Error fetching videos:", error);
        throw error;
    }
};

export default {
    getVideos
};
